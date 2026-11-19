(()=>{
 const menu=document.querySelector('.main-nav');
 const btn=document.querySelector('.nav-toggle');
 const close=()=>{menu.classList.remove('is-open');btn.setAttribute('aria-expanded','false');btn.setAttribute('aria-label','Mở menu');};
 btn.addEventListener('click',()=>{const opening=!menu.classList.contains('is-open');menu.classList.toggle('is-open',opening);btn.setAttribute('aria-expanded',String(opening));btn.setAttribute('aria-label',opening?'Đóng menu':'Mở menu');});
 menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));
 document.addEventListener('keydown',e=>{if(e.key==='Escape')close();});
 const layers=[...document.querySelectorAll('[data-strength]')];
 const mq=window.matchMedia('(prefers-reduced-motion: reduce)');
 let queued=false;
 const update=()=>{
  queued=false;
  if(mq.matches || window.innerWidth<=720){layers.forEach(x=>x.style.transform='');return;}
  const y=Math.min(Math.max(window.scrollY,0),360);
  layers.forEach(x=>{const factor=Number(x.dataset.strength); x.style.transform=`translate3d(0,${(y*factor*.08).toFixed(2)}px,0) scale(1.032)`;});
 };
 const request=()=>{if(!queued){queued=true;requestAnimationFrame(update);}};
 window.addEventListener('scroll',request,{passive:true});window.addEventListener('resize',request,{passive:true});
 mq.addEventListener?.('change',request);request();
})();
