// MirrorAsia isolated readiness preview. No DB, model API keys, or real respondents.
// Proxies public UI assets to the preserved preview Worker and replaces only /api/simulate.
const SOURCE_ORIGIN = "https://mirrorasia-ui-preview-20261013.mirrorasia-builders.workers.dev";
const SEGMENTS = ["students", "young-professionals", "family-shoppers"];
const COLORS = ["black", "red", "blue", "green"];
const COLOR_EFFECT = {
  students: { black: .025, red: .075, blue: .045, green: .01 },
  "young-professionals": { black: .085, red: .025, blue: .055, green: .04 },
  "family-shoppers": { black: .02, red: .045, blue: .04, green: .07 }
};
const PRICE_SENSITIVITY = { students: .0045, "young-professionals": .0028, "family-shoppers": .0037 };
const BASE_HEADERS = {
  "Cache-Control": "no-store",
  "X-Content-Type-Options": "nosniff",
  "X-MirrorAsia-Patch": "readiness-20261104",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-Frame-Options": "DENY"
};
const json = (data, status = 200) => new Response(JSON.stringify(data), {
  status, headers: { ...BASE_HEADERS, "Content-Type": "application/json; charset=utf-8" }
});
function invalid(message) { const e = new Error(message); e.status = 400; throw e; }
function boundedText(value, label, limit) {
  if (typeof value !== "string" || value.trim().length < 2 || value.trim().length > limit)
    invalid(label + " must be 2-" + limit + " characters.");
  return value.trim();
}
function parseScenario(v) {
  if (!v || typeof v !== "object" || Array.isArray(v)) invalid("Scenario must be an object.");
  if (v.country !== "Bangladesh" || v.city !== "Dhaka") invalid("Only Bangladesh/Dhaka is supported.");
  if (!SEGMENTS.includes(v.targetSegment)) invalid("Unsupported target segment.");
  if (!Array.isArray(v.concepts) || v.concepts.length !== 2) invalid("Exactly two concepts are required.");
  const concepts = v.concepts.map((c,i) => {
    if (!c || typeof c !== "object" || c.id !== (i === 0 ? "A" : "B") || !COLORS.includes(c.color))
      invalid("Concepts must be A and B with supported colors.");
    return { id: c.id, name: boundedText(c.name,"Concept name",64),
      color: c.color, message: boundedText(c.message,"Marketing message",180) };
  });
  if (!Array.isArray(v.prices) || v.prices.length < 2 || v.prices.length > 5 ||
      !v.prices.every(p => Number.isInteger(p) && p >= 20 && p <= 500))
    invalid("Provide 2-5 whole-number prices between BDT20 and BDT500.");
  const prices = [...new Set(v.prices)].sort((a,b)=>a-b);
  if (prices.length !== v.prices.length) invalid("Prices must be unique.");
  const syntheticAgents = v.syntheticAgents ?? 120;
  const seed = v.seed ?? 42;
  if (!Number.isInteger(syntheticAgents) || syntheticAgents < 50 || syntheticAgents > 500)
    invalid("Synthetic agent count must be 50-500.");
  if (!Number.isInteger(seed) || seed < 0 || seed > 2147483647)
    invalid("Seed must be between 0 and 2147483647.");
  return { country:"Bangladesh", city:"Dhaka", targetSegment:v.targetSegment, concepts, prices, syntheticAgents, seed };
}
function random(seed,segment,id,agent) {
  const key = [seed,segment,id,agent].join(":");
  let h=2166136261;
  for (let i=0;i<key.length;i++){h^=key.charCodeAt(i);h=Math.imul(h,16777619);}
  h ^= h>>>16; h=Math.imul(h,0x7feb352d);
  h ^= h>>>15; h=Math.imul(h,0x846ca68b);
  h ^= h>>>16;
  return (h>>>0)/4294967296;
}
function hash(str){let h=5381;for(const c of str)h=Math.imul(h,33)^c.charCodeAt(0);return(h>>>0).toString(16).padStart(8,"0");}
function run(scenario){
  const rows=[];
  for(const segment of SEGMENTS){
    for(const concept of scenario.concepts){
      let lastProbability=1;
      for(const price of scenario.prices){
        const raw=.62+COLOR_EFFECT[segment][concept.color]-(price-79)*PRICE_SENSITIVITY[segment];
        const assumedProbability=Math.min(lastProbability,Math.max(.02,Math.min(.98,raw)));
        lastProbability=assumedProbability;
        let signals=0;
        for(let agent=0;agent<scenario.syntheticAgents;agent++)
          if(random(scenario.seed,segment,concept.id,agent)<assumedProbability)signals++;
        rows.push({ segment,conceptId:concept.id,price,
          syntheticPositiveSignals:signals, syntheticAgents:scenario.syntheticAgents,
          interestIndex:Math.round(signals/scenario.syntheticAgents*1000)/10,
          assumedProbability:Math.round(assumedProbability*1000)/1000,
          explanation:"Illustrative color-affinity and price assumptions. Brand message is NOT analyzed in preview mode." });
      }
    }
  }
  return {
    runId:"demo-"+hash(JSON.stringify({scenario,estimates:null})),
    targetSegment:scenario.targetSegment,rows,mode:"preview",
    confidence:{tier:"Uncalibrated",humanBenchmarkAvailable:false,mirrorScore:null,
      validatedErrorRange:null,recommendation:"Collect consented human responses before business decisions."},
    provenance:{generatedAt:new Date().toISOString(),country:"Bangladesh",city:"Dhaka",
      populationPack:"BD-DHAKA-ILLUSTRATIVE-v0.1",inputSeed:scenario.seed,
      methodology:"Hand-authored illustrative assumptions sampled with seeded synthetic draws; no external AI inference.",
      model:null,realRespondents:0,syntheticSamplesAreNotHumans:true,
      caveats:["Not representative of Dhaka consumers.","Synthetic signals are not human survey participants.",
        "No human benchmark, confidence interval or MirrorScore.","No AI model inference or message-language analysis.",
        "Do not use these values as market-demand predictions."]}
  };
}
addEventListener("fetch",event=>event.respondWith(handle(event.request)));
async function handle(request) {
  const url=new URL(request.url);
  if(url.pathname==="/api/health" && request.method==="GET")
    return json({status:"ok",service:"mirrorasia-readiness-preview",version:"0.1.1-staged",runtime:"cloudflare-worker",mode:"preview"});
  if(url.pathname==="/api/simulate"){
    if(request.method!=="POST")return json({error:"Method not allowed"},405);
    if((request.headers.get("content-type")||"").split(";")[0].trim()!=="application/json")
      return json({error:"Expected application/json"},415);
    if(Number(request.headers.get("content-length")||0)>16000)
      return json({error:"Request too large"},413);
    try{
      const text=await request.text();
      if(text.length>16000)return json({error:"Request too large"},413);
      return json(run(parseScenario(JSON.parse(text))));
    }catch(e){
      if(e instanceof SyntaxError)return json({error:"Invalid JSON"},400);
      if(e && e.status===400)return json({error:e.message},400);
      return json({error:"Simulation failed"},500);
    }
  }
  if(url.pathname.startsWith("/api/"))return json({error:"Not found"},404);
  if(request.method!=="GET" && request.method!=="HEAD")return json({error:"Method not allowed"},405);
  const upstream=new URL(url.pathname+url.search,SOURCE_ORIGIN);
  try{
    const fetched=await fetch(new Request(upstream.toString(),{method:request.method,headers:request.headers,redirect:"follow"}));
    const headers=new Headers(fetched.headers);
    headers.delete("set-cookie");
    headers.set("X-MirrorAsia-Patch","readiness-20261104");
    return new Response(request.method==="HEAD"?null:fetched.body,{status:fetched.status,statusText:fetched.statusText,headers});
  }catch(e){return json({error:"Static preview temporarily unavailable"},502);}
}