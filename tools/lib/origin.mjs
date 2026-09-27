import { check, envelope } from "./envelope.mjs";

const NAME = /^[A-Za-z0-9][A-Za-z0-9._-]{0,63}$/;

export function remoteHost(url) {
  const text = String(url ?? "").trim();
  if (!text) return "";
  const scp = text.match(/^git@([^:]+):/);
  if (scp) return scp[1];
  try {
    return new URL(text.includes("://") ? text : `https://${text}`).hostname;
  } catch {
    return "";
  }
}

export function isCursorOrigin(url) {
  return remoteHost(url) === "origin.cursor.com";
}

export function findLoginUrl(text) {
  const match = String(text ?? "").match(/https:\/\/[^\s"'<>]+/);
  return match ? match[0].replace(/[)\].,]+$/, "") : "";
}

export function pageFromRemote(url) {
  const match = String(url ?? "").match(/origin\.cursor\.com[:/]([^/\s]+)\/([^/\s]+?)(?:\.git)?\/?$/);
  if (!match) return "";
  return `https://cursor.com/codebase/${match[1]}/${match[2]}`;
}

export async function executeOrigin(profile, io) {
  const repo = profile.git?.repo ?? "";
  const branch = profile.git?.branch ?? "";
  const namesOk = NAME.test(repo) && NAME.test(branch);
  if (!namesOk) {
    return envelope({
      tool: "origin.push",
      checks: [check("git.profile", "schema", false, "git.repo y git.branch")],
      error: { code: "profile_invalid", message: "El perfil no dice qué repo y rama de Origin publicar." },
    });
  }

  const snap = await io.inspect();
  if (!snap.dockerOk) {
    return envelope({
      tool: "origin.push",
      data: { repo, branch },
      checks: [check("docker", "semantic", false, snap.detail || "docker no responde")],
      error: { code: "docker_unavailable", message: "Docker no está disponible para el Linux de Origin." },
    });
  }
  if (!snap.isRepo) {
    return envelope({
      tool: "origin.push",
      data: { repo, branch },
      checks: [
        check("docker", "semantic", true, "docker responde"),
        check("git.repo", "semantic", false, "la carpeta del perfil no es un git"),
      ],
      error: { code: "not_a_git_repo", message: "No hay un repositorio git en la carpeta del perfil." },
    });
  }

  const checks = [
    check("docker", "semantic", true, "docker responde"),
    check("git.repo", "semantic", true, snap.branch || "sin rama"),
  ];
  if (snap.dirty) {
    checks.push(check("git.clean", "semantic", false, "hay cambios sin commit"));
    return envelope({
      tool: "origin.push",
      data: { repo, branch: snap.branch },
      checks,
      error: { code: "worktree_dirty", message: "Hay cambios sin commit. Origin solo publica commits." },
    });
  }
  checks.push(check("git.clean", "semantic", true, "árbol limpio"));
  if (snap.branch !== branch) {
    checks.push(check("git.branch", "semantic", false, `la rama es ${snap.branch}, el perfil pide ${branch}`));
    return envelope({
      tool: "origin.push",
      data: { repo, branch: snap.branch },
      checks,
      error: { code: "branch_mismatch", message: "La rama actual no es la que el perfil publica." },
    });
  }
  checks.push(check("git.branch", "semantic", true, branch));
  if (snap.remoteUrl && !isCursorOrigin(snap.remoteUrl)) {
    checks.push(check("git.remote", "semantic", false, snap.remoteUrl));
    return envelope({
      tool: "origin.push",
      data: { repo, branch, remoteUrl: snap.remoteUrl },
      checks,
      error: { code: "remote_not_origin", message: "Ya hay un remoto y no es Origin. No se reemplaza." },
    });
  }
  checks.push(check("git.remote", "semantic", true, snap.remoteUrl || "aún sin remoto"));
  if (!snap.authenticated) {
    const login = await io.beginLogin();
    checks.push(check("origin.auth", "semantic", false, "falta iniciar sesión"));
    return envelope({
      tool: "origin.push",
      data: { repo, branch, loginUrl: login.loginUrl || "" },
      checks,
      error: {
        code: "origin_login_required",
        message: "Abre loginUrl e inicia sesión en Cursor. Después se vuelve a llamar origin.push.",
      },
      next: "origin.push",
    });
  }
  checks.push(check("origin.auth", "semantic", true, "sesión de Origin"));
  const pushed = await io.push();
  if (!pushed.ok) {
    checks.push(check("origin.push", "semantic", false, pushed.detail || "push falló"));
    return envelope({
      tool: "origin.push",
      data: { repo, branch, remoteUrl: snap.remoteUrl },
      checks,
      error: { code: pushed.code || "origin_push_failed", message: pushed.message || "El push a Origin falló." },
    });
  }
  checks.push(check("origin.push", "semantic", true, pushed.remoteUrl || "push"));
  return envelope({
    tool: "origin.push",
    data: {
      repo,
      branch,
      remoteUrl: pushed.remoteUrl,
      page: pushed.page || pageFromRemote(pushed.remoteUrl),
    },
    checks,
  });
}
