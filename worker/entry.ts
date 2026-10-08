import {HTML, JS, CSS} from "./generated-assets";
import {parseScenario,ScenarioInputError} from "../src/lib/schema";
import {runSimulation} from "../src/lib/engine";
const jsonHeaders={"cache-control":"no-store","x-content-type-options":"nosniff","referrer-policy":"strict-origin-when-cross-origin","x-frame-options":"DENY"};
function json(value:unknown,status=200){return new Response(JSON.stringify(value),{status,headers:{"content-type":"application/json; charset=utf-8",...jsonHeaders}})}
const extraHeaders={
 "x-content-type-options":"nosniff","x-frame-options":"DENY",
 "referrer-policy":"strict-origin-when-cross-origin",
 "permissions-policy":"camera=(), microphone=(), geolocation=()"
};
export default {
 async fetch(request:Request):Promise<Response> {
   const url=new URL(request.url);
   if(request.method==="GET" && url.pathname==="/api/health")
     return json({status:"ok",service:"mirrorasia-mvp",runtime:"cloudflare-worker",version:"0.1.0"});
   if(url.pathname==="/api/simulate") {
     if(request.method!=="POST") return json({error:"Method not allowed"},405);
     if(request.headers.get("content-type")?.split(";")[0].trim()!=="application/json")
       return json({error:"Content-Type must be application/json"},415);
     if(Number(request.headers.get("content-length")||0)>16000)
       return json({error:"Request too large"},413);
     try {
       const body=await request.text();
       if(body.length>16000) return json({error:"Request too large"},413);
       return json(runSimulation(parseScenario(JSON.parse(body))));
     }catch(e){
       if(e instanceof ScenarioInputError)return json({error:e.message},400);
       if(e instanceof SyntaxError)return json({error:"Invalid JSON"},400);
       return json({error:"Simulation failed"},500);
     }
   }
   if(request.method!=="GET" && request.method!=="HEAD")
     return json({error:"Method not allowed"},405);
   if(url.pathname==="/"||url.pathname==="/index.html")
     return new Response(request.method==="HEAD"?null:HTML,{headers:{"content-type":"text/html; charset=utf-8","cache-control":"no-cache",...extraHeaders}});
   if(url.pathname==="/assets/entry.js")
     return new Response(request.method==="HEAD"?null:JS,{headers:{"content-type":"text/javascript; charset=utf-8","cache-control":"public,max-age=300",...extraHeaders}});
   if(url.pathname==="/assets/app.css")
     return new Response(request.method==="HEAD"?null:CSS,{headers:{"content-type":"text/css; charset=utf-8","cache-control":"public,max-age=300",...extraHeaders}});
   return json({error:"Not found"},404);
 }
};
