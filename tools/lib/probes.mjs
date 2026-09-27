import { execFile } from "node:child_process";
import net from "node:net";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

function docker(args) {
  return execFileAsync("docker", args, { windowsHide: true, maxBuffer: 8 * 1024 * 1024 });
}

export function parseComposeLs(stdout) {
  const text = String(stdout ?? "").trim();
  if (!text) return [];
  const rows = text.startsWith("[") ? JSON.parse(text) : text.split(/\r?\n/).filter(Boolean).map((line) => JSON.parse(line));
  return rows.map((row) => ({
    name: row.Name ?? row.name,
    status: row.Status ?? row.status ?? "",
    configFiles: row.ConfigFiles ?? row.configFiles ?? "",
  }));
}

export function hostPorts(portsField) {
  const found = new Set();
  const text = String(portsField ?? "");
  for (const match of text.matchAll(/(?:0\.0\.0\.0|127\.0\.0\.1|\[::\]):(\d+)->/g)) found.add(Number(match[1]));
  return [...found];
}

export function parseDockerPs(stdout) {
  const text = String(stdout ?? "").trim();
  if (!text) return [];
  const rows = text.startsWith("[") ? JSON.parse(text) : text.split(/\r?\n/).filter(Boolean).map((line) => JSON.parse(line));
  return rows.map((row) => {
    const labels = String(row.Labels ?? "");
    const project = labels.match(/com\.docker\.compose\.project=([^,]+)/)?.[1] ?? null;
    const service = labels.match(/com\.docker\.compose\.service=([^,]+)/)?.[1] ?? null;
    return { project, service, ports: hostPorts(row.Ports), status: row.Status ?? row.State ?? "" };
  });
}

export function portOpen(port, host = "127.0.0.1", timeoutMs = 400) {
  return new Promise((resolve) => {
    const socket = net.connect({ port, host });
    const done = (open) => {
      socket.destroy();
      resolve(open);
    };
    socket.setTimeout(timeoutMs);
    socket.once("connect", () => done(true));
    socket.once("timeout", () => done(false));
    socket.once("error", () => done(false));
  });
}

export async function snapshotFromDocker(profile) {
  try {
    const listed = await docker(["compose", "ls", "--format", "json"]);
    const ps = await docker(["ps", "--format", "{{json .}}"]);
    const projects = parseComposeLs(listed.stdout);
    const containers = parseDockerPs(ps.stdout);
    const ports = {};
    for (const container of containers) {
      if (!container.project) continue;
      for (const port of container.ports) {
        ports[port] = { project: container.project, service: container.service };
      }
    }
    const listening = {};
    listening[profile.ports.web] = await portOpen(profile.ports.web);
    return { dockerOk: true, projects, ports, listening };
  } catch (error) {
    return { dockerOk: false, projects: [], ports: {}, listening: {}, message: error.message };
  }
}

export function upArgs(profile) {
  return ["compose", "-p", profile.compose.project, "-f", profile.compose.absoluteFile, "up", "-d"];
}

export function composeUp(profile) {
  return docker(upArgs(profile));
}

export function composeDown(project, file) {
  return docker(["compose", "-p", project, "-f", file, "down"]);
}
