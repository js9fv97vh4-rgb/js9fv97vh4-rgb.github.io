import { $, esc, replaceKeepFocus, bindScene, announce, motion } from './ui.js';
import { processingSteps, brewingSteps, newWorkshop, advanceWorkshop, processLayers } from './workshop-data.js';
export function workshopHTML(){return `<div class="bench"><div class="stage-side"><div class="scene-label"><span id="scene-caption">动手工坊</span><span>TEACHING STUDIO</span></div><div class="scene" id="work-scene"></div><div id="layer-list" class="layer-list"></div><div class="scene-tools"><button id="cutaway">切换剖面</button><button id="dimension">二维 / 三维</button><span>教学模拟 · 时间经过压缩</span></div></div><div class="operation-side"><div id="step-panel"></div><div class="playback"><button id="pause-action" disabled>暂停动画</button><button id="redo">重播上一步</button><button id="demo">连续演示</button><button id="restart">全部重置</button></div></div></div>`;}
export function mountWorkbench(root,initial,onChange,onComplete=()=>{},completionLabel=null){
 let state=structuredClone(initial),scene,timer,disposed=false,running=false,paused=false,auto=false,elapsed=0,lastTick=0,lastStep=null;
 const steps=state.kind==='processing'?processingSteps[state.method]:brewingSteps[state.method];
 state.step=Math.min(steps.length,Math.max(0,Number(state.step)||0));state.done=state.step===steps.length;state.progress=0;state.animating=false;lastStep=state.step>0?state.step-1:null;
 const save=()=>onChange({...state,params:{...state.params}});
 const visual=()=>{scene?.update({...state,process:state.method,animating:running,motionPaused:paused});};
 function controls(){
  const action=$('#step-action',root);if(action){action.disabled=running;action.textContent=running?(paused?'动画已暂停':'正在'+steps[state.step].title+'…'):steps[state.step].action+' →';}
  $('#pause-action',root).disabled=!running;$('#pause-action',root).textContent=paused?'继续动画':'暂停动画';
  $('#demo',root).textContent=auto?'结束连续演示':'连续演示';
  $('#redo',root).disabled=lastStep===null&&!running;
  const settings=$('#action-settings',root);if(settings)settings.disabled=running;
 }
 function panel(){
  const focus=document.activeElement?.id;
  const step=steps[state.step];
  replaceKeepFocus($('#step-panel',root),`<p class="eyebrow">${state.done?'完成 / MADE BY YOU':`STEP ${String(state.step+1).padStart(2,'0')} / ${steps.length}`}</p><div class="step-track">${steps.map((s,i)=>`<span class="${i<state.step?'complete':i===state.step?'current':''}" title="${esc(s.title)}">${i+1}</span>`).join('')}</div><h2>${state.done?'这一次，你亲手完成了。':step.title}</h2><p class="action-hint">${state.done?'把刚刚的动作连起来，就是这杯咖啡的来路。':step.hint}</p>${state.done?`${state.kind==='brewing'?`<p class="completion-params">用粉 ${state.params.dose} g · ${state.method==='espresso'?'':'注水 '+state.params.water+(state.method==='cold-brew'?' ml':' g')+' · '}研磨 ${state.params.grind}/100</p><label class="result-yield">${state.method==='espresso'?'停止出液重量':'记录出液（示例，可改为实测值）'} / ${state.params.outputUnit}<input id="result-yield" type="number" required min="1" max="1500" value="${state.params.output}"></label>`:''}<ol class="recap">${steps.map(s=>`<li>${s.title}</li>`).join('')}</ol><button class="primary" id="work-complete">${completionLabel||(state.kind==='processing'?'看看记忆小题':'带着参数去 DIY')} →</button>`:`${step.control==='yield'?`<fieldset id="action-settings"><label>停止出液目标 / g<input id="action-value" type="number" required min="5" max="100" value="${state.params.output}"></label></fieldset>`:step.control==='dilute'?`<fieldset id="action-settings"><label>饮用时添加的水 / ml<input id="action-value" type="number" required min="0" max="300" value="${state.params.dilution||0}"></label></fieldset>`:''}<div class="action-animation-note"><span aria-hidden="true">▷</span><p id="animation-status" role="status">点击一次，观看这个动作的动画演示。</p></div><button class="primary main-action" id="step-action">${step.action} →</button>`}`);
  $('#step-action',root)?.addEventListener('click',()=>startAction());
  $('#action-value',root)?.addEventListener('input',e=>{if(e.target.checkValidity()){state.params[step.control==='yield'?'output':'dilution']=Number(e.target.value);save();}});
  $('#result-yield',root)?.addEventListener('input',e=>{if(e.target.checkValidity()){state.params.output=Number(e.target.value);save();visual();}});
  $('#work-complete',root)?.addEventListener('click',()=>{if(valid())onComplete(state);});
  $('#layer-list',root).innerHTML=state.kind==='processing'?processLayers(state.method,state.step).map((n,i)=>`<span style="--layer:${['#913e3c','#b76b4a','#b49450','#d8c99b','#7c8a62'][i]}">${n}</span>`).join(''):`<span>${state.params.dose} g 咖啡粉</span><span>${state.method==='espresso'?`${state.params.output} g 目标出液`:`${state.params.water} ${state.method==='cold-brew'?'ml':'g'} 注水`}</span><span>研磨：${state.params.grind<30?'细':state.params.grind>65?'粗':'中等'}</span>`;
  $('#scene-caption',root).textContent=state.done?'完成 · 制作回顾':state.method==='moka'&&state.cutaway!==false&&state.step<3?'下壶剖面 · 铜线为阀下水位上限':step.title;
  controls();if(focus==='step-action')$('#'+(state.done?'work-complete':'step-action'),root)?.focus({preventScroll:true});
 }
 function valid(){const invalid=root.querySelector(':invalid');if(invalid){invalid.reportValidity();return false;}return true;}
 function stop(){clearTimeout(timer);running=false;paused=false;auto=false;state.animating=false;elapsed=0;state.progress=0;controls();}
 function finish(){
  lastStep=state.step;running=false;state.animating=false;state=advanceWorkshop(state,steps);save();visual();panel();if(document.activeElement===document.body)$('#'+(state.done?'work-complete':'step-action'),root)?.focus({preventScroll:true});
  announce(state.done?'制作完成':`动作完成。下一步：${steps[state.step].title}`);
  if(state.done){auto=false;controls();}else if(auto)timer=setTimeout(startAction,650);
 }
 function tick(){
  if(disposed||!running||paused)return;
  const now=performance.now();if(document.hidden){lastTick=now;timer=setTimeout(tick,120);return;}
  elapsed+=now-lastTick;lastTick=now;const p=Math.min(1,elapsed/1900);
  state.progress=p*100;state.animating=true;visual();
  const status=$('#animation-status',root);if(status)status.textContent=steps[state.step].control==='yield'?`出液示意：${Math.round(state.params.output*p)} g / ${state.params.output} g`:(p<.45?'动作正在进行…':'观察场景中的变化…');
  if(p>=1){finish();return;}timer=setTimeout(tick,90);
 }
 function startAction(){if(disposed||running||state.done||!valid())return;running=true;paused=false;elapsed=0;lastTick=performance.now();state.progress=0;state.animating=true;controls();save();visual();if(motion()){state.progress=100;finish();}else tick();}
 scene=bindScene($('#work-scene',root),()=>({...state,process:state.method}));
 $('#pause-action',root).onclick=()=>{if(!running)return;paused=!paused;clearTimeout(timer);visual();controls();if(!paused){lastTick=performance.now();tick();}};
 $('#demo',root).onclick=()=>{if(auto){auto=false;if(!running)clearTimeout(timer);controls();return;}if(state.done){state={...newWorkshop(state.kind,state.method),params:state.params};panel();save();visual();}auto=true;if(paused){paused=false;lastTick=performance.now();tick();}controls();if(!running)startAction();};
 $('#redo',root).onclick=()=>{const replay=running?state.step:lastStep;if(replay===null)return;stop();state.step=replay;state.done=false;panel();save();visual();startAction();};
 $('#restart',root).onclick=()=>{stop();lastStep=null;state={...newWorkshop(state.kind,state.method),params:state.params};panel();save();visual();};
 $('#cutaway',root).onclick=()=>{state.cutaway=!state.cutaway;save();visual();panel();};$('#cutaway',root).hidden=state.kind!=='processing'&&state.method!=='moka';
 $('#dimension',root).onclick=()=>{const flat=$('#work-scene',root).classList.toggle('force-2d');scene.pause(flat);};
 panel();save();visual();
 return {dispose(){disposed=true;clearTimeout(timer);state.progress=0;state.animating=false;save();scene.dispose();},updateParams(params){stop();lastStep=null;state={...newWorkshop(state.kind,state.method),params:{...params}};panel();save();visual();},getState(){return state;}};
}
