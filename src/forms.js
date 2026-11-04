let opened=null;
function closeChoice(){if(!opened)return;const {list,button}=opened;if(list.matches(':popover-open'))list.hidePopover();list.hidden=true;button.setAttribute('aria-expanded','false');opened=null;}
document.addEventListener('pointerdown',e=>{if(opened&&!opened.wrapper.contains(e.target)&&!opened.list.contains(e.target))closeChoice();});
window.addEventListener('resize',closeChoice);
document.addEventListener('scroll',e=>{if(opened&&e.target!==opened.list&&!opened.list.contains(e.target))closeChoice();},true);
export function enhanceForms(root){
 for(const input of root.querySelectorAll('input[type=number]'))input.required=input.id!=='known-base'&&!input.hasAttribute('data-extra');
 for(const select of root.querySelectorAll('select:not([data-styled])')){
  select.dataset.styled='true';
  const wrapper=document.createElement('div');wrapper.className='choice-field';select.before(wrapper);wrapper.append(select);
  select.classList.add('native-choice');select.tabIndex=-1;select.setAttribute('aria-hidden','true');
  const button=document.createElement('button');button.type='button';button.className='choice-trigger';button.id=select.id+'-choice';button.setAttribute('aria-haspopup','listbox');button.setAttribute('aria-expanded','false');
  const list=document.createElement('div');list.className='choice-menu';list.id=select.id+'-options';list.hidden=true;list.setAttribute('role','listbox');list.setAttribute('popover','manual');
  button.setAttribute('aria-controls',list.id);wrapper.append(button,list);
  const label=select.getAttribute('aria-label')||[...(select.labels?.[0]?.childNodes||[])].filter(n=>n.nodeType===3).map(n=>n.textContent.trim()).join(' ')||'选择';
  list.setAttribute('aria-label',label);
  const sync=()=>{button.textContent=select.selectedOptions[0]?.textContent||'请选择';button.setAttribute('aria-label',label+'：'+button.textContent);button.disabled=select.disabled;};sync();
  let active=select.selectedIndex,typed='',typedAt=0;
  const options=()=>[...list.querySelectorAll('[role=option]')];
  function highlight(index){const all=options();active=Math.max(0,Math.min(all.length-1,index));all.forEach((b,i)=>{b.tabIndex=i===active?0:-1;b.dataset.focused=String(i===active);});all[active]?.focus({preventScroll:true});all[active]?.scrollIntoView({block:'nearest'});}
  function choose(index){const option=select.options[index];if(!option||option.disabled)return;select.value=option.value;closeChoice();sync();select.dispatchEvent(new Event('input',{bubbles:true}));select.dispatchEvent(new Event('change',{bubbles:true}));document.getElementById(select.id+'-choice')?.focus({preventScroll:true});}
  function open(){closeChoice();list.innerHTML='';[...select.options].forEach((option,i)=>{const b=document.createElement('button');b.type='button';b.setAttribute('role','option');b.setAttribute('aria-selected',String(option.selected));b.disabled=option.disabled;b.textContent=option.textContent;b.onclick=()=>choose(i);list.append(b);});
   const rect=button.getBoundingClientRect();const spaceBelow=innerHeight-rect.bottom-12;const up=spaceBelow<160&&rect.top>spaceBelow;list.style.width=rect.width+'px';list.style.left=Math.max(8,Math.min(rect.left,innerWidth-rect.width-8))+'px';list.style.maxHeight=Math.min(290,Math.max(110,up?rect.top-16:spaceBelow))+'px';list.style.top=up?'auto':rect.bottom+6+'px';list.style.bottom=up?innerHeight-rect.top+6+'px':'auto';list.hidden=false;if(list.showPopover)list.showPopover();button.setAttribute('aria-expanded','true');opened={wrapper,list,button};highlight(select.selectedIndex);
  }
  button.onclick=()=>opened?.button===button?closeChoice():open();
  button.onkeydown=e=>{if(['ArrowDown','ArrowUp','Home','End'].includes(e.key)){e.preventDefault();open();if(e.key==='Home')highlight(0);if(e.key==='End')highlight(select.options.length-1);}};
  list.onkeydown=e=>{if(e.key==='Escape'){e.preventDefault();closeChoice();button.focus();}else if(e.key==='Tab'){closeChoice();button.focus();}else if(['ArrowDown','ArrowUp','Home','End'].includes(e.key)){e.preventDefault();highlight(e.key==='Home'?0:e.key==='End'?select.options.length-1:active+(e.key==='ArrowDown'?1:-1));}else if(e.key==='Enter'||e.key===' '){e.preventDefault();choose(active);}else if(e.key.length===1){const now=Date.now();typed=now-typedAt>800?e.key:typed+e.key;typedAt=now;const index=[...select.options].findIndex(o=>o.textContent.toLowerCase().startsWith(typed.toLowerCase()));if(index>=0)highlight(index);}};
  select.addEventListener('change',sync);
 }
}
export function closeForms(){closeChoice();}
