export const SCHEMA = "harness.result/v1";

const LEVELS = new Set(["schema", "semantic"]);

export function check(id, level, ok, detail) {
  if (!LEVELS.has(level)) throw new Error(`nivel de chequeo inválido: ${level}`);
  return { id, level, ok: Boolean(ok), detail: String(detail) };
}

export function envelope({ tool, data = {}, checks = [], error = null, next = "" }) {
  const failed = checks.filter((item) => !item.ok);
  const ok = failed.length === 0 && !error;
  return {
    ok,
    tool,
    schema: SCHEMA,
    data,
    checks,
    error: ok
      ? null
      : error ?? {
          code: "check_failed",
          message: failed[0]?.detail ?? "falló un chequeo",
        },
    next: ok ? next : next,
  };
}

export function assertEnvelope(value) {
  const problems = [];
  if (!value || typeof value !== "object") return ["el resultado no es un objeto"];
  if (typeof value.ok !== "boolean") problems.push("ok");
  if (typeof value.tool !== "string" || !value.tool) problems.push("tool");
  if (value.schema !== SCHEMA) problems.push("schema");
  if (!value.data || typeof value.data !== "object" || Array.isArray(value.data)) problems.push("data");
  if (!Array.isArray(value.checks)) problems.push("checks");
  else {
    for (const item of value.checks) {
      if (!item.id || !LEVELS.has(item.level) || typeof item.ok !== "boolean" || typeof item.detail !== "string") {
        problems.push(`check ${item.id ?? "?"}`);
      }
    }
  }
  if (value.ok && value.error !== null) problems.push("error debería ser null");
  if (!value.ok && (!value.error || !value.error.code || !value.error.message)) problems.push("error");
  if (typeof value.next !== "string") problems.push("next");
  const checksOk = value.checks.every((item) => item.ok);
  if (value.ok && !checksOk) problems.push("ok true con chequeo fallido");
  if (!value.ok && checksOk && !value.error) problems.push("ok false sin causa");
  return problems;
}
