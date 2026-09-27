import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { findLoginUrl } from "./origin.mjs";

const IMAGE = "sdd-origin:bookworm";
const moldRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");

function run(cmd, args) {
  return new Promise((resolve) => {
    const child = spawn(cmd, args, { windowsHide: true });
    let stdout = "";
    let stderr = "";
    child.stdout?.on("data", (chunk) => {
      stdout += chunk;
    });
    child.stderr?.on("data", (chunk) => {
      stderr += chunk;
    });
    child.on("error", (error) => resolve({ code: 1, stdout, stderr: error.message }));
    child.on("close", (code) => resolve({ code: code ?? 1, stdout, stderr }));
  });
}

function volumeName(profile) {
  return `origin-home-${profile.id}`;
}

function loginName(profile) {
  return `origin-login-${profile.id}`;
}

async function ensureImage() {
  const seen = await run("docker", ["image", "inspect", IMAGE]);
  if (seen.code === 0) return true;
  const built = await run("docker", ["build", "-t", IMAGE, path.join(moldRoot, "tools", "origin")]);
  return built.code === 0;
}

const GIT = "git -C /src -c safe.directory=/src -c core.filemode=false";

const PUSH = `
set -eu
if ! ${GIT} remote get-url origin >/dev/null 2>&1; then
  create_out="$(origin repo create "$ORIGIN_REPO")"
  printf '%s\\n' "$create_out"
  url="$(printf '%s\\n' "$create_out" | grep -oE 'https://origin\\.cursor\\.com/[^[:space:]]+' | head -n 1 || true)"
  if [ -z "$url" ]; then
    echo "origin repo create no devolvió una URL" >&2
    exit 3
  fi
  ${GIT} remote add origin "$url"
fi
${GIT} push -u origin "HEAD:$ORIGIN_BRANCH"
${GIT} remote get-url origin
`.trim();

export function createOriginIo(profile) {
  const src = profile.baseDir;
  return {
    async inspect() {
      const docker = await run("docker", ["info"]);
      if (docker.code !== 0) {
        return { dockerOk: false, detail: "docker no responde", isRepo: false, branch: "", dirty: false, remoteUrl: "", authenticated: false };
      }
      const inside = await run("git", ["-C", src, "rev-parse", "--is-inside-work-tree"]);
      if (inside.code !== 0 || inside.stdout.trim() !== "true") {
        return { dockerOk: true, isRepo: false, branch: "", dirty: false, remoteUrl: "", authenticated: false };
      }
      const branch = await run("git", ["-C", src, "rev-parse", "--abbrev-ref", "HEAD"]);
      const status = await run("git", ["-C", src, "status", "--porcelain"]);
      const remote = await run("git", ["-C", src, "remote", "get-url", "origin"]);
      const remoteUrl = remote.code === 0 ? remote.stdout.trim() : "";
      if (status.stdout.trim().length > 0) {
        return {
          dockerOk: true,
          isRepo: true,
          branch: branch.stdout.trim(),
          dirty: true,
          remoteUrl,
          authenticated: false,
        };
      }
      const imageOk = await ensureImage();
      if (!imageOk) {
        return {
          dockerOk: false,
          detail: "no se pudo construir la imagen sdd-origin",
          isRepo: true,
          branch: branch.stdout.trim(),
          dirty: status.stdout.trim().length > 0,
          remoteUrl: "",
          authenticated: false,
        };
      }
      const auth = await run("docker", [
        "run", "--rm",
        "-v", `${volumeName(profile)}:/root`,
        IMAGE,
        "origin", "auth", "status",
      ]);
      return {
        dockerOk: true,
        isRepo: true,
        branch: branch.stdout.trim(),
        dirty: false,
        remoteUrl,
        authenticated: auth.code === 0,
      };
    },
    async beginLogin() {
      const name = loginName(profile);
      const state = await run("docker", ["inspect", "-f", "{{.State.Running}}", name]);
      if (state.stdout.trim() !== "true") {
        await run("docker", ["rm", "-f", name]);
        await run("docker", [
          "run", "-d", "--name", name,
          "-v", `${volumeName(profile)}:/root`,
          "-v", `${src}:/src`,
          IMAGE,
          "origin", "auth", "login",
        ]);
      }
      let logs = "";
      for (let attempt = 0; attempt < 20; attempt += 1) {
        const read = await run("docker", ["logs", name]);
        logs = `${read.stdout}\n${read.stderr}`;
        const loginUrl = findLoginUrl(logs);
        if (loginUrl) return { loginUrl };
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
      return { loginUrl: findLoginUrl(logs) };
    },
    async push() {
      const result = await run("docker", [
        "run", "--rm",
        "-e", `ORIGIN_REPO=${profile.git.repo}`,
        "-e", `ORIGIN_BRANCH=${profile.git.branch}`,
        "-v", `${volumeName(profile)}:/root`,
        "-v", `${src}:/src`,
        "-w", "/src",
        IMAGE,
        "bash", "-lc", PUSH,
      ]);
      const text = `${result.stdout}\n${result.stderr}`;
      const url = text.match(/https:\/\/origin\.cursor\.com\/\S+/)?.[0]?.replace(/\.git$/, "") ?? "";
      const remoteUrl = result.stdout.trim().split(/\r?\n/).filter(Boolean).at(-1) || (url ? `${url}.git` : "");
      if (result.code !== 0) {
        return {
          ok: false,
          code: "origin_push_failed",
          message: "El push a Origin falló.",
          detail: text.trim().slice(-400),
          remoteUrl,
        };
      }
      return { ok: true, remoteUrl, detail: "" };
    },
  };
}
