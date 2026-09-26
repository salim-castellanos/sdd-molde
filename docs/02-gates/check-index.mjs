import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.argv[2] ?? ".");
const docs = path.join(root, "docs");
const errors = [];

function walk(dir, pred, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ent.name === "node_modules" || ent.name === ".git") continue;
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(full, pred, out);
    else if (pred(ent.name)) out.push(full);
  }
  return out;
}

function frontmatter(file) {
  const text = fs.readFileSync(file, "utf8");
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!kv) continue;
    data[kv[1]] = kv[2].trim().replace(/^["']|["']$/g, "");
  }
  return data;
}

function rel(file) {
  return path.relative(root, file).replaceAll("\\", "/");
}

const huIds = new Map();
for (const file of walk(path.join(docs, "05-backlog"), (name) => name.startsWith("HU-") && name.endsWith(".md"))) {
  const id = frontmatter(file).id;
  if (!id) {
    errors.push(`${rel(file)}: falta id`);
    continue;
  }
  const prev = huIds.get(id);
  if (prev) errors.push(`id ${id} repetido: ${prev} y ${rel(file)}`);
  else huIds.set(id, rel(file));
}

const specs = walk(path.join(docs, "06-specs"), (name) => name === "spec.md").map((file) => ({
  file,
  rel: rel(file),
  ...frontmatter(file),
}));

const byHu = new Map();
for (const spec of specs) {
  if (!spec.hu) continue;
  const list = byHu.get(spec.hu) ?? [];
  list.push(spec);
  byHu.set(spec.hu, list);
}

for (const [hu, list] of byHu) {
  const implemented = list.filter((spec) => spec.status === "implemented");
  const current = implemented.filter((spec) => !spec["superseded-by"]);
  if (current.length > 1) {
    errors.push(
      `${hu}: ${current.length} specs implemented sin superseded-by (${current.map((spec) => spec.id || spec.rel).join(", ")})`,
    );
  }
  for (const spec of list) {
    if (spec.supersedes) {
      const prev = list.find((other) => other.id === spec.supersedes);
      if (!prev) errors.push(`${spec.rel}: supersedes ${spec.supersedes} no existe en ${hu}`);
      else if (prev["superseded-by"] !== spec.id) {
        errors.push(`${spec.rel}: ${spec.supersedes} no tiene superseded-by: ${spec.id}`);
      }
    }
    if (spec["superseded-by"]) {
      const next = list.find((other) => other.id === spec["superseded-by"]);
      if (!next) errors.push(`${spec.rel}: superseded-by ${spec["superseded-by"]} no existe en ${hu}`);
      else if (next.supersedes !== spec.id) {
        errors.push(`${spec.rel}: ${spec["superseded-by"]} no tiene supersedes: ${spec.id}`);
      }
    }
  }
}

if (errors.length) {
  console.error(`check-index ${root}`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`check-index ok ${root} (${huIds.size} HUs, ${specs.length} specs)`);
