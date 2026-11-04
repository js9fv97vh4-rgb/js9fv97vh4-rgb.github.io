import {chapterPhoto} from './photos.js';
export const $=(s,p=document)=>p.querySelector(s);
export const $$=(s,p=document)=>[...p.querySelectorAll(s)];
export const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const motion=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
export function readStore(key,fallback,local=false){try{return JSON.parse((local?localStorage:sessionStorage).getItem(key))??fallback;}catch{return fallback;}}
export function writeStore(key,value,local=false){try{(local?localStorage:sessionStorage).setItem(key,JSON.stringify(value));return true;}catch{return false;}}
export function sourcesHTML(items,note=''){return `<details class="reading"><summary>资料来源与延伸阅读</summary><p>${note}</p>${[...new Map(items.filter(Boolean).map(x=>[x[1],x])).values()].map(([n,u])=>`<a href="${esc(u)}" target="_blank" rel="noopener noreferrer">${esc(n)} ↗</a>`).join('')}</details>`;}
export function head(no,en,title,desc){return `<header class="chapter-head"><div class="chapter-copy"><p class="eyebrow">${no} / ${en}</p><h1>${title}</h1><p>${desc}</p></div>${chapterPhoto(no)}</header>`;}
export function replaceKeepFocus(el,html){const active=document.activeElement;const key=active?.id;const start=active?.selectionStart;el.innerHTML=html;if(key){const next=document.getElementById(key);if(next&&el.contains(next)){next.focus({preventScroll:true});if(start!=null&&next.type==='text')next.setSelectionRange(start,start);}}}
export function announce(text){$('#announcement').textContent=text;}
export function bindScene(container,state,onGesture){let alive=true,scene,fallback;container.innerHTML='<div class="scene-fallback" aria-hidden="true"><div class="fallback-object">◒</div><p>互动场景 · 可使用右侧操作完成制作</p></div>';const get=()=>typeof state==='function'?state():state;
 const backdrop=s=>container.classList.toggle('ingredient-backdrop',s.kind==='diy'&&!['beans','choose','weight','weigh','grind','grinding','brew','brewing','extract'].includes(s.phase));backdrop(get());
 import('./workshop-scene.js').then(m=>{if(!alive)return null;fallback=m.fallbackHTML;container.querySelector('.scene-fallback').innerHTML=fallback(get());return m.mountScene(container,get(),onGesture);}).then(s=>{if(!alive){s?.dispose();return;}scene=s;container.classList.add('scene-ready');}).catch(()=>{if(alive){container.classList.add('scene-2d');container.setAttribute('aria-label','二维模式，所有操作均可使用');}});
 return {update(s){state=s;backdrop(s);scene?.update(s);if(fallback&&container.querySelector('.scene-fallback'))container.querySelector('.scene-fallback').innerHTML=fallback(s);},pause(v){scene?.pause(v);},dispose(){alive=false;scene?.dispose();}};
}
