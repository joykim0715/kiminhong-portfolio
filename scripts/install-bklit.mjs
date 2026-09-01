/**
 * Fetch @bklit shadcn registry items and write component files.
 * Usage: node scripts/install-bklit.mjs
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const BASE = "https://ui.bklit.com/r";
const START = ["line-chart", "bar-chart"];

const seen = new Set();

async function fetchItem(name) {
  const slug = name.replace(/^@bklit\//, "");
  if (seen.has(slug)) return;
  seen.add(slug);

  const url = `${BASE}/${slug}.json`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`${url} → ${res.status}`);
  }
  const item = await res.json();
  console.log(`ok ${slug} (${(item.files || []).length} files)`);

  for (const file of item.files || []) {
    const target = join(ROOT, file.target || file.path.replace(/^src\//, "src/components/"));
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, file.content, "utf8");
  }

  for (const dep of item.registryDependencies || []) {
    await fetchItem(dep);
  }
}

for (const name of START) {
  await fetchItem(name);
}

console.log(`done ${seen.size} items`);
