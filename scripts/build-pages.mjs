import { build } from "esbuild";
import { mkdir, copyFile, writeFile } from "node:fs/promises";
await mkdir("dist/assets",{recursive:true});
await build({entryPoints:["src/app/page.tsx"],outfile:"dist/assets/app.js",bundle:true,minify:true,format:"esm",platform:"browser",jsx:"automatic",target:"es2022",loader:{".tsx":"tsx"}});
await copyFile("src/app/globals.css","dist/assets/app.css");
await writeFile("dist/index.html",`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>MirrorAsia | FMCG Studio</title><link rel="stylesheet" href="/assets/app.css"></head><body><div id="root"></div><script type="module" src="/assets/entry.js"></script></body></html>`);
await build({entryPoints:["src/pages-client.tsx"],outfile:"dist/assets/entry.js",bundle:true,minify:true,format:"esm",platform:"browser",jsx:"automatic",target:"es2022"});
console.log("Cloudflare Pages frontend generated under dist/");
