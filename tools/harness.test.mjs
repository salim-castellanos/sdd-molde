import assert from "node:assert/strict";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { assertEnvelope } from "./lib/envelope.mjs";
import { executeTool } from "./lib/execute.mjs";
import { loadProfile, parseProfile } from "./lib/profile.mjs";
import { hostPorts, parseComposeLs, parseDockerPs, upArgs } from "./lib/probes.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function profile() {
  return {
    id: "mistratos",
    compose: { project: "mistratos", file: "apps/infra/compose.yml", absoluteFile: "C:/compose.yml", services: ["postgres", "api"] },
    forbiddenProjects: ["example-local", "infra"],
    ports: { postgresHost: 5433, api: 3001, web: 5173 },
    web: { cwd: "apps/web", absoluteCwd: "C:/web", command: "npm run dev" },
  };
}

function snap(over = {}) {
  return {
    dockerOk: true,
    projects: [],
    ports: {},
    listening: { 5173: false },
    ...over,
  };
}

function memory(initial) {
  let current = snap(initial);
  const calls = [];
  return {
    calls,
    probe: async () => current,
    up: async () => {
      calls.push("up");
      current = snap({
        ...current,
        projects: [{ name: "mistratos", status: "running(2)", configFiles: "C:/compose.yml" }],
        ports: { ...current.ports, 3001: { project: "mistratos", service: "api" }, 5433: { project: "mistratos", service: "postgres" } },
      });
    },
    down: async (project) => {
      calls.push(`down:${project}`);
      const ports = { ...current.ports };
      for (const port of Object.keys(ports)) {
        if (ports[port]?.project === project) ports[port] = null;
      }
      current = snap({
        ...current,
        projects: current.projects.filter((item) => item.name !== project),
        ports,
      });
    },
    startWeb: async () => {
      calls.push("web");
      current = snap({ ...current, listening: { ...current.listening, 5173: true } });
    },
  };
}

function expectShape(result) {
  assert.deepEqual(assertEnvelope(result), []);
}

test("3001 de otro proyecto no se levanta encima", async () => {
  const io = memory(snap({
    projects: [
      { name: "example-local", status: "running(1)", configFiles: "C:/old.yml" },
      { name: "mistratos", status: "running(1)", configFiles: "C:/compose.yml" },
    ],
    ports: { 3001: { project: "example-local", service: "api" }, 5433: { project: "mistratos", service: "postgres" } },
  }));
  const status = await executeTool("status", { profile: profile(), io });
  expectShape(status);
  assert.equal(status.ok, false);
  assert.equal(status.error.code, "port_owned_by_other_project");
  assert.equal(status.next, "runtime.down --project example-local");
  assert.equal(status.data.ports[3001], "example-local");
  const up = await executeTool("up", { profile: profile(), io });
  expectShape(up);
  assert.equal(up.ok, false);
  assert.deepEqual(io.calls, []);
});

test("proyecto prohibido en marcha se baja antes de up", async () => {
  const io = memory(snap({
    projects: [{ name: "infra", status: "running(2)", configFiles: "C:/compose.yml" }],
  }));
  const status = await executeTool("status", { profile: profile(), io });
  expectShape(status);
  assert.equal(status.error.code, "forbidden_project_running");
  assert.equal(status.next, "runtime.down --project infra");
  await executeTool("up", { profile: profile(), io });
  assert.deepEqual(io.calls, []);
});

test("api sano y vite muerto: up no arranca el web", async () => {
  const io = memory(snap({
    projects: [{ name: "mistratos", status: "running(2)", configFiles: "C:/compose.yml" }],
    ports: { 3001: { project: "mistratos", service: "api" }, 5433: { project: "mistratos", service: "postgres" } },
    listening: { 5173: false },
  }));
  const status = await executeTool("status", { profile: profile(), io });
  expectShape(status);
  assert.equal(status.error.code, "web_not_listening");
  assert.equal(status.next, "runtime.web");
  const up = await executeTool("up", { profile: profile(), io });
  expectShape(up);
  assert.equal(up.ok, true);
  assert.equal(up.data.action, "already_up");
  assert.equal(up.next, "runtime.web");
  assert.deepEqual(io.calls, []);
});

test("status verde cuando compose y vite del host coinciden", async () => {
  const io = memory(snap({
    projects: [{ name: "mistratos", status: "running(2)", configFiles: "C:/compose.yml" }],
    ports: { 3001: { project: "mistratos", service: "api" }, 5433: { project: "mistratos", service: "postgres" } },
    listening: { 5173: true },
  }));
  const status = await executeTool("status", { profile: profile(), io });
  expectShape(status);
  assert.equal(status.ok, true);
  assert.equal(status.error, null);
  assert.equal(status.next, "");
  assert.equal(JSON.stringify(status).includes("1234567890"), false);
});

