const photos = {
 'washed-harvest': {title:'收获，从挑选开始',alt:'AI 场景示意：果园旁的木桌上，两只竹篮盛着成熟咖啡果',position:'50% 50%'},
 'washed-store': {title:'干燥之后，分级入库',alt:'AI 场景示意：浅绿生豆装在麻袋里，旁边摆着木质分级盘',position:'50% 50%'},
 'honey-mucilage': {title:'去皮之后，果胶仍在',alt:'AI 场景示意：网盘中的去皮咖啡种子表面留着湿润黏质层，后方是分离的果皮',position:'50% 50%'},
 'honey-beds': {title:'阴棚下的干燥时光',alt:'AI 场景示意：遮阴棚下的架高晒床，远处有人照看带果胶的咖啡种子',position:'50% 50%'},
 'honey-sample': {title:'一份等待烘焙的样品',alt:'AI 场景示意：无字纸袋中的生豆倒在陶制样品盘中',position:'50% 50%'},
 'wet-rinse': {title:'浅水里的种子',alt:'AI 场景示意：屋檐下的浅水池中清洗着去皮咖啡种子',position:'50% 50%'},
 'wet-drying': {title:'脱壳后，继续干燥',alt:'AI 场景示意：脱去羊皮层的浅绿咖啡种子在干燥场上摊成整齐的行列',position:'50% 50%'},
 'wet-sample': {title:'走进生豆仓',alt:'AI 场景示意：半开放木屋中摆着装满生豆的麻袋与编织样品筛',position:'50% 50%'},

 'cherry-branch': {title:'一颗果实的来处',alt:'AI 场景示意：晨光中结着咖啡果的枝条，远处是青绿山地',position:'50% 50%'},
 'washing-channel': {title:'让水，带走黏质层',alt:'AI 场景示意：工人在浅水洗槽中用长柄工具移动去皮后的咖啡种子',position:'50% 50%'},
 'parchment-beds': {title:'把时间，交给阳光',alt:'AI 场景示意：山地前的架高网床上摊着浅色带羊皮层咖啡种子',position:'50% 50%'},
 'green-sample': {title:'尚未烘焙的青绿',alt:'AI 场景示意：青瓷样品碗中的生豆，旁边是麻袋与取样勺',position:'50% 50%'},
 'roasted-table': {title:'烘焙之后，香气初醒',alt:'AI 场景示意：木桌上的陶盘盛着棕褐色熟豆，旁边有铜勺',position:'50% 50%'},
 'celadon-cup': {title:'一盏咖啡，片刻闲坐',alt:'AI 场景示意：自然窗光下，青瓷杯中的拿铁与配套杯碟',position:'50% 50%'},
 'pour-studio': {title:'留一张桌，慢慢做咖啡',alt:'AI 场景示意：窗边木托盘上的青瓷滤杯、玻璃分享壶与细口壶',position:'50% 50%'},
 'natural-drying': {title:'整颗果实，铺上晒床',alt:'也门的架高网床上铺着红色与褐色的完整咖啡果',position:'50% 50%',author:'Luai Al-Mamari',source:'https://commons.wikimedia.org/wiki/File:Yemeni_Coffee_Natural_Processing.jpg'}
};
const imagePath = key => `/images/${photos[key].source?'editorial':'journal'}/${key}.jpg`;
function photoCredit(key){
 const p=photos[key];
 return p.source?`<a href="${p.source}" target="_blank" rel="noopener noreferrer">${p.author} · 原图 ↗</a> · <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a>`:'<span>AI 生成 · 场景示意</span>';
}
export function photoHTML(key,{hero=false,note=''}={}) {
 const p=photos[key];
 return `<figure class="editorial-photo ${hero?'chapter-photo':''}"><img src="${imagePath(key)}" alt="${p.alt}" width="1536" height="1024" style="object-position:${p.position}" loading="${hero?'eager':'lazy'}" decoding="async"><figcaption><span>${p.title}</span><small>${p.source?'实景摄影':'AI 生成 · 场景示意'}</small></figcaption>${note?`<small class="photo-note">${note}</small>`:''}</figure>`;
}
export function chapterPhoto(no){
 const key={'壹':'cherry-branch','贰':'parchment-beds','叁':'pour-studio','肆':'celadon-cup','伍':'roasted-table'}[no];
 return key?photoHTML(key,{hero:true}):'';
}
const processPhotos = {
 natural: [
  ['cherry-branch','一切，从枝头开始','红色果皮包着果肉，种子藏在里面。采收与挑选，是处理的起点。','果园场景示意，不代表特定产区'],
  ['natural-drying','整果干燥，外皮仍在','看晒床上完整的红褐色果实。日晒的记忆点，就是先让整颗果实干燥。','也门 · 日晒处理现场'],
  ['green-sample','褪去外层，留下生豆','充分干燥后，去掉外层干果壳和羊皮层，得到准备烘焙的生豆。','生豆外观示意，不能据此识别处理方式']
 ],
 washed: [
  ['washed-harvest','从果实，到种子','成熟果实经过挑选，再去掉果皮和大部分果肉，为接下来的去胶与清洗做准备。','图示为处理前的果实，不是去皮设备'],
  ['washing-channel','水流之间，清洗种子','去果胶可采用发酵配合清洗，或机械方式。水洗槽让我们看见清洗与移动种子的场景。','水洗场景示意，不代替设备与生产操作规范'],
  ['parchment-beds','带着羊皮层，慢慢干燥','浅色的羊皮层仍包着种子。摊开、翻动，照看这一段干燥时间，之后再脱壳。','带壳干燥场景示意，实际设备与方式因地而异'],
  ['washed-store','干燥、脱壳，来到下一站','去除羊皮层后，生豆进入分级与储存。熟悉的棕褐色，还要等到之后的烘焙。','生豆外观示意，不能据此识别处理方式']
 ],
 honey: [
  ['honey-mucilage','去掉果皮，留住果胶','蜜处理从成熟果实开始，去皮后保留一定的果胶黏质层。这里的“蜜”，不是蜂蜜。','去皮后保留黏质层的示意，不表示固定果胶厚度'],
  ['honey-beds','干燥，需要耐心照看','带果胶的种子需要管理摊铺、翻动与干燥。记住保留果胶的顺序，比猜颜色更有帮助。','蜜处理干燥场景示意，不表示固定果胶保留量'],
  ['honey-sample','处理的终点，仍是生豆','干燥、脱壳、分级，再进入储存。不能仅凭豆子颜色推断蜜处理的甜感。','生豆外观示意，不能据此识别处理方式']
 ],
 'wet-hulled': [
  ['wet-rinse','先去皮，再处理黏质层','湿刨同样要先去掉果皮果肉、处理黏质层。关键差别出现在接下来的脱壳时机。','通用清洗场景示意，不是某批湿刨咖啡的记录'],
  ['wet-drying','提前脱壳，再继续干燥','种子含水仍较高时就脱去羊皮层，然后继续干燥。不能从场景图判断准确含水量。','图示为脱壳后的继续干燥阶段，不展示湿刨脱壳设备'],
  ['wet-sample','脱壳之后，继续干燥','提前脱壳不等于省去干燥。生豆仍要妥善干燥、筛选和储存，才能进入下一程。','生豆外观示意，不能据此识别处理方式']
 ]
};
function fieldCard([key,title,description,note],index){
 const p=photos[key];
 return `<article class="field-card"><button class="field-photo" data-photo="${key}" aria-label="放大查看：${title}"><img src="${imagePath(key)}" alt="${p.alt}" loading="lazy" decoding="async" width="1536" height="1024" style="object-position:${p.position}"><span aria-hidden="true">放大查看 ↗</span></button><div class="field-caption"><span class="field-number">${String(index+1).padStart(2,'0')}</span><h3>${title}</h3><p>${description}</p><small>${note}</small><div class="photo-credit">${photoCredit(key)}</div></div></article>`;
}
export function processPhotoEssay(process){return `<section id="process-photos" class="field-notes" aria-labelledby="photo-essay-title" tabindex="-1"><header class="field-heading"><div><p class="eyebrow">COFFEE JOURNAL / 果实的下一程</p><h2 id="photo-essay-title">${process.name}，沿着画面慢慢看。</h2></div><p>从枝头，到晒床，再到一颗生豆。<br>在场景里，记住处理的顺序。</p></header><div class="field-grid">${processPhotos[process.id].map(fieldCard).join('')}</div><p class="field-footnote">除标明来源的也门晒床实拍外，本组为 AI 生成的教学场景示意，不对应特定产区或生产批次。工艺顺序以文字与互动步骤为准。</p><details class="reading"><summary>再认一认：咖啡果、生豆与熟豆有什么不同？</summary><div class="field-grid field-comparison">${[
 ['cherry-branch','咖啡果 · 处理的起点','果皮包着果肉，种子藏在里面。','果实外观示意'],
 ['green-sample','生豆 · 处理的终点','去掉外层并干燥后，得到尚未烘焙的种子。','生豆外观示意'],
 ['roasted-table','熟豆 · 烘焙之后','熟悉的棕褐色来自之后的烘焙，不是生豆处理直接产生的。','熟豆外观示意']
 ].map(fieldCard).join('')}</div></details></section><dialog class="photo-dialog" aria-labelledby="photo-dialog-title"><div class="photo-dialog-bar"><h2 id="photo-dialog-title"></h2><button autofocus data-close-photo aria-label="关闭照片">关闭 ×</button></div><img class="photo-dialog-image" alt=""><p class="photo-dialog-description"></p><small class="photo-dialog-note"></small><div class="photo-credit"></div></dialog>`;}
export function bindProcessPhotos(root){
 const dialog=root.querySelector('.photo-dialog');
 root.querySelector('[data-jump-photos]').onclick=()=>{const section=root.querySelector('#process-photos');section.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});section.focus({preventScroll:true});};
 root.querySelectorAll('[data-photo]').forEach(button=>button.onclick=()=>{
  const key=button.dataset.photo,p=photos[key],caption=button.closest('.field-card').querySelector('.field-caption');
  dialog.querySelector('h2').textContent=caption.querySelector('h3').textContent;
  const img=dialog.querySelector('img');img.src=imagePath(key);img.alt=p.alt;
  dialog.querySelector('.photo-dialog-description').textContent=caption.querySelector('p').textContent;
  dialog.querySelector('.photo-dialog-note').textContent=caption.querySelector('small').textContent;
  dialog.querySelector('.photo-credit').innerHTML=photoCredit(key);dialog.showModal();
 });
 dialog.querySelector('[data-close-photo]').onclick=()=>dialog.close();
 return()=>{if(dialog.open)dialog.close();};
}
