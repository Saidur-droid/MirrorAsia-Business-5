import {strict as assert} from "node:assert";
import test from "node:test";
import {cityDataUri,makeCitySvg,type CityName} from "../src/app/city-illustrations.ts";
const cities:CityName[]=["Dhaka","Chattogram","Sylhet"];
test("City SVGs are detailed, original, distinct and deterministic",()=>{
 const svgs=cities.map(name=>{
  const svg=makeCitySvg(name);
  assert.ok(svg.startsWith('<svg xmlns="http://www.w3.org/2000/svg"'));
  assert.ok(svg.endsWith("</svg>"));
  assert.ok(svg.includes(`Illustrated miniature of ${name}, Bangladesh`));
  assert.ok(svg.length>30000);
  assert.ok((svg.match(/<polygon/g)||[]).length>50);
  assert.equal(makeCitySvg(name),svg);
  assert.ok(cityDataUri(name).startsWith("data:image/svg+xml;charset=UTF-8,%3Csvg"));
  return svg;
 });
 assert.notEqual(svgs[0],svgs[1]);assert.notEqual(svgs[1],svgs[2]);
});
test("Art contains geographic detail, not generic cube placeholders",()=>{
 assert.ok(makeCitySvg("Dhaka").includes("#5b7379"),"Parliament motifs");
 assert.ok(makeCitySvg("Chattogram").includes("#e8aa64"),"Port cranes");
 assert.ok(makeCitySvg("Sylhet").includes("#2e735a"),"Tea-estate rows");
});