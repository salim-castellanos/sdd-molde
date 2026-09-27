import { check, envelope } from "./envelope.mjs";

function running(project) {
  return String(project?.status ?? "").toLowerCase().includes("running");
}

function owner(snapshot, port) {
  return snapshot.ports?.[port] ?? null;
}

function failed(tool, data, checks, error, next = "") {
  return envelope({ tool, data, checks, error, next });
}

export function evaluateStatus(profile, snapshot) {
  const tool = "runtime.status";
  const checks = [];
  const apiPort = profile.ports.api;
  const pgPort = profile.ports.postgresHost;
  const webPort = profile.ports.web;
  const want = profile.compose.project;

  if (!snapshot.dockerOk) {
    return failed(
      tool,
      { composeProject: null, ports: {} },
      [check("docker", "semantic", false, "docker no respondió")],
      { code: "docker_unavailable", message: "Docker no está disponible." },
      "",
    );
  }

  const projects = snapshot.projects ?? [];
  const forbidden = projects.filter((project) => running(project) && profile.forbiddenProjects.includes(project.name));
  const apiOwner = owner(snapshot, apiPort);
  const pgOwner = owner(snapshot, pgPort);
  const webOwner = owner(snapshot, webPort);
  const webListening = Boolean(snapshot.listening?.[webPort]);

  const data = {
    composeProject: apiOwner?.project ?? null,
    ports: {
      [apiPort]: apiOwner?.project ?? "down",
      [pgPort]: pgOwner?.project ?? "down",
      [webPort]: webOwner?.project ?? (webListening ? "host" : "down"),
    },
    forbidden: forbidden.map((project) => project.name),
  };

  const apiForeign = apiOwner && apiOwner.project !== want;
  const pgForeign = pgOwner && pgOwner.project !== want;
  checks.push(
    check(
      "compose.project",
      "semantic",
      !apiForeign && !pgForeign,
      apiForeign || pgForeign
        ? `${apiForeign ? apiPort : pgPort} pertenece a ${(apiForeign ? apiOwner : pgOwner).project}, el perfil pide ${want}`
        : `puertos de api y postgres son de ${want} o están libres`,
    ),
  );

  const foreignName = (apiForeign && apiOwner.project) || (pgForeign && pgOwner.project) || forbidden[0]?.name;
  if (apiForeign || pgForeign) {
    return failed(
      tool,
      data,
      checks,
      { code: "port_owned_by_other_project", message: "El api del corte no es el proceso que escucha en el puerto del perfil." },
      foreignName ? `runtime.down --project ${foreignName}` : "",
    );
  }

  checks.push(
    check(
      "compose.forbidden",
      "semantic",
      forbidden.length === 0,
      forbidden.length ? `sigue en marcha ${forbidden.map((project) => project.name).join(", ")}` : "sin proyecto prohibido",
    ),
  );
  if (forbidden.length) {
    return failed(
      tool,
      data,
      checks,
      { code: "forbidden_project_running", message: "Hay otro proyecto Compose del mismo stack en marcha." },
      `runtime.down --project ${forbidden[0].name}`,
    );
  }

  const apiUp = apiOwner?.project === want;
  const pgUp = pgOwner?.project === want;
  checks.push(check("compose.up", "semantic", apiUp && pgUp, apiUp && pgUp ? want : "api o postgres del perfil no escuchan"));
  if (!apiUp || !pgUp) {
    return failed(
      tool,
      data,
      checks,
      { code: "stack_down", message: "El Compose del perfil no está en marcha." },
      "runtime.up",
    );
  }

  const webIsContainer = Boolean(webOwner);
  checks.push(
    check("web.container", "semantic", !webIsContainer, webIsContainer ? "5173 lo publica un contenedor" : "el web no es Compose"),
  );
  if (webIsContainer) {
    return failed(
      tool,
      data,
      checks,
      { code: "web_is_container", message: "Vite no es un servicio Compose. El puerto del web lo tiene un contenedor." },
      "",
    );
  }

  checks.push(check("web.listening", "semantic", webListening, webListening ? `host :${webPort}` : `nada en :${webPort}`));
  if (!webListening) {
    return failed(
      tool,
      data,
      checks,
      { code: "web_not_listening", message: "El api está sano y el web del host no escucha." },
      "runtime.web",
    );
  }

  return envelope({ tool, data, checks, next: "" });
}

