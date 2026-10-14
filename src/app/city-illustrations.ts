/** Original Mirror Asia miniature city illustrations. Deterministic, self-contained SVG. */
export type CityName = "Dhaka" | "Chattogram" | "Sylhet";
type Pt = [number, number];
type Palette = { soil:string; grass:string; deep:string; path:string; water:string; wall:string; light:string; roof:string; accent:string; shadow:string };
const themes:Record<CityName,Palette> = {
 Dhaka:{soil:"#d5bba0",grass:"#c0cda5",deep:"#80a18b",path:"#e6d9c4",water:"#8ec9d2",wall:"#e6cfaf",light:"#fff4df",roof:"#bb746b",accent:"#dc9b58",shadow:"#48647c"},
 Chattogram:{soil:"#c8b6a0",grass:"#9ebc9d",deep:"#638e80",path:"#d3d4c1",water:"#68b7c8",wall:"#e5d8c1",light:"#fff5e1",roof:"#b15f67",accent:"#e3a85c",shadow:"#366e83"},
 Sylhet:{soil:"#acb39a",grass:"#b0cba4",deep:"#548d72",path:"#e4d7bc",water:"#82c4d1",wall:"#e8ddc5",light:"#fef5df",roof:"#b66f68",accent:"#d6a16b",shadow:"#326f62"}
};
const esc=(s:string)=>s.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll('"',"&quot;");
function rng(seed:number){let x=seed>>>0;return()=>{x=(1664525*x+1013904223)>>>0;return x/4294967296;}}
const P=(x:number,y:number,z=0):Pt=>[380+(x-y)*12.3,121+(x+y)*6.35-z*12.1];
const pair=([x,y]:Pt)=>`${x.toFixed(1)},${y.toFixed(1)}`;
const poly=(pts:Pt[],fill:string,stroke="",extra="")=>`<polygon points="${pts.map(pair).join(" ")}" fill="${fill}"${stroke?` stroke="${stroke}" ${extra.includes("stroke-width=")?"":" stroke-width=\".8\""}`:""} ${extra}/>`;
const path=(d:string,fill="none",stroke="",sw=1,extra="")=>`<path d="${d}" fill="${fill}"${stroke?` stroke="${stroke}" stroke-width="${sw}"`:""} ${extra}/>`;
const line=(a:Pt,b:Pt,color:string,width=1.2,extra="")=>path(`M${pair(a)}L${pair(b)}`,"none",color,width,`stroke-linecap="round" ${extra}`);
const ellipse=(x:number,y:number,rx:number,ry:number,fill:string,extra="")=>`<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${rx}" ry="${ry}" fill="${fill}" ${extra}/>`;
const surface=(x:number,y:number,w:number,d:number,fill:string,stroke="")=>poly([P(x,y),P(x+w,y),P(x+w,y+d),P(x,y+d)],fill,stroke);
const center=(x:number,y:number,z=0)=>P(x,y,z);
function shadow(x:number,y:number,w:number,d:number,op=.11){const a=P(x+w/2,y+d/2);return ellipse(a[0]+6,a[1]+4,Math.max(9,(w+d)*5.7),Math.max(5,(w+d)*2.65),"#3b4f4c",`opacity="${op}"`);}
function rngRange(r:()=>number,a:number,b:number){return a+(b-a)*r();}
function roofRidge(x:number,y:number,w:number,d:number,h:number,style:string,roof:string,light:string){
 if(style==="gable"){
  const p1=P(x,y,h),p2=P(x+w,y,h),p3=P(x+w,y+d,h),p4=P(x,y+d,h);
  const ridge1=P(x+w/2,y,h+1),ridge2=P(x+w/2,y+d,h+1);
  return poly([p1,ridge1,ridge2,p4],light,"#967e7e")+poly([ridge1,p2,p3,ridge2],roof,"#967e7e")+line(ridge1,ridge2,"#fff2da",1.1);
 }
 return poly([P(x,y,h),P(x+w,y,h),P(x+w,y+d,h),P(x,y+d,h)],roof,"#b3a29a");
}
function building(x:number,y:number,w:number,d:number,h:number, opts:{wall?:string;roof?:string;type?:string;accent?:string;windows?:boolean;detail?:number}={}, c:Palette){
 const wall=opts.wall||c.wall,roof=opts.roof||c.roof,type=opts.type||"flat",accent=opts.accent||c.shadow;
 const t=[P(x,y,h),P(x+w,y,h),P(x+w,y+d,h),P(x,y+d,h)];
 const b=[P(x,y),P(x+w,y),P(x+w,y+d),P(x,y+d)];
 let s=shadow(x,y,w,d)+poly([t[3],t[2],b[2],b[3]],wall,"#968c85")+poly([t[1],t[2],b[2],b[1]],"#9aa9a1","#798d85");
 // Repeated window detail on both visible elevations, with small trim and reflected panes.
 if(opts.windows!==false){
  const floors=Math.min(9,Math.max(1,Math.floor(h/.88)));
  const cols=Math.max(1,Math.floor(w/.66));
  for(let f=0;f<floors;f++){
   for(let j=0;j<cols;j++){
    const u=(j+1)/(cols+1),z=.45+f*.89;
    if(z+0.34>=h)continue;
    let a=P(x+w*(u-.09),y+d,z),bb=P(x+w*(u+.09),y+d,z),cc=P(x+w*(u+.09),y+d,z+.38),dd=P(x+w*(u-.09),y+d,z+.38);
    s+=poly([a,bb,cc,dd],(f+j)%5===0?"#f9e8b3":accent,"",`opacity="${(f+j)%5===0?".94":".7"}"`);
   }
  }
  const cols2=Math.max(1,Math.floor(d/.72));
  for(let f=0;f<floors;f++)for(let j=0;j<cols2;j++){
   const u=(j+1)/(cols2+1),z=.42+f*.89;if(z+.38>=h)continue;
   s+=poly([P(x+w,y+d*(u-.09),z),P(x+w,y+d*(u+.09),z),P(x+w,y+d*(u+.09),z+.39),P(x+w,y+d*(u-.09),z+.39)],f%6===0?"#f6dbab":"#4f7888","",`opacity=".74"`);
  }
 }
 s+=roofRidge(x,y,w,d,h,type,roof,c.light);
 if(type==="flat"){
   s+=poly([P(x+.12,y+.12,h+.11),P(x+w-.12,y+.12,h+.11),P(x+w-.12,y+d-.12,h+.11),P(x+.12,y+d-.12,h+.11)],"#fff9e4","",`opacity=".19"`);
   if(w>1.5&&d>1.1){s+=surface(x+w*.3,y+d*.34,w*.36,d*.25,"#95afb4")+line(P(x+.13,y+d-.18,h),P(x+w-.13,y+d-.18,h),"#f7e6c8",1)}
 }
 if(type==="tower"){
   s+=line(P(x+w/2,y+d/2,h),P(x+w/2,y+d/2,h+2),"#e9d1a4",2)+ellipse(...P(x+w/2,y+d/2,h+2),2.5,2.5,"#ce857a");
 }
 return s;
}
function roundedTree(x:number,y:number,size:number,color:string,variant=0){
 const a=P(x,y,0),t=P(x,y,size);let s=ellipse(a[0]+3,a[1]+2,size*8,size*3.1,"#314d45",`opacity=".12"`);
 s+=line(P(x,y,0),P(x,y,size*.76),"#806c54",1.9);
 if(variant%4===0){
  s+=ellipse(t[0],t[1]+3,size*9,size*5,color,`stroke="#508675" stroke-width=".65"`);
  s+=ellipse(t[0]-size*1.3,t[1]+1,size*5.2,size*3.3,"#d0e0a9",`opacity=".78"`);
  s+=ellipse(t[0]+size*1.1,t[1]-size*.7,size*5.7,size*3.6,"#5c9e79");
 }else{
  s+=ellipse(t[0],t[1]+1,size*7.6,size*6.0,color);
  s+=ellipse(t[0]-size*.7,t[1]-size*.7,size*5.0,size*3.5,"#b6d5a6",`opacity=".75"`);
  s+=ellipse(t[0]+size*.65,t[1]-size*.8,size*4.6,size*3.7,"#5f9b7b",`opacity=".9"`);
 }
 return s;
}
function dome(x:number,y:number,w:number,d:number,h:number,c:Palette,base="#e7d8bd"){
 const tx=P(x+w/2,y+d/2,h),rx=12.3*(w+d)*.28,ry=rx*.56;
 let s=building(x,y,w,d,h,{wall:base,roof:"#f0e3c7",windows:true},c);
 s+=ellipse(tx[0],tx[1]+1,rx,ry,"#e9debd");
 s+=path(`M${(tx[0]-rx).toFixed(1)} ${(tx[1]+2).toFixed(1)} Q${tx[0]} ${(tx[1]-rx*1.5).toFixed(1)} ${(tx[0]+rx).toFixed(1)} ${(tx[1]+2).toFixed(1)} Z`,"#79b2a0","#a6d1bc",.8);
 s+=line([tx[0],tx[1]-rx*.7],[tx[0],tx[1]-rx*.7-8],"#bfa46f",1.7);
 s+=ellipse(tx[0],tx[1]-rx*.7-8,2.1,2.1,"#d5ad62");
 return s;
}
function landmarkParliament(x:number,y:number,c:Palette){
 const w=4.6,d=4.0,h=4.8;
 let s=surface(x-.7,y-.55,w+1.4,d+1.0,"#9cbdb3")+surface(x-.48,y-.4,w+.96,d+.8,"#c2d8b9");
 // Monumental angular profile of Jatiya Sangsad Bhaban; an abstract depiction, not an exact model.
 s+=building(x,y,w,d,h,{wall:"#b4aa99",roof:"#ccc3ae",accent:"#4f5b61",windows:false},c);
 for(let i=0;i<3;i++){
  const cx=x+.5+i*1.65;const a=P(cx,y+d,h*.72);
  s+=ellipse(a[0],a[1],7.5,13,"#5b7379",`stroke="#f0e7d4" stroke-width="3"`);
  s+=ellipse(a[0],a[1],4.1,8.4,"#c4a57e",`opacity=".65"`);
 }
 s+=poly([P(x+.4,y+.3,h+.15),P(x+w-.4,y+.3,h+.15),P(x+w-.4,y+d-.3,h+.15),P(x+.4,y+d-.3,h+.15)],"#b9b4a7","#e4d9bd");
 s+=surface(x-1,y+d+.3,w+2,.5,"#8fc4c8");
 for(let i=0;i<6;i++)s+=roundedTree(x-.65+i*1.05,y-.6,.55,"#5d977b",i);
 return s;
}
function lalbaghFort(x:number,y:number,c:Palette){
 let s=surface(x-.7,y-.65,5.2,5.1,"#b7c9a9")+surface(x-.3,y-.25,4.4,4.25,"#d5c7aa");
 s+=building(x+.48,y+.9,2.7,2.3,2.4,{wall:"#e5c29f",roof:"#be8272",windows:false},c);
 s+=dome(x+1.12,y+1.25,1.45,1.45,2.6,c,"#eed9bf");
 for(let i=0;i<4;i++){
  const a=P(x+.65+i*.72,y+3.2,.7);
  s+=line(P(x+.65+i*.72,y+3.2,0),P(x+.65+i*.72,y+3.2,2.2),"#be6e64",3.2);
  s+=ellipse(a[0],a[1]-16,1.8,1.8,"#f8ddac");
 }
 for(let i=0;i<4;i++)s+=roundedTree(x-.24+i*1.15,y+.35,.46,"#5f9b78",i);
 return s;
}
function rickshaw(x:number,y:number,color:string){
 const p=P(x,y,.13);let s=ellipse(p[0]+1,p[1]+3,7,2.5,"#51605c",`opacity=".13"`);
 s+=line([p[0]-4,p[1]],[p[0]+5,p[1]],color,2.5)+path(`M${p[0]-3},${p[1]-1}Q${p[0]},${p[1]-9} ${p[0]+4},${p[1]-2}`,color,"#fff1bc",1);
 s+=ellipse(p[0]-4,p[1]+1,2.1,2.3,"#303e4a")+ellipse(p[0]+5,p[1]+1,2.1,2.3,"#303e4a");return s;
}
function hill(x:number,y:number,r:number,color:string){
 const p=P(x,y);return path(`M${p[0]-r*1.55} ${p[1]+r*.28} Q${p[0]-r*.88} ${p[1]-r*.94} ${p[0]-r*.32} ${p[1]-r*.57} Q${p[0]+r*.14} ${p[1]-r*1.65} ${p[0]+r*.88} ${p[1]-r*.62} Q${p[0]+r*1.2} ${p[1]-r*.43} ${p[0]+r*1.47} ${p[1]+r*.28}Z`,color,"#7ea38c",.8);
}
function containerBox(x:number,y:number,w:number,d:number,h:number,color:string){
 const a=[P(x,y,h),P(x+w,y,h),P(x+w,y+d,h),P(x,y+d,h)];
 let s=shadow(x,y,w,d,.13);
 s+=poly([a[3],a[2],P(x+w,y+d),P(x,y+d)],color,"#4b7180")+poly([a[1],a[2],P(x+w,y+d),P(x+w,y)],"#8d8f93","#6e747f");
 s+=poly(a,"#d7c8a5","#fbefd8");
 for(let i=1;i<8;i++)s+=line(P(x+w*i/8,y+d,h*.12),P(x+w*i/8,y+d,h*.91),"#f2e6d5",.65,`opacity=".7"`);
 return s;
}
function gantryCrane(x:number,y:number,h=7){
 const base=P(x,y,0),up=P(x,y,h),front=P(x+3,y,h);let s=shadow(x,y,3,2,.13);
 s+=line(base,up,"#e8aa64",4.1)+line(P(x+1.8,y,0),P(x+1.8,y,h-.2),"#e8aa64",3.6);
 s+=line(up,front,"#de9259",4.2)+line(front,P(x+4.6,y,h+.2),"#d78d61",3.2);
 s+=line(up,P(x+1.8,y,0),"#a96d5d",1.1)+line(P(x+1.8,y,h-.2),P(x,y,0),"#a96d5d",1.1);
 for(let i=0;i<4;i++){
  let a=P(x+i*.72,y,h),b=P(x+i*.72,y,h-(i%2?.3:1.6));s+=line(a,b,"#b87f62",.9);
 }
 const hook=P(x+3.55,y,h);s+=line(hook,P(x+3.55,y,2.5),"#596c75",1.25)+line(P(x+3.3,y,2.5),P(x+3.8,y,2.5),"#6d7780",2);
 return s;
}
function ship(x:number,y:number,c:Palette){
 const p1=P(x,y,.8),p2=P(x+4,y,.8),p3=P(x+4,y+1.35,.8),p4=P(x,y+1.35,.8);
 let s=poly([p1,p2,p3,p4],"#354f67","#d6e2d6");
 s+=poly([p4,p3,P(x+3.4,y+1.2,0),P(x+.35,y+1.2,0)],"#aa685e","#74525a");
 for(let j=0;j<3;j++)for(let i=0;i<2;i++)s+=containerBox(x+.5+j*.95,y+.1+i*.57,.87,.49,.6+(j%2)*.24,["#da9870","#e4c18a","#78a4a2","#d57b78"][(i+j)%4]);
 s+=building(x+3.2,y+.2,.5,.8,1.45,{wall:"#f1e6d6",roof:"#c86c66",windows:false},c);
 return s;
}
function teaShrub(x:number,y:number,t:number){const p=P(x,y,.2),r=3.2+t*.8;return ellipse(p[0],p[1],r,r*.52,"#2e735a",`opacity=".96"`)+ellipse(p[0]-1,p[1]-1.4,r*.63,r*.3,"#aad29b",`opacity=".8"`);}
function minaret(x:number,y:number,c:Palette){
 let s=building(x,y,.67,.68,6.2,{wall:"#f5e8d5",roof:"#a2b8a1",windows:false},c);
 for(let i=0;i<3;i++){
  const q=P(x+.32,y+.35,2+i*1.35);s+=ellipse(q[0],q[1],5.3,2.5,"#e3d2b4",`stroke="#9caa96" stroke-width=".7"`);
 }
 s+=line(P(x+.34,y+.34,6.2),P(x+.34,y+.34,7.35),"#b9a070",2);
 s+=ellipse(...P(x+.34,y+.34,7.35),2.3,2.3,"#e7c076");return s;
}
function renderScene(name:CityName){
 const c=themes[name],r=rng(name==="Dhaka"?515:name==="Chattogram"?2704:306),objs:{depth:number;svg:string}[]=[];
 const add=(x:number,y:number,s:string)=>objs.push({depth:x+y,svg:s});
 let ground=`<defs>
  <linearGradient id="land" x1=".05" y1="0" x2=".92" y2="1"><stop stop-color="${c.grass}"/><stop offset=".53" stop-color="#dce4c2"/><stop offset="1" stop-color="${c.deep}"/></linearGradient>
  <linearGradient id="shore" x1="0" y1="0" x2=".8" y2="1"><stop stop-color="${c.soil}"/><stop offset="1" stop-color="#837f78"/></linearGradient>
  <linearGradient id="wave" x1="0" y1="0" x2=".85" y2="1"><stop stop-color="#c7e8dc"/><stop offset="1" stop-color="${c.water}"/></linearGradient>
  <clipPath id="tileclip">${poly([P(0,0),P(23.7,0),P(23.7,23.7),P(0,23.7)],"white")}</clipPath>
 </defs>`;
 ground+=ellipse(392,449,265,23,"#536c6e",`opacity=".035"`)+ellipse(392,444,235,15,"#536c6e",`opacity=".03"`);
 ground+=poly([P(0,0),P(23.7,0),P(23.7,23.7),P(0,23.7)],"url(#land)","#f3eee4",`stroke-width="4"`);
 ground+=poly([P(0,23.7),P(23.7,23.7),P(23.7,23.7,-1.8),P(0,23.7,-1.8)],"url(#shore)","#9a9382");
 ground+=poly([P(23.7,0),P(23.7,23.7),P(23.7,23.7,-1.8),P(23.7,0,-1.8)],"#99aaa0","#8e9a90");
 let paint="";
 // Embedded limestone walkways and thin stone seams, unlike repeated generic city cubes.
 for(let i=1;i<=11;i++){
  const ix=1.3+i*1.76;
  paint+=line(P(ix,.2),P(ix,23.6),"#ffffff",.8,`opacity=".08"`);
 }
 for(let j=0;j<105;j++){
  const x=rngRange(r,1,23),y=rngRange(r,1,23);
  const p=P(x,y);paint+=ellipse(p[0],p[1],Number(rngRange(r,.7,2).toFixed(1)),Number(rngRange(r,.3,1.1).toFixed(1)),r()>.5?"#f0e8ca":"#4d946d",`opacity="${rngRange(r,.1,.3).toFixed(2)}"`);
 }
 if(name==="Dhaka"){
  // Buriganga-inspired river edge and bridges.
  paint+=surface(19.3,.4,4.35,22.7,"url(#wave)")+surface(18.9,.4,.37,22.7,"#d6d4b6");
  for(let i=0;i<16;i++){
   const a=P(19.7+r()*3.1,1.5+i*1.35);paint+=line([a[0]-7,a[1]],[a[0]+4,a[1]+1.4],"#f5fff5",1.2,`opacity=".65"`);
  }
  paint+=surface(0,8.2,18.9,1.15,"#d7cfba")+surface(8.5,0,1.3,19.0,"#e4d7bc");
  paint+=line(P(0,8.75),P(19.3,8.75),"#fff8d8",1.2,`stroke-dasharray="4 6" opacity=".8"`);
  paint+=line(P(9.1,0),P(9.1,19),"#fff7e9",1.2,`stroke-dasharray="4 5" opacity=".8"`);
  paint+=surface(17.9,7.4,4.5,1,"#d9bd9d");
  for(let i=0;i<6;i++)add(17.9+i*.55,7.3,line(P(18.3+i*.55,7.5,.4),P(18.3+i*.55,8.35,.4),"#ad7a68",1.2));
  for(let row=0;row<4;row++)for(let col=0;col<5;col++){
   const x=2+col*2.35+(row%2)*.23,y=1.8+row*2.35;
   if((x>8.1&&x<15.6&&y>10)||(x>7.8&&x<10.5))continue;
   const h=2.1+r()*5.6;add(x,y,building(x,y,1.15+r()*.75,1+r()*.6,h,{roof:["#c88070","#c8b69a","#78989c","#a8b6b0"][Math.floor(r()*4)],wall:["#d9bea4","#e5d8bf","#eac9ae","#c4c9ba"][Math.floor(r()*4)],type:r()>.77?"gable":"flat"},c));
  }
  add(10,11.2,landmarkParliament(10,11.2,c));
  add(2.15,12.4,lalbaghFort(2.15,12.4,c));
  for(let i=0;i<63;i++){
   const x=rngRange(r,1,18.6),y=rngRange(r,1,22.9);
   if((x>9&&x<17&&y>9&&y<17)||(x>2&&x<7&&y>12&&y<17))continue;
   add(x,y,roundedTree(x,y,rngRange(r,.42,.84),r()>.5?"#619a74":"#86ac7c",i));
  }
  // Dense front-edge Old Dhaka neighborhood, alleys, garden beds and painted buses.
  for(let row=0;row<3;row++)for(let col=0;col<7;col++){
   const x=1.2+col*2.15+(row%2)*.45,y=16.4+row*2.05;
   if(x>9&&x<16&&y<19)continue;
   if(r()>.22)add(x,y,building(x,y,1.1+r()*.77,1.02+r()*.44,1.25+r()*3.55,{wall:["#e4d6c1","#f1cbb4","#c3cec3"][Math.floor(r()*3)],roof:["#c98377","#8ba9ae","#d3bb92"][Math.floor(r()*3)],type:r()>.73?"gable":"flat"},c));
  }
  for(let i=0;i<12;i++)add(1.8+i*1.42,8.8+(i%2)*.2,rickshaw(1.8+i*1.42,8.8,["#e3a54e","#bb5d69","#4e9d91"][i%3]));
  for(let i=0;i<18;i++){
   const x=11+(i%6)*1.2,y=17.1+Math.floor(i/6)*1.47;
   add(x,y,roundedTree(x,y,.7+r()*.5,["#76a580","#98b987","#68a38d"][i%3],i));
  }
 }else if(name==="Chattogram"){
  paint+=surface(16.9,.3,6.4,23.1,"url(#wave)")+surface(16.5,.2,.62,23.2,"#dfd7b9");
  paint+=surface(0,14.1,16.8,1.25,"#d6cbb6")+surface(10.3,4.0,1.25,11.7,"#d6c9b4");
  for(let i=0;i<22;i++){
   const a=P(17.7+r()*5.3,.7+i*1.05);paint+=line([a[0]-5,a[1]],[a[0]+6,a[1]+1.5],"#eefff9",1.3,`opacity=".7"`);
  }
  for(let i=0;i<7;i++){
   const x=1+i*2.2,y=2.4+i%2*1.2;
   add(x,y,hill(x,y,18+r()*6,i%2?"#85ae93":"#5c987f"));
  }
  for(let j=0;j<4;j++)for(let i=0;i<4;i++){
   const x=1.2+i*2.9,y=5.9+j*2.25;if(x>9&&y>10)continue;
   add(x,y,building(x,y,1.55+r()*.8,1.35+r()*.7,1.5+r()*3,{wall:["#eee1c8","#c0c5b6","#e4c0aa"][i%3],roof:["#a56f69","#829ba3","#d3a17a"][j%3],type:r()>.55?"gable":"flat"},c));
  }
  // Container terminal and two working cranes with suspended hooks.
  paint+=surface(12.25,11.3,4.4,11.3,"#c2c3b3");
  for(let j=0;j<5;j++)for(let i=0;i<3;i++){
   const x=12.7+i*1.18,y=12.4+j*1.56;
   add(x,y,containerBox(x,y,1.05,1.38,.68+r()*.38,["#d48a76","#76aab0","#f0b268","#dfc19d","#7da59e"][(i+2*j)%5]));
  }
  add(15.0,10.7,gantryCrane(15.0,10.7,8));
  add(15.2,18.1,gantryCrane(15.2,18.1,7));
  add(18.25,9.7,ship(18.25,9.7,c));
  // Dense quayside logistics yards, waterfront shops and container stacks.
  for(let j=0;j<3;j++)for(let i=0;i<5;i++){
   const x=1.3+i*2.55,y=16.4+j*2.1;
   add(x,y,building(x,y,1.7+r()*.45,1.3+r()*.45,1.2+r()*2.65,{roof:["#c27868","#83a1a3","#cab18f"][i%3],wall:"#e9d7be",type:r()>.6?"gable":"flat"},c));
  }
  for(let j=0;j<3;j++)for(let i=0;i<4;i++){
   const x=12.8+i*1.2,y=19.7+j*.85;
   add(x,y,containerBox(x,y,1.03,.65,.63+r()*.24,["#d38478","#88a9a4","#ebb881"][i%3]));
  }
  for(let j=0;j<63;j++){
   const x=rngRange(r,1,15.4),y=rngRange(r,1,20.6);
   if((x>12&&y>10)||(x>8&&x<12&&y>9)||(x<14&&y>16))continue;
   add(x,y,roundedTree(x,y,rngRange(r,.5,.99),r()>.5?"#4c9176":"#90b681",j));
  }
 }else{
  // Sylhet's tea estates, a soft Surma River, terraced hills and domed shrines.
  paint+=surface(19.4,.2,3.9,23.2,"url(#wave)")+surface(19,.3,.45,23.1,"#ccd3b0");
  for(let i=0;i<14;i++){
   let a=P(19.9+r()*2.7,.5+i*1.6);paint+=line([a[0]-6,a[1]],[a[0]+7,a[1]+1.7],"#f8fff3",1.3,`opacity=".7"`);
  }
  for(let i=0;i<9;i++){
   const y=3.1+i*1.55,x=1.6+(i%2)*.7;
   paint+=surface(x,y,16.0,1.1,i%2?"#89b78d":"#9bcba0");
   paint+=line(P(x,y+1),P(x+16,y+1),"#d0dfaf",2.0,`opacity=".7"`);
   for(let j=0;j<22;j++){
    const px=x+.36+j*.7,py=y+.5+(j%3)*.08;
    add(px,py,teaShrub(px,py,(i+j)%3));
   }
  }
  for(let i=0;i<7;i++)add(1.3+i*2.5,1.6,hill(1.3+i*2.5,1.6,18+i%3*3,i%2?"#4e9478":"#82b697"));
  paint+=surface(13.2,10.8,4.9,4.35,"#d7d0b3")+surface(13.45,11.1,4.45,3.8,"#b9d0ad");
  add(13.9,11.9,dome(13.9,11.9,2.4,2.3,2.55,c,"#f4e4ca"));
  add(16.4,11.8,minaret(16.4,11.8,c));
  paint+=surface(3,12.8,6.4,4.7,"#b7c7a2");
  add(4.2,13.5,building(4.2,13.5,3.75,2.5,2.35,{wall:"#f0dac1",roof:"#ba7668",type:"gable",windows:true},c));
  paint+=surface(1,17.3,18.2,.77,"#e3d6ba");
  // Tea shrubs continue across the foreground instead of stopping mid-island.
  for(let j=0;j<4;j++){
   const y=18.1+j*1.36;
   paint+=surface(1.3,y,17.8,.8,j%2?"#a2c99a":"#9bc391");
   for(let k=0;k<24;k++){
    const x=1.6+k*.71;
    add(x,y+.32,teaShrub(x,y+.32,(j+k)%3));
   }
  }
  for(let i=0;i<51;i++){
   const x=rngRange(r,1,18),y=rngRange(r,2,20.6);
   if(x<9&&y>12&&y<18)continue;
   if(x>13&&x<19&&y>9&&y<16)continue;
   add(x,y,roundedTree(x,y,rngRange(r,.57,.99),r()>.5?"#467f65":"#6eaa81",i));
  }
  // White bridge crossing the water at front.
  paint+=surface(18.2,16.7,4.65,.7,"#ece1c9");
  for(let i=0;i<8;i++)paint+=line(P(18.35+i*.55,16.7,.3),P(18.35+i*.55,16.7,1.05),"#f6f0dc",1);
 }
 // City identity is detailed at asset level; any labels stay in the HTML for screen readers.
 const ordered=objs.sort((a,b)=>a.depth-b.depth).map(o=>o.svg).join("");
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 550" role="img" aria-label="Illustrated miniature of ${esc(name)}, Bangladesh" preserveAspectRatio="xMidYMid meet">${ground}<g clip-path="url(#tileclip)">${paint}${ordered}</g>${poly([P(0,0),P(23.7,0),P(23.7,23.7),P(0,23.7)],"none","#f2efe6",`stroke-width="3.2"`)}</svg>`;
}
const svgCache=new Map<CityName,string>();
export function makeCitySvg(name:CityName):string{
 const existing=svgCache.get(name);if(existing)return existing;
 const svg=renderScene(name);svgCache.set(name,svg);return svg;
}
export function cityDataUri(name:CityName):string{return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(makeCitySvg(name))}`;}