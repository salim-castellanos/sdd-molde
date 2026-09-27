import { envelope } from "./lib/envelope.mjs";
import { executeTool } from "./lib/execute.mjs";
import { createOriginIo } from "./lib/origin-docker.mjs";
import { loadProfile } from "./lib/profile.mjs";
import { composeDown, composeUp, portOpen, snapshotFromDocker } from "./lib/probes.mjs";
import { spawn } from "node:child_process";

const USAGE = `node tools/harness.mjs <status|up|down|web|origin> --profile <harness.profile.json> [--project nombre]`;

function parseArgs(argv) {
  const args = { _: [] };
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token.startsWith("--")) {
      args[token.slice(2)] = argv[index + 1];
      index += 1;
    } else args._.push(token);
  }
  return args;
}

function startWeb(profile) {
  const child = spawn("npm", ["run", "dev"], {
    cwd: profile.web.absoluteCwd,
    detached: true,
    stdio: "ignore",
    shell: true,
    windowsHide: true,
  });
  child.unref();
  return child.pid;
}

async function waitForWeb(profile) {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    if (await portOpen(profile.ports.web)) return true;
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  return false;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const name = args._[0];
  if (!name || !args.profile) {
    console.log(JSON.stringify(envelope({
      tool: "runtime.usage",
      checks: [],
      error: { code: "profile_invalid", message: USAGE },
    })));
    process.exit(1);
  }
  const loaded = loadProfile(args.profile);
  if (loaded.error || !loaded.profile) {
    const result = envelope({
      tool: `runtime.${name}`,
      checks: loaded.checks,
      error: loaded.error,
      data: {},
    });
    console.log(JSON.stringify(result));
    process.exit(result.ok ? 0 : 1);
  }
  const profile = loaded.profile;
  const result = await executeTool(name, {
    profile,
    project: args.project,
    io: {
      probe: () => snapshotFromDocker(profile),
      up: (item) => composeUp(item),
      down: (project, file) => composeDown(project, file),
      startWeb: async (item) => {
        startWeb(item);
        await waitForWeb(item);
      },
      ...createOriginIo(profile),
    },
  });
  console.log(JSON.stringify(result));
  process.exit(result.ok ? 0 : 1);
}

main().catch((error) => {
  console.log(JSON.stringify(envelope({
    tool: "runtime.crash",
    checks: [],
    error: { code: "docker_unavailable", message: error.message },
  })));
  process.exit(1);
});
