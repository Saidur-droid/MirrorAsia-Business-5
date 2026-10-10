import { readFile, writeFile, mkdir } from "node:fs/promises";
import { build } from "esbuild";
const [html,js,css]=await Promise.all([
 readFile("dist/index.html","utf8"),
 readFile("dist/assets/entry.js","utf8"),
 readFile("dist/assets/app.css","utf8")
]);
await mkdir("worker",{recursive:true});
await mkdir("cloudflare-generated",{recursive:true});
await writeFile("worker/generated-assets.ts",
  "export const HTML="+JSON.stringify(html)+";\n"+
  "export const JS="+JSON.stringify(js)+";\n"+
  "export const CSS="+JSON.stringify(css)+";\n");
await build({entryPoints:["worker/entry.ts"],outfile:"cloudflare-generated/mirrorasia-worker.mjs",
 bundle:true,platform:"node",format:"esm",target:"es2022",minify:true});
console.log("Worker bundle built and ready for authenticated Cloudflare deployment");
