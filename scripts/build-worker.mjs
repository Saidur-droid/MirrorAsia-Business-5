import { readFile, writeFile, mkdir, readdir, copyFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { join } from "node:path";

const [html, js, css] = await Promise.all([
  readFile("dist/index.html", "utf8"),
  readFile("dist/assets/entry.js", "utf8"),
  readFile("dist/assets/app.css", "utf8"),
]);
await mkdir("worker", {recursive:true});
await mkdir("cloudflare-generated", {recursive:true});
await writeFile("worker/generated-assets.ts",
  "export const HTML=" + JSON.stringify(html) + ";\n" +
  "export const JS=" + JSON.stringify(js) + ";\n" +
  "export const CSS=" + JSON.stringify(css) + ";\n");
execFileSync("npx", ["--yes", "wrangler@4", "deploy", "worker/entry.ts",
  "--name", "mirrorasia-db-test-20261010",
  "--compatibility-date", "2026-10-10",
  "--compatibility-flags", "nodejs_compat",
  "--dry-run", "--outdir", "cloudflare-generated/native-build"], {stdio:"inherit"});
const candidates = (await readdir("cloudflare-generated/native-build")).filter(x => x.endsWith(".js"));
if(candidates.length !== 1)throw new Error("Expected exactly one Cloudflare-native Worker JS output");
await copyFile(join("cloudflare-generated/native-build",candidates[0]), "cloudflare-generated/mirrorasia-worker-native.mjs");
console.log("Cloudflare-native Worker bundle built; live deployment requires explicit approval.");