test("el 5173 de un contenedor no se trata como Vite", async () => {
  const io = memory(snap({
    projects: [{ name: "mistratos", status: "running(3)", configFiles: "C:/compose.yml" }],
    ports: {
      3001: { project: "mistratos", service: "api" },
      5433: { project: "mistratos", service: "postgres" },
      5173: { project: "mistratos", service: "web" },
    },
    listening: { 5173: true },
  }));
  const web = await executeTool("web", { profile: profile(), io });
  expectShape(web);
  assert.equal(web.error.code, "web_is_container");
  assert.deepEqual(io.calls, []);
});

test("stack caído: up llama compose sin --build y web espera al api", async () => {
  const io = memory(snap());
  const up = await executeTool("up", { profile: profile(), io });
  expectShape(up);
  assert.equal(up.ok, true);
  assert.equal(up.data.action, "up");
  assert.equal(up.next, "runtime.web");
  assert.deepEqual(io.calls, ["up"]);
  assert.equal(upArgs(profile()).includes("--build"), false);
  const webTooSoon = await executeTool("web", {
    profile: profile(),
    io: memory(snap()),
  });
  assert.equal(webTooSoon.next, "runtime.up");
  assert.equal(webTooSoon.ok, false);
});

test("down solo baja un proyecto que existe y no inventa el archivo", async () => {
  const io = memory(snap({
    projects: [{ name: "example-local", status: "running(1)", configFiles: "C:/old.yml,C:/extra.yml" }],
    ports: { 3001: { project: "example-local", service: "api" } },
  }));
  const unknown = await executeTool("down", { profile: profile(), project: "otro", io });
  expectShape(unknown);
  assert.equal(unknown.error.code, "unknown_project");
  const down = await executeTool("down", { profile: profile(), project: "example-local", io });
  expectShape(down);
  assert.equal(down.ok, true);
  assert.deepEqual(io.calls, ["down:example-local"]);
});

test("docker caído no se disfraza de puerto ajeno", async () => {
  const io = memory(snap({ dockerOk: false }));
  const status = await executeTool("status", { profile: profile(), io });
  expectShape(status);
  assert.equal(status.error.code, "docker_unavailable");
});

test("perfil real de Mistratos coincide con su compose", () => {
  const loaded = loadProfile(path.join(root, "example", "harness.profile.json"));
  assert.equal(loaded.error, null);
  assert.equal(loaded.checks.every((item) => item.ok), true);
});

test("compose que publica 5432 o CLUSTER 1 no pasa", () => {
  const raw = JSON.stringify({
    id: "x",
    compose: { project: "x", file: "c.yml", services: ["api"] },
    ports: { postgresHost: 5433, api: 3001, web: 5173 },
    web: { cwd: "web", command: "npm run dev" },
  });
  const hostPg = parseProfile(raw, { composeText: '"5432:5432"\n"3001:3001"\nCLUSTER: "0"\n', composeExists: true });
  assert.equal(hostPg.error.code, "compose_mismatch");
  const cluster = parseProfile(raw, { composeText: '"5433:5432"\n"3001:3001"\nCLUSTER: "1"\n', composeExists: true });
  assert.equal(cluster.error.code, "compose_mismatch");
});

test("parsers de docker y corte 4 aún no existe", async () => {
  assert.deepEqual(hostPorts("0.0.0.0:3001->3001/tcp, [::]:3001->3001/tcp"), [3001]);
  assert.equal(parseComposeLs('[{"Name":"mistratos","Status":"running(2)","ConfigFiles":"a.yml"}]')[0].name, "mistratos");
  const ps = parseDockerPs('{"Labels":"com.docker.compose.project=example-local,com.docker.compose.service=api","Ports":"0.0.0.0:3001->3001/tcp","Status":"Up"}\n');
  assert.equal(ps[0].project, "example-local");
  assert.deepEqual(ps[0].ports, [3001]);
  const later = await executeTool("rebuild", { profile: profile(), io: memory(snap()) });
  expectShape(later);
  assert.equal(later.error.code, "tool_not_implemented");
});

test("web caído arranca Vite y no un segundo servidor si ya escucha", async () => {
  const down = memory(snap({
    projects: [{ name: "mistratos", status: "running(2)", configFiles: "C:/compose.yml" }],
    ports: { 3001: { project: "mistratos", service: "api" }, 5433: { project: "mistratos", service: "postgres" } },
  }));
  const started = await executeTool("web", { profile: profile(), io: down });
  expectShape(started);
  assert.equal(started.ok, true);
  assert.deepEqual(down.calls, ["web"]);
  const again = await executeTool("web", { profile: profile(), io: down });
  assert.equal(again.data.action, "already_listening");
  assert.deepEqual(down.calls, ["web"]);
});
