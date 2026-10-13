"use client";
import React from "react";

const cities=[
  {name:"Dhaka",x:"8%",y:"18%",w:260,rotation:-6,palette:["#e6b97d","#b7d3a9","#7c9cad"]},
  {name:"Sylhet",x:"39%",y:"-8%",w:210,rotation:2,palette:["#8dc4ac","#e2a0b2","#8ca5be"]},
  {name:"Singapore",x:"76%",y:"13%",w:250,rotation:6,palette:["#9bb7d6","#94cdbe","#d2ad9a"]},
  {name:"Chattogram",x:"88%",y:"42%",w:230,rotation:-5,palette:["#c39ec5","#a5bfb5","#a8c0db"]},
  {name:"Rajshahi",x:"3%",y:"59%",w:236,rotation:4,palette:["#d9bd8a","#83b1a0","#8ea8ca"]},
  {name:"Khulna",x:"80%",y:"75%",w:285,rotation:0,palette:["#9eb0cb","#d8b994","#9ebeb2"]}
];
function CityIsland({name,x,y,w,rotation,palette}:{name:string;x:string;y:string;w:number;rotation:number;palette:string[]}){
 const buildings=Array.from({length:24},(_,i)=>({x:47+(i%6)*27+(Math.floor(i/6)%2)*7,y:41+Math.floor(i/6)*17,height:13+((i*17+name.length*7)%40),color:palette[i%3]}));
 return <div className="ma-island" aria-hidden="true" style={{left:x,top:y,width:w,transform:`rotate(${rotation}deg)`}}>
 <svg viewBox="0 0 260 193" fill="none" role="presentation">
 <defs><linearGradient id={`land-${name}`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#d4e5cc"/><stop offset="1" stopColor="#9fc9ba"/></linearGradient></defs>
 <path d="M13 98 130 40 246 99 130 158Z" fill={`url(#land-${name})`} stroke="#f3f5ed" strokeWidth="6"/>
 <path d="M13 98 130 158 130 175 13 113Z" fill="#91ad9e"/><path d="M130 158 246 99 246 116 130 175Z" fill="#b7cbbb"/>
 <path d="m38 100 91-47 94 48-92 48Z" fill="#c9d9be" opacity=".75"/>
 {buildings.map((b,i)=><g key={i}><path d={`M${b.x} ${b.y} l11 -6 11 6 -11 6Z`} fill="#edf1f0"/><path d={`M${b.x} ${b.y} l11 6 v${b.height} l-11 -6Z`} fill={b.color}/><path d={`M${b.x+11} ${b.y+6} l11 -6 v${b.height} l-11 6Z`} fill="#647e92" opacity=".82"/><path d={`M${b.x+4} ${b.y+10} v${Math.max(4,b.height-10)} m4 -13 v${Math.max(4,b.height-10)}`} stroke="#fff" strokeOpacity=".5" strokeWidth=".9"/></g>)}
 {Array.from({length:13},(_,i)=><g key={i}><path d={`M${22+(i*41)%210} ${92+(i*19)%52} v-13`} stroke="#789e73" strokeWidth="2"/><circle cx={22+(i*41)%210} cy={77+(i*19)%52} r="6.5" fill={i%3===0?"#e8aac2":"#7da785"}/></g>)}
 </svg><span className="ma-island-name">{name}</span></div>;
}
export default function Landing(){
 return <div className="ma-landing">
 <header className="ma-header"><a className="ma-brand" href="/" aria-label="Mirror Asia home"><span className="ma-logo">M</span><span>Mirror Asia</span></a>
 <nav className="ma-nav" aria-label="Main navigation"><a href="#solutions">Solutions</a><a href="#research">Research</a><a href="#validation">Validation</a><a href="#about">About</a></nav>
 <a className="ma-button ma-button-small" href="/studio">Run a simulation <span aria-hidden="true">↗</span></a></header>
 <main><section className="ma-hero">
 <div className="ma-city-world">{cities.map(c=><CityIsland key={c.name} {...c}/>)}</div>
 <div className="ma-hero-content">
 <a href="#research" className="ma-announcement"><span className="ma-spark">✦</span> Explore the Bangladesh simulation preview <span aria-hidden="true">→</span></a>
 <h1>Simulate better<br/>decisions, faster.</h1>
 <p className="ma-lead">Explore product, price and positioning scenarios with transparent synthetic consumer simulations for Bangladesh.</p>
 <a className="ma-button ma-primary" href="/studio">Run a simulation <span aria-hidden="true">→</span></a>
 <p className="ma-caption">Research preview · Illustrative synthetic data · Not a validated market forecast</p>
 </div>
 <div className="ma-hero-floor" aria-hidden="true"></div>
 </section>
 <section id="solutions" className="ma-section"><span className="ma-kicker">THE PLATFORM</span><h2>Test the possibilities.<br/>Understand the trade-offs.</h2><div className="ma-card-grid"><article className="ma-feature"><span>01 / EXPLORE</span><h3>Scenario Studio</h3><p>Compare packaging concepts and prices across defined consumer segments.</p><a href="/studio">Open studio ↗</a></article><article className="ma-feature"><span>02 / LEARN</span><h3>Population Preview</h3><p>See how hypothetical segments respond in a reproducible simulation.</p><a href="/studio">Explore segments ↗</a></article><article className="ma-feature"><span>03 / EVALUATE</span><h3>Evidence first</h3><p>Understand every assumption, provenance label and current limitation.</p><a href="#validation">Our approach ↗</a></article></div></section>
 <section id="research" className="ma-band"><span className="ma-kicker">BUILT FOR THOUGHTFUL RESEARCH</span><h2>Go from what-if to what-next.</h2><p>Start with a testable hypothesis, explore alternatives, and focus human research where it matters most.</p><a className="ma-outline" href="/studio">Explore the demo →</a></section>
 <section id="validation" className="ma-section ma-compact"><span className="ma-kicker">HONEST BY DESIGN</span><h2>Simulation isn't validation.</h2><p>Our current preview is illustrative. We do not claim real respondent accuracy, calibrated predictions, or customer endorsements. Human benchmarking comes before dependable forecasting.</p></section>
 </main><footer id="about" className="ma-footer"><strong>Mirror Asia</strong><span>Built to explore emerging markets with more clarity.</span><a href="/studio">Simulation Studio ↗</a></footer>
 </div>;
}
