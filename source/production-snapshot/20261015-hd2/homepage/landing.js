(() => {
  'use strict';
  const hero=document.querySelector('.hero');
  if(!hero)return;
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)');
  const button=document.querySelector('.motion-toggle');
  const islands=[...hero.querySelectorAll('.island')];
  let paused=reduce.matches,visible=true,raf=0,px=0,py=0;
  function sync(){hero.dataset.motion=paused||reduce.matches?'paused':'on';if(button){button.setAttribute('aria-pressed',String(paused||reduce.matches));button.textContent=paused||reduce.matches?'Play motion':'Pause motion';}if(paused||reduce.matches){islands.forEach(el=>{el.style.removeProperty('--px');el.style.removeProperty('--py')});}}
  function paint(){raf=0;if(paused||reduce.matches||!visible||document.hidden)return;for(const el of islands){const d=Number(el.dataset.depth)||0.5;el.style.setProperty('--px',(px*d*7).toFixed(2)+'px');el.style.setProperty('--py',(py*d*5).toFixed(2)+'px')}}
  hero.addEventListener('pointermove',e=>{if(e.pointerType!=='mouse'||paused||reduce.matches||!visible)return;const r=hero.getBoundingClientRect();px=(e.clientX-r.left)/r.width*2-1;py=(e.clientY-r.top)/r.height*2-1;if(!raf)raf=requestAnimationFrame(paint)},{passive:true});
  hero.addEventListener('pointerleave',()=>{px=py=0;if(!raf)raf=requestAnimationFrame(paint)},{passive:true});
  if(button)button.addEventListener('click',()=>{if(reduce.matches){button.textContent='Reduced motion enabled';return;}paused=!paused;sync();});
  reduce.addEventListener('change',()=>{paused=reduce.matches;sync()});
  if('IntersectionObserver' in window)new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;hero.dataset.visible=String(visible)},{threshold:0}).observe(hero);
  document.addEventListener('visibilitychange',()=>{hero.dataset.visible=String(!document.hidden&&visible)});
  document.querySelectorAll('.mobile-nav a').forEach(a=>a.addEventListener('click',()=>{document.querySelector('.mobile-nav')?.removeAttribute('open')}));
  sync();
})();