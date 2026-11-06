// @ts-ignore Cloudflare module bundle resolves the sibling JavaScript Worker module at deploy time.
import { handleAiAnalysis } from "./ai-analysis.mjs";
// @ts-ignore Cloudflare module bundle resolves the sibling JavaScript Worker module at deploy time.
import { handleHumanResearch } from "./human-research.mjs";
import {HTML, JS, CSS} from "./generated-assets";
import {Client} from "pg";
import {parseScenario,ScenarioInputError} from "../src/lib/schema";
import {runSimulation} from "../src/lib/engine";
type WorkerEnv={HYPERDRIVE?:{connectionString:string},DB_DIAGNOSTICS_TOKEN?:string};
function constantTimeMatch(left:string,right:string){
 const a=new TextEncoder().encode(left),b=new TextEncoder().encode(right);
 if(a.length!==b.length)return false;
 let diff=0;for(let i=0;i<a.length;i++)diff|=a[i]^b[i];return diff===0;
}
async function checkDatabase(env:WorkerEnv,request:Request){
 const token=env.DB_DIAGNOSTICS_TOKEN;
 if(!token||token.length<32||!constantTimeMatch(request.headers.get("x-mirrorasia-diagnostics")||"",token))return json({error:"Not found"},404);
 if(!env.HYPERDRIVE)return json({status:"unavailable",reason:"binding_missing"},503);
 const client=new Client({connectionString:env.HYPERDRIVE.connectionString,connectionTimeoutMillis:3500,query_timeout:4000,statement_timeout:4000,application_name:"mirrorasia-health"});
 try{
  await client.connect();
  const result=await client.query("SELECT 1 AS connected, (SELECT count(*)::integer FROM pg_catalog.pg_tables WHERE schemaname = 'public' AND tablename LIKE 'mirrorasia_%') AS table_count");
  return json({status:"ok",database:"connected",table_count:Number(result.rows[0]?.table_count||0)});
 }catch(_error){return json({status:"unavailable",database:"connection_failed"},503)}
 finally{try{await client.end()}catch{/* no credential or error output */}}
}
const jsonHeaders={"cache-control":"no-store","x-content-type-options":"nosniff","referrer-policy":"strict-origin-when-cross-origin","x-frame-options":"DENY"};
function json(value:unknown,status=200){return new Response(JSON.stringify(value),{status,headers:{"content-type":"application/json; charset=utf-8",...jsonHeaders}})}
const extraHeaders={
 "x-content-type-options":"nosniff","x-frame-options":"DENY",
 "referrer-policy":"strict-origin-when-cross-origin",
 "permissions-policy":"camera=(), microphone=(), geolocation=()"
};
export default {
 async fetch(request:Request,env:WorkerEnv):Promise<Response> {
   const url=new URL(request.url);
   if(url.pathname==="/api/research/study"||url.pathname==="/api/research/results"||url.pathname==="/api/research/submit")return handleHumanResearch(request,env);
   if(url.pathname==="/api/analyze")return handleAiAnalysis(request,env);
   if(url.pathname==="/api/internal/db-check") {if(request.method!=="GET")return json({error:"Method not allowed"},405);return checkDatabase(env,request);}
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
   if(url.pathname==="/"||url.pathname==="/studio"||url.pathname==="/index.html")
     return new Response(request.method==="HEAD"?null:HTML,{headers:{"content-type":"text/html; charset=utf-8","cache-control":"no-cache",...extraHeaders}});
   if(url.pathname==="/assets/entry.js")
     return new Response(request.method==="HEAD"?null:JS,{headers:{"content-type":"text/javascript; charset=utf-8","cache-control":"public,max-age=300",...extraHeaders}});
   if(url.pathname==="/assets/app.css")
     return new Response(request.method==="HEAD"?null:CSS,{headers:{"content-type":"text/css; charset=utf-8","cache-control":"public,max-age=300",...extraHeaders}});
   return json({error:"Not found"},404);
 }
};
