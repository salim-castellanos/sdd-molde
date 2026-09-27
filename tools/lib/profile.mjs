import fs from "node:fs";
import path from "node:path";
import { check } from "./envelope.mjs";

const REQUIRED = [
  ["id"],
  ["compose", "project"],
  ["compose", "file"],
  ["compose", "services"],
  ["ports", "postgresHost"],
  ["ports", "api"],
  ["ports", "web"],
  ["web", "cwd"],
  ["web", "command"],
];

function dig(object, keys) {
  return keys.reduce((cursor, key) => (cursor == null ? undefined : cursor[key]), object);
}

export function parseProfile(raw, { composeText = "", composeExists = true } = {}) {
  const checks = [];
  let parsed = raw;
  if (typeof raw === "string") {
    try {
      parsed = JSON.parse(raw);
      checks.push(check("profile.json", "schema", true, "JSON válido"));
    } catch {
      return {
        profile: null,
        checks: [check("profile.json", "schema", false, "JSON inválido")],
        error: { code: "profile_invalid", message: "harness.profile.json no es JSON." },
      };
    }
  } else {
    checks.push(check("profile.json", "schema", true, "objeto de perfil"));
  }

  const missing = REQUIRED.filter((keys) => dig(parsed, keys) == null || dig(parsed, keys) === "");
  checks.push(
    check(
      "profile.required",
      "schema",
      missing.length === 0,
      missing.length ? `faltan ${missing.map((keys) => keys.join(".")).join(", ")}` : "campos requeridos",
    ),
  );
  if (!Array.isArray(parsed?.compose?.services) || parsed.compose.services.length === 0) {
    checks.push(check("profile.services", "schema", false, "compose.services es una lista vacía"));
  }
  const commandOk = parsed?.web?.command === "npm run dev";
  checks.push(check("web.command", "schema", commandOk, commandOk ? "npm run dev" : `comando no permitido: ${parsed?.web?.command ?? ""}`));
  if (!commandOk) {
    return {
      profile: null,
      checks,
      error: { code: "profile_invalid", message: "El web del perfil solo puede ser npm run dev." },
    };
  }

  if (missing.length || !Array.isArray(parsed?.compose?.services) || parsed.compose.services.length === 0) {
    return {
      profile: null,
      checks,
      error: { code: "profile_invalid", message: "El perfil no trae los campos del harness." },
    };
  }

  const profile = {
    ...parsed,
    forbiddenProjects: Array.isArray(parsed.forbiddenProjects) ? parsed.forbiddenProjects : [],
  };

  checks.push(
    check("compose.file", "semantic", composeExists, composeExists ? profile.compose.file : "no está el compose del perfil"),
  );
  if (!composeExists) {
    return {
      profile,
      checks,
      error: { code: "compose_mismatch", message: "El archivo Compose del perfil no existe." },
    };
  }

  const postgresMap = `"${profile.ports.postgresHost}:5432"`;
  const apiMap = `"${profile.ports.api}:${profile.ports.api}"`;
  const publishesHostPostgres = composeText.includes('"5432:5432"') || composeText.includes("'5432:5432'");
  checks.push(
    check(
      "compose.postgres",
      "semantic",
      composeText.includes(postgresMap) && !publishesHostPostgres,
      publishesHostPostgres ? "el compose publica 5432 en el host" : postgresMap,
    ),
  );
  checks.push(
    check("compose.api", "semantic", composeText.includes(apiMap), apiMap),
  );
  const clusterOff = /CLUSTER:\s*["']0["']/.test(composeText);
  checks.push(check("compose.cluster", "semantic", clusterOff, clusterOff ? "CLUSTER 0" : "CLUSTER no es 0"));

  const mismatch = checks.some((item) => item.level === "semantic" && !item.ok);
  return {
    profile,
    checks,
    error: mismatch
      ? { code: "compose_mismatch", message: "El compose no coincide con el perfil (puertos o CLUSTER)." }
      : null,
  };
}

export function loadProfile(profilePath) {
  const absolute = path.resolve(profilePath);
  const baseDir = path.dirname(absolute);
  let raw;
  try {
    raw = fs.readFileSync(absolute, "utf8");
  } catch {
    return {
      profile: null,
      baseDir,
      checks: [check("profile.json", "schema", false, "no se pudo leer el perfil")],
      error: { code: "profile_invalid", message: "No está el harness.profile.json." },
    };
  }
  const parsed = parseProfile(raw, { composeText: "", composeExists: true });
  if (!parsed.profile) return { ...parsed, baseDir };
  const composePath = path.resolve(baseDir, parsed.profile.compose.file);
  const composeExists = fs.existsSync(composePath);
  const composeText = composeExists ? fs.readFileSync(composePath, "utf8") : "";
  const again = parseProfile(raw, { composeText, composeExists });
  again.profile.compose.absoluteFile = composePath;
  again.profile.baseDir = baseDir;
  again.profile.web.absoluteCwd = path.resolve(baseDir, again.profile.web.cwd);
  return { ...again, baseDir };
}