export function planUp(profile, snapshot) {
  const status = evaluateStatus(profile, snapshot);
  if (status.error && status.error.code !== "web_not_listening" && status.error.code !== "stack_down") {
    return { action: "refuse", result: { ...status, tool: "runtime.up" } };
  }
  if (status.error?.code === "stack_down") return { action: "up", result: null };
  return {
    action: "noop",
    result: envelope({
      tool: "runtime.up",
      data: { action: "already_up", ports: status.data.ports },
      checks: [check("compose.up", "semantic", true, "el proyecto del perfil ya está sano")],
      next: status.next,
    }),
  };
}

export function planDown(profile, snapshot, projectName) {
  const tool = "runtime.down";
  if (!projectName) {
    return {
      action: "refuse",
      file: null,
      result: failed(tool, {}, [check("project", "schema", false, "falta --project")], {
        code: "profile_invalid",
        message: "down necesita --project.",
      }),
    };
  }
  if (!snapshot.dockerOk) {
    return {
      action: "refuse",
      file: null,
      result: failed(tool, { project: projectName }, [check("docker", "semantic", false, "docker no respondió")], {
        code: "docker_unavailable",
        message: "Docker no está disponible.",
      }),
    };
  }
  const known = (snapshot.projects ?? []).find((project) => project.name === projectName);
  const isProfile = projectName === profile.compose.project;
  if (!known && !isProfile) {
    return {
      action: "refuse",
      file: null,
      result: failed(
        tool,
        { project: projectName },
        [check("project.known", "semantic", false, "no está en compose ls ni es el perfil")],
        { code: "unknown_project", message: "Ese proyecto Compose no está en marcha y no es el del perfil." },
      ),
    };
  }
  const file = isProfile ? profile.compose.absoluteFile || profile.compose.file : known.configFiles?.split(",")[0]?.trim();
  if (!file) {
    return {
      action: "refuse",
      file: null,
      result: failed(
        tool,
        { project: projectName },
        [check("compose.file", "semantic", false, "compose ls no trae el archivo")],
        { code: "compose_mismatch", message: "No hay archivo Compose para bajar ese proyecto." },
      ),
    };
  }
  return { action: "down", file, result: null, project: projectName };
}

export function planWeb(profile, snapshot) {
  const status = evaluateStatus(profile, snapshot);
  if (status.error?.code === "web_is_container") {
    return { action: "refuse", result: { ...status, tool: "runtime.web" } };
  }
  if (status.error == null || status.error.code === "web_not_listening") {
    const listening = Boolean(snapshot.listening?.[profile.ports.web]);
    if (listening && !owner(snapshot, profile.ports.web)) {
      return {
        action: "noop",
        result: envelope({
          tool: "runtime.web",
          data: { action: "already_listening", port: profile.ports.web },
          checks: [check("web.listening", "semantic", true, "el host ya acepta el puerto del web")],
          next: "",
        }),
      };
    }
  }
  if (status.error && !["web_not_listening", "stack_down"].includes(status.error.code)) {
    return { action: "refuse", result: { ...status, tool: "runtime.web" } };
  }
  if (status.error?.code === "stack_down") {
    return { action: "refuse", result: { ...status, tool: "runtime.web", next: "runtime.up" } };
  }
  return { action: "start", result: null };
}

export function finishUp(profile, after) {
  const status = evaluateStatus(profile, after);
  if (status.error && status.error.code !== "web_not_listening") {
    return { ...status, tool: "runtime.up" };
  }
  return envelope({
    tool: "runtime.up",
    data: { action: "up", ports: status.data.ports },
    checks: status.checks.filter((item) => item.id !== "web.listening"),
    next: status.next,
  });
}

export function finishDown(project) {
  return envelope({
    tool: "runtime.down",
    data: { action: "down", project },
    checks: [check("compose.down", "semantic", true, project)],
    next: "runtime.status",
  });
}

export function finishWeb(port) {
  return envelope({
    tool: "runtime.web",
    data: { action: "started", port },
    checks: [check("web.listening", "semantic", true, `host :${port}`)],
    next: "runtime.status",
  });
}
