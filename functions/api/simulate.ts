import { parseScenario, ScenarioInputError } from "../../src/lib/schema";
import { runSimulation } from "../../src/lib/engine";
export const onRequestPost = async (context: { request: Request }) => {
  const request=context.request;
  if (request.headers.get("content-type")?.split(";")[0].trim()!=="application/json")
    return Response.json({error:"Content-Type must be application/json"},{status:415});
  if (Number(request.headers.get("content-length")||0)>16000)
    return Response.json({error:"Request too large"},{status:413});
  try {
    const text=await request.text();
    if (text.length>16000) return Response.json({error:"Request too large"},{status:413});
    const result=runSimulation(parseScenario(JSON.parse(text)));
    return Response.json(result,{headers:{"Cache-Control":"no-store"}});
  } catch(error) {
    if (error instanceof ScenarioInputError) return Response.json({error:error.message},{status:400});
    if (error instanceof SyntaxError) return Response.json({error:"Invalid JSON"},{status:400});
    return Response.json({error:"Unable to complete simulation"},{status:500});
  }
};
