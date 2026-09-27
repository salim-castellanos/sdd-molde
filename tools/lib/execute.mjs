import { check, envelope } from "./envelope.mjs";
import { evaluateStatus, finishDown, finishUp, finishWeb, planDown, planUp, planWeb } from "./runtime.mjs";

const LATER = new Set(["rebuild", "seed", "check", "test"]);

export async function executeTool(name, { profile, project, io }) {
  if (LATER.has(name)) {
    return envelope({
      tool: `runtime.${name}`,
      checks: [check("tool", "schema", false, "corte 4")],
      error: { code: "tool_not_implemented", message: "Esta herramienta no está en el corte 2." },
    });
  }
  const snapshot = await io.probe();
  if (name === "status") return evaluateStatus(profile, snapshot);
  if (name === "up") {
    const plan = planUp(profile, snapshot);
    if (plan.action !== "up") return plan.result;
    await io.up(profile);
    return finishUp(profile, await io.probe());
  }
  if (name === "down") {
    const plan = planDown(profile, snapshot, project);
    if (plan.action !== "down") return plan.result;
    await io.down(plan.project, plan.file);
    return finishDown(plan.project);
  }
  if (name === "web") {
    const plan = planWeb(profile, snapshot);
    if (plan.action !== "start") return plan.result;
    await io.startWeb(profile);
    const after = await io.probe();
    if (!after.listening?.[profile.ports.web] || after.ports?.[profile.ports.web]) {
      return envelope({
        tool: "runtime.web",
        data: { action: "started", port: profile.ports.web },
        checks: [check("web.listening", "semantic", false, "el proceso arrancó y el puerto del host no abrió")],
        error: { code: "web_not_listening", message: "Vite no llegó a escuchar." },
      });
    }
    return finishWeb(profile.ports.web);
  }
  return envelope({
    tool: name || "runtime.unknown",
    checks: [check("tool", "schema", false, "herramienta desconocida")],
    error: { code: "tool_not_implemented", message: "Herramienta desconocida." },
  });
}
