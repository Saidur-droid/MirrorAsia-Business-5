"use client";
import React from "react";
import {cityDataUri, type CityName} from "./city-illustrations";

const cities:{name:CityName;className:string}[]=[
 {name:"Dhaka",className:"ma-city-dhaka"},
 {name:"Chattogram",className:"ma-city-chattogram"},
 {name:"Sylhet",className:"ma-city-sylhet"}
];
function CityIsland({name,className}:{name:CityName;className:string}){
 const src=React.useMemo(()=>cityDataUri(name),[name]);
 return <div className={`ma-island ${className}`} aria-hidden="true"><div className="ma-island-inner">
  <img src={src} alt="" loading="eager" decoding="async" draggable={false}/>
  <span className="ma-island-name">{name}</span>
 </div></div>;
}
function useGentleParallax(){
 React.useEffect(()=>{
  const hero=document.querySelector<HTMLElement>(".ma-hero");
  if(!hero||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  const islands=Array.from(hero.querySelectorAll<HTMLElement>(".ma-island"));
  let raf=0,px=0,py=0,sy=window.scrollY;
  const paint=()=>{islands.forEach((el,i)=>{
   const depth=[9,12,7][i]||8;
   el.style.setProperty("--ma-px",`${(px*depth).toFixed(2)}px`);
   el.style.setProperty("--ma-py",`${(py*depth-sy*.035*(i+1)).toFixed(2)}px`);
  });raf=0;};
  const schedule=()=>{if(!raf)raf=window.requestAnimationFrame(paint);};
  const pointer=(e:PointerEvent)=>{if(e.pointerType!=="mouse"&&e.pointerType!=="pen")return;
   px=Math.max(-1,Math.min(1,(e.clientX/window.innerWidth-.5)*2));
   py=Math.max(-1,Math.min(1,(e.clientY/window.innerHeight-.5)*2));schedule();};
  const scroll=()=>{sy=window.scrollY;schedule();};
  window.addEventListener("pointermove",pointer,{passive:true});
  window.addEventListener("scroll",scroll,{passive:true});
  return ()=>{window.removeEventListener("pointermove",pointer);window.removeEventListener("scroll",scroll);if(raf)window.cancelAnimationFrame(raf);};
 },[]);
}
export default function Landing(){
 useGentleParallax();
 return <div className="ma-landing">
 <header className="ma-header">
  <a className="ma-brand" href="/" aria-label="Mirror Asia home"><span className="ma-logo" aria-hidden="true">M</span><span>Mirror Asia</span></a>
  <nav className="ma-nav" aria-label="Main navigation"><a href="#solutions">Platform</a><a href="#research">Research</a><a href="#validation">Validation</a><a href="#about">About</a></nav>
  <a className="ma-button ma-button-small" href="/studio">Run a simulation <span aria-hidden="true">↗</span></a>
 </header>
 <main>
 <section className="ma-hero" aria-labelledby="ma-headline">
  <div className="ma-city-world" aria-hidden="true">{cities.map(c=><CityIsland key={c.name} {...c}/>)}</div>
  <div className="ma-hero-content">
   <a href="#research" className="ma-announcement"><span className="ma-spark" aria-hidden="true">✦</span><span>Introducing the Bangladesh simulation preview</span><span aria-hidden="true">→</span></a>
   <h1 id="ma-headline">Understand your market<br/>before you move.</h1>
   <p className="ma-lead">Explore product, price and positioning scenarios with transparent synthetic consumer simulations for Bangladesh.</p>
   <a className="ma-button ma-primary" href="/studio">Run a simulation <span aria-hidden="true">→</span></a>
   <p className="ma-caption">Research preview · Illustrative synthetic data · Not a validated market forecast</p>
  </div>
  <div className="ma-signals" aria-label="Platform features"><span>Scenario Studio</span><span>Population Preview</span><span>Evidence first</span></div>
 </section>
 <section id="solutions" className="ma-section"><span className="ma-kicker">THE PLATFORM</span><h2>Test the possibilities.<br/>Understand the trade-offs.</h2><div className="ma-card-grid"><article className="ma-feature"><span>01 / EXPLORE</span><h3>Scenario Studio</h3><p>Compare packaging concepts and prices across defined consumer segments.</p><a href="/studio">Open studio ↗</a></article><article className="ma-feature"><span>02 / LEARN</span><h3>Population Preview</h3><p>See how hypothetical segments respond in a reproducible simulation.</p><a href="/studio">Explore segments ↗</a></article><article className="ma-feature"><span>03 / EVALUATE</span><h3>Evidence first</h3><p>Understand every assumption, provenance label and current limitation.</p><a href="#validation">Our approach ↗</a></article></div></section>
 <section id="research" className="ma-band"><span className="ma-kicker">BUILT FOR THOUGHTFUL RESEARCH</span><h2>Go from what-if to what-next.</h2><p>Start with a testable hypothesis, explore alternatives, and focus human research where it matters most.</p><a className="ma-outline" href="/studio">Explore the demo →</a></section>
 <section id="validation" className="ma-section ma-compact"><span className="ma-kicker">HONEST BY DESIGN</span><h2>Simulation isn't validation.</h2><p>Our current preview is illustrative. We do not claim real respondent accuracy, calibrated predictions, or customer endorsements. Human benchmarking comes before dependable forecasting.</p></section>
 </main><footer id="about" className="ma-footer"><strong>Mirror Asia</strong><span>Built to explore emerging markets with more clarity.</span><a href="/studio">Simulation Studio ↗</a></footer>
 </div>;
}
