import { readFile, mkdir, writeFile } from "node:fs/promises";

const [generated, worker] = await Promise.all([
  readFile("worker/generated-assets.ts", "utf8"),
  readFile("worker/readiness-preview.js", "utf8")
]);
const assets = {};
for (const match of generated.matchAll(/export const (HTML|JS|CSS)=("(?:\\.|[^"\\])*");/g)) {
  assets[match[1]] = JSON.parse(match[2]);
}
if (Object.keys(assets).length !== 3) {
  throw new Error("Missing compiled Studio HTML, JS or CSS.");
}
let result = worker.replace(
  /  if\(url\.pathname==="\/studio"\|\|url\.pathname==="\/"\)return new Response\([^\n]*\n/,
  ""
);
const eventMarker = 'addEventListener("fetch",event=>event.respondWith(handle(event.request)));';
if (!result.includes(eventMarker)) throw new Error("Staging Worker entrypoint missing.");
const exported = Object.entries(assets)
  .map(([key, asset]) => "const FULL_STUDIO_" + key + "=" + JSON.stringify(asset) + ";\n")
  .join("");
// Replacement callbacks are required: built JS can contain $& and $' patterns.
result = result.replace(eventMarker, () => exported + eventMarker);

const originMarker = '  const upstream=new URL(url.pathname+url.search,SOURCE_ORIGIN);';
if (!result.includes(originMarker)) throw new Error("Fallback routing marker missing.");
const routes = [
  '  if(url.pathname==="/"||url.pathname==="/studio"||url.pathname==="/index.html") return new Response(request.method==="HEAD"?null:FULL_STUDIO_HTML,{headers:{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Frame-Options":"DENY","X-Content-Type-Options":"nosniff"}});',
  '  if(url.pathname==="/assets/entry.js") return new Response(request.method==="HEAD"?null:FULL_STUDIO_JS,{headers:{"Content-Type":"application/javascript; charset=utf-8","Cache-Control":"public,max-age=300","X-Content-Type-Options":"nosniff"}});',
  '  if(url.pathname==="/assets/app.css") return new Response(request.method==="HEAD"?null:FULL_STUDIO_CSS,{headers:{"Content-Type":"text/css; charset=utf-8","Cache-Control":"public,max-age=300","X-Content-Type-Options":"nosniff"}});'
].join("\n") + "\n";
result = result.replace(originMarker, () => routes + originMarker);
if (result.includes("addEventListener(\"fetch\"") &&
    result.match(/addEventListener\("fetch"/g)?.length !== 1) {
  throw new Error("Generated React code was corrupted during assembly.");
}
if (result.length < 250000 || !result.includes("Download synthetic CSV")) {
  throw new Error("Staging bundle missing new full Studio UI.");
}
await mkdir("cloudflare-generated", { recursive: true });
await writeFile("cloudflare-generated/mirrorasia-readiness-staging.js", result);
console.log("Staging bundle generated:", result.length, "characters.");
