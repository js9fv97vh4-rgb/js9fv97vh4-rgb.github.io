export const flavors = [
  { id: 'floral', name: '花香', icon: 'flower', color: '#a58291' },
  { id: 'fruity', name: '果香', icon: 'fruit', color: '#b87551' },
  { id: 'nutty', name: '坚果', icon: 'bean', color: '#a48b56' },
  { id: 'cocoa', name: '可可', icon: 'cocoa', color: '#79604e' },
  { id: 'spicy', name: '香料', icon: 'spark', color: '#7f8964' },
];

export const sources = {
  varieties: ['World Coffee Research · 品种图鉴', 'https://varieties.worldcoffeeresearch.org/'],
  origins: ['Cafe Imports · 产地资料', 'https://www.cafeimports.com/europe?r=origins'],
  processing: ['TechnoServe · 生豆处理指南', 'https://www.technoserve.org/wp-content/uploads/2022/03/TechnoServe-Wet-Mill-Processing-Guide.pdf'],
  geography: ['Natural Earth · 地理数据', 'https://www.naturalearthdata.com/'],
  caffeine: ['EFSA · 咖啡因含量与摄入参考', 'https://www.efsa.europa.eu/en/topics/topic/caffeine'],
  fda: ['FDA · 咖啡因摄入说明', 'https://www.fda.gov/consumers/consumer-updates/spilling-beans-how-much-caffeine-too-much'],
  drinks: ['Starbucks · 浓缩与经典饮品', 'https://about.starbucks.com/stories/2025/espresso-explained/'],
  macchiato: ['Nestlé Professional · 咖啡饮品说明', 'https://content.nestleprofessional.us/story/nescafe-coffee-faqs/page/3'],
};

// Coordinates are representative locations, not boundaries or individual farms.
export const countries = [
  { id: 'ETH', name: '埃塞俄比亚', en: 'Ethiopia', continent: '非洲', lat: 7, lng: 39, intro: '从高地花香，到成熟果实的甜。这里是认识咖啡风味多样性的好起点。', source: sources.origins },
  { id: 'KEN', name: '肯尼亚', en: 'Kenya', continent: '非洲', lat: -.3, lng: 37.2, intro: '赤道附近的高地，带你认识明亮酸质、莓果风味与多汁的口感。', source: sources.origins },
  { id: 'UGA', name: '乌干达', en: 'Uganda', continent: '非洲', lat: 1.3, lng: 32.3, intro: '不仅有罗布斯塔，高山上的阿拉比卡也值得细细探索。', source: ['Uganda Coffee · 产地与种植', 'https://ugandacoffee.go.ug/'] },
  { id: 'BRA', name: '巴西', en: 'Brazil', continent: '南美洲', lat: -16, lng: -47, intro: '从坚果到可可，认识圆润甜感与经典意式拼配的风味基础。', source: sources.origins },
  { id: 'COL', name: '哥伦比亚', en: 'Colombia', continent: '南美洲', lat: 3, lng: -75.5, intro: '安第斯山脉的多样微气候，让焦糖甜感和水果酸质在杯中相遇。', source: sources.origins },
  { id: 'PER', name: '秘鲁', en: 'Peru', continent: '南美洲', lat: -10, lng: -75, intro: '高海拔的小农产区，常能找到可可、柑橘与温柔甜感的组合。', source: sources.origins },
  { id: 'GTM', name: '危地马拉', en: 'Guatemala', continent: '中美洲', lat: 15.4, lng: -90.3, intro: '火山与山地之间，探索巧克力、果香和有层次的口感。', source: sources.origins },
  { id: 'CRI', name: '哥斯达黎加', en: 'Costa Rica', continent: '中美洲', lat: 9.9, lng: -84, intro: '细致的处理工艺与微型处理厂，让同一片土地展现不同风味。', source: sources.origins },
  { id: 'PAN', name: '巴拿马', en: 'Panama', continent: '中美洲', lat: 8.6, lng: -80.5, intro: '从瑰夏的花香开始，了解品种、环境和处理方式的共同作用。', source: sources.origins },
  { id: 'HND', name: '洪都拉斯', en: 'Honduras', continent: '中美洲', lat: 14.8, lng: -86.5, intro: '山地小农带来的风味，从坚果可可延伸到柔和的水果甜香。', source: sources.origins },
  { id: 'IND', name: '印度', en: 'India', continent: '亚洲', lat: 14, lng: 76, intro: '遮荫种植与多样的品种，带来值得探索的可可、坚果与香料联想。', source: ['Coffee Board of India · 产地', 'https://coffeeboard.gov.in/'] },
  { id: 'VNM', name: '越南', en: 'Vietnam', continent: '亚洲', lat: 13, lng: 108, intro: '认识罗布斯塔的重要产地，也别错过大叻高地上的阿拉比卡。', source: ['International Coffee Organization · 咖啡资料', 'https://ico.org/'] },
  { id: 'IDN', name: '印度尼西亚', en: 'Indonesia', continent: '亚洲', lat: -3, lng: 113, intro: '群岛之间，湿刨、水洗等工艺呈现出不同的口感和风味层次。', source: sources.origins },
  { id: 'CHN', name: '中国', en: 'China', continent: '亚洲', lat: 25, lng: 102, intro: '把目光转向云南，从熟悉的土地出发，探索正在生长的咖啡风味。', source: ['云南省政府 · 咖啡产业资料', 'https://www.yn.gov.cn/'] },
];

const rawRegions = [
  ['yirgacheffe','ETH','耶加雪菲','Yirgacheffe',6.16,38.2,'1,700–2,200','阿拉比卡','当地地方品种',['washed','natural'],['floral','fruity'],'茉莉 · 柑橘 · 佛手柑','轻盈细腻，常有清晰的花香与茶感。','像走进一座开着花的果园。'],
  ['sidama','ETH','西达玛','Sidama',6.7,38.4,'1,500–2,200','阿拉比卡','当地地方品种',['washed','natural'],['fruity','floral'],'莓果 · 柑橘 · 花香','果香鲜明，甜感与酸质常相互呼应。','想认识水果调性的咖啡，可以从这里开始。'],
  ['nyeri','KEN','涅里','Nyeri',-.42,36.95,'1,500–2,000','阿拉比卡','SL28、SL34、Ruiru 11',['washed'],['fruity'],'黑醋栗 · 柑橘 · 红糖','酸质明亮，口感常有果汁般的饱满感。','这里的“酸”，更像咬下一口水果。'],
  ['kirinyaga','KEN','基里尼亚加','Kirinyaga',-.5,37.3,'1,300–2,000','阿拉比卡','SL28、SL34、Batian',['washed'],['fruity','floral'],'莓果 · 柑橘 · 花香','清晰多汁，余韵中常有水果甜感。','试着在降温后再喝一口，感受风味变化。'],
  ['bugisu','UGA','布吉苏','Bugisu',1.1,34.35,'1,500–2,300','阿拉比卡','SL14、SL28、地方品种',['washed'],['cocoa','fruity'],'可可 · 柑橘 · 红糖','口感圆润，带柔和的水果酸质。','埃尔贡山麓的一种高地表达。'],
  ['rwenzori','UGA','鲁文佐里','Rwenzori',.2,30,'1,200–2,200','阿拉比卡','SL14、SL28、地方品种',['natural','washed'],['fruity','cocoa'],'熟果 · 可可 · 焦糖','日晒批次常有成熟水果的风味联想。','不同处理批次，会呈现不同的山地风味。'],
  ['cerrado','BRA','塞拉多','Cerrado Mineiro',-18.6,-46.5,'800–1,300','阿拉比卡','卡杜艾、蒙多诺沃',['natural','honey'],['nutty','cocoa'],'榛果 · 牛奶巧克力 · 焦糖','口感圆润，常见坚果与可可调性。','如果喜欢坚果巧克力，可以留意这个名字。'],
  ['sul-minas','BRA','米纳斯南部','Sul de Minas',-21.5,-45.5,'900–1,300','阿拉比卡','波旁、卡杜艾、蒙多诺沃',['natural','honey'],['nutty','cocoa','fruity'],'坚果 · 可可 · 熟果','甜感柔和，也能在部分批次中找到果香。','熟悉的巧克力之外，也藏着水果的另一面。'],
  ['huila','COL','慧兰','Huila',2.5,-75.6,'1,200–2,000','阿拉比卡','卡杜拉、Castillo、哥伦比亚',['washed','natural'],['fruity','cocoa'],'柑橘 · 焦糖 · 可可','甜感与酸质兼具，层次随批次而变化。','在水果的明亮与焦糖的温暖之间。'],
  ['narino','COL','纳里尼奥','Nariño',1.3,-77.3,'1,500–2,200','阿拉比卡','卡杜拉、Castillo',['washed'],['fruity','floral'],'柑橘 · 花香 · 红糖','酸质清晰，常带细致甜感。','靠近赤道的高地，慢慢孕育一杯咖啡。'],
  ['cajamarca','PER','卡哈马卡','Cajamarca',-5.7,-78.8,'1,200–2,000','阿拉比卡','铁皮卡、卡杜拉、波旁',['washed'],['cocoa','fruity','nutty'],'可可 · 柑橘 · 杏仁','常有温柔的酸质与均衡口感。','适合用来理解一杯咖啡里的“平衡”。'],
  ['cusco','PER','库斯科','Cusco',-12.8,-72.7,'1,500–2,200','阿拉比卡','铁皮卡、波旁、卡杜拉',['washed','natural'],['fruity','cocoa'],'核果 · 可可 · 红糖','山地咖啡的甜感与水果层次。','安第斯山间，一杯值得慢慢喝的咖啡。'],
  ['antigua','GTM','安提瓜','Antigua',14.55,-90.73,'1,500–1,700','阿拉比卡','波旁、卡杜拉、卡杜艾',['washed'],['cocoa','spicy','fruity'],'巧克力 · 香料 · 柑橘','口感有支撑感，余韵常带可可联想。','把可可的温暖和水果的明亮放进同一杯。'],
  ['huehuetenango','GTM','薇薇特南果','Huehuetenango',15.5,-91.5,'1,500–2,000','阿拉比卡','波旁、卡杜拉、卡杜艾',['washed'],['fruity','cocoa'],'核果 · 柑橘 · 焦糖','果香清晰，常见活泼的酸质。','一个名字很长、值得记住的高地产区。'],
  ['tarrazu','CRI','塔拉珠','Tarrazú',9.65,-84,'1,200–1,900','阿拉比卡','卡杜拉、卡杜艾',['washed','honey'],['fruity','cocoa'],'柑橘 · 红糖 · 可可','明亮的酸质与甜感相伴。','对照不同处理方式，会发现新的表情。'],
  ['west-valley','CRI','西部谷地','West Valley',10.1,-84.4,'1,000–1,800','阿拉比卡','卡杜拉、卡杜艾、维拉萨奇',['honey','washed','natural'],['fruity','nutty'],'核果 · 蜂蜜联想 · 坚果','甜感细致，口感受处理工艺影响明显。','蜜处理的“蜜”，来自保留的黏质层。'],
  ['boquete','PAN','波奎特','Boquete',8.78,-82.43,'1,000–2,000','阿拉比卡','瑰夏、卡杜艾、铁皮卡',['washed','natural'],['floral','fruity'],'茉莉 · 佛手柑 · 热带水果','部分瑰夏批次呈现花香与茶感。','瑰夏是品种名，并不是巴拿马咖啡的统称。'],
  ['volcan','PAN','沃尔坎','Volcán',8.77,-82.63,'1,200–1,800','阿拉比卡','瑰夏、卡杜艾、卡杜拉',['washed','natural'],['floral','fruity'],'花香 · 柑橘 · 核果','精细批次常有清晰香气与细腻口感。','火山周围，不止一种风味的可能。'],
  ['copan','HND','科潘','Copán',14.9,-88.8,'1,000–1,500','阿拉比卡','波旁、卡杜艾、卡杜拉',['washed'],['cocoa','nutty'],'可可 · 坚果 · 焦糖','常呈现圆润口感与温和酸质。','认识中美洲咖啡的温暖一面。'],
  ['marcala','HND','马尔卡拉','Marcala',14.15,-88.03,'1,200–1,700','阿拉比卡','波旁、铁皮卡、卡杜艾',['washed','honey'],['fruity','cocoa'],'柑橘 · 核果 · 可可','果香与甜感交织，余韵柔和。','山地小农与处理工艺共同塑造风味。'],
  ['chikmagalur','IND','奇克马加卢尔','Chikmagalur',13.32,75.77,'900–1,500','阿拉比卡、罗布斯塔','Kent、S.795、Cauvery 等',['washed','natural'],['spicy','cocoa','nutty'],'香料 · 可可 · 坚果','可见饱满口感，实际表现取决于种属和批次。','买豆时，别忘了同时看看种属和处理方式。'],
  ['coorg','IND','库格','Coorg Kodagu',12.42,75.74,'750–1,200','阿拉比卡、罗布斯塔','S.795、罗布斯塔栽培品种等',['washed','natural'],['spicy','cocoa'],'香料 · 黑巧克力 · 坚果','常有厚实的口感联想。','遮荫种植下的咖啡，也有自己的风土故事。'],
  ['dak-lak','VNM','得乐','Đắk Lắk Dak Lak',12.67,108.04,'400–800','以罗布斯塔为主','罗布斯塔栽培品种',['natural','washed'],['cocoa','nutty'],'黑巧克力 · 烘烤坚果','常见厚实口感，苦感受烘焙与冲煮影响。','罗布斯塔是种属俗称，也有精细处理的批次。'],
  ['lam-dong','VNM','林同','Lâm Đồng Lam Dong',11.94,108.45,'1,000–1,600','阿拉比卡、罗布斯塔','阿拉比卡中可见卡蒂姆等',['washed','natural'],['fruity','cocoa'],'柑橘 · 焦糖 · 可可','大叻高地阿拉比卡可有柔和水果酸质。','越南咖啡的故事，也发生在更凉爽的高地。'],
  ['sumatra','IDN','苏门答腊','Sumatra',2.2,98.8,'900–1,600','阿拉比卡','铁皮卡系、Tim Tim、Ateng 等',['wet-hulled','washed','natural'],['spicy','cocoa'],'香料 · 草本 · 黑巧克力','湿刨批次常有饱满口感与独特风味联想。','曼特宁是贸易名称，不是一个咖啡品种。'],
  ['java','IDN','爪哇','Java',-7.9,113.8,'900–1,500','阿拉比卡、罗布斯塔','铁皮卡系、S.795 等',['washed','wet-hulled'],['cocoa','spicy','nutty'],'可可 · 香料 · 坚果','圆润口感，也有清晰的水洗批次。','一座岛屿的咖啡，远不止一种味道。'],
  ['puer','CHN','普洱','Pu’er Puer',22.8,100.97,'1,000–1,600','阿拉比卡','卡蒂姆为主，也有其他引种',['washed','natural','honey'],['fruity','cocoa','nutty'],'核果 · 可可 · 坚果','从经典可可调到鲜明果香，批次差异丰富。','在家乡的风味里，发现咖啡的新可能。'],
  ['baoshan','CHN','保山','Baoshan',25.1,99.16,'1,000–1,500','阿拉比卡','卡蒂姆、铁皮卡、波旁等',['washed','natural','honey'],['nutty','cocoa','fruity'],'坚果 · 焦糖 · 柑橘','常见温柔甜感与扎实口感。','从潞江坝出发，认识云南小粒咖啡。'],
];
export const regions = rawRegions.map(([id,countryId,name,en,lat,lng,altitude,species,varieties,processes,flavors,notes,body,story]) => ({id,countryId,name,en,lat,lng,altitude,species,varieties,processes,flavors,notes,body,story}));

export const processes = [
  {id:'natural',name:'日晒处理',en:'NATURAL',short:'让果实陪伴种子，慢慢干燥。',intro:'完整的咖啡果先干燥，再去掉干燥的果皮、果肉和种皮。翻动、挑选与干燥管理，都是关键。',retained:'干燥时保留完整果实',color:'#aa654b',fruit:1,steps:[['采收与挑选','挑选成熟咖啡果，剔除不合适的果实。'],['整果干燥','完整果实在晒床、晒场或设备中干燥，定时翻动。'],['静置与脱壳','干燥稳定后，去除外层干果壳和羊皮层。'],['分级得到生豆','筛选与储存，准备进入烘焙环节。']],notes:'常见成熟水果、莓果或发酵香气联想，口感可能更饱满；良好的干燥管理决定品质。',myth:'日晒不等于放着不管。干燥速度、翻动和挑选，都需要细致管理。'},
  {id:'washed',name:'水洗处理',en:'WASHED',short:'先去掉果肉与果胶，让种子干燥。',intro:'先去果皮果肉，再通过发酵、水洗或机械方式去除黏质层，随后干燥带羊皮层的种子。',retained:'干燥前去除果肉与黏质层',color:'#768a82',fruit:0,steps:[['采收与去果皮','挑选成熟果实，通过脱皮机去掉果皮和大部分果肉。'],['去果胶与清洗','通过发酵配合清洗，或机械去胶，去除黏质层。'],['带壳干燥','保留羊皮层进行干燥，并控制水分。'],['脱壳与分级','去除羊皮层，筛选后得到生豆。']],notes:'常用清晰、干净、明亮来形容部分水洗批次；它并不意味着每杯都酸，也不意味着没有发酵。',myth:'水洗并不是把咖啡的味道洗掉，而是在干燥前去除果肉与果胶。'},
  {id:'honey',name:'蜜处理',en:'HONEY',short:'留下黏质层，保留另一种可能。',intro:'去掉果皮和部分果肉，保留一定的果胶黏质层进行干燥。各地对蜜处理与去皮日晒的叫法并不完全一致。',retained:'去果皮，保留部分或较多黏质层',color:'#bc9255',fruit:.5,steps:[['采收与挑选','从成熟的咖啡果开始，筛除瑕疵果。'],['去果皮，留果胶','机械去皮后，保留一定的黏质层。'],['带果胶干燥','控制摊铺、翻动、温度和干燥时间。'],['脱壳与分级','去除干燥黏质层和羊皮层，得到生豆。']],notes:'部分批次呈现圆润甜感、熟果或焦糖联想。并不能只根据蜜处理的颜色名称推断甜度。',myth:'蜜处理没有添加蜂蜜。“蜜”指的是种子外面黏黏的果胶层。'},
  {id:'wet-hulled',name:'湿刨处理',en:'WET-HULLED',short:'在充分干燥前，先去掉羊皮层。',intro:'常见于印度尼西亚部分产区。与水洗的重要区别是：种子还含有较多水分时，就先脱去羊皮层，随后继续干燥。',retained:'部分干燥后提前去除羊皮层',color:'#7c7758',fruit:.15,steps:[['采收与去皮','去掉果皮果肉，再处理黏质层。'],['初步干燥','种子尚未充分干燥，仍含有较多水分。'],['湿态脱壳','在较高含水状态下去除羊皮层。'],['继续干燥与分级','脱壳后继续干燥，再进行筛选和储存。']],notes:'部分湿刨咖啡有草本、香料与厚实口感的联想；这些并非所有印度尼西亚咖啡的固定特征。',myth:'湿刨不是水洗的另一个名字。关键区别在于脱去羊皮层的时机。'},
];

export const brews = [
  {id:'pour-over',name:'手冲咖啡',en:'POUR OVER',icon:'dripper',tag:'清晰 · 细腻',principle:'热水穿过咖啡粉层，滤纸截留细粉与部分油脂。注水节奏和研磨会影响萃取。',gear:'V60 02、滤纸、手冲壶、磨豆机、电子秤',params:[['咖啡粉','15 g'],['注水量','250 g'],['水温','92–96°C'],['总时间','约 2.5 分钟']],steps:['润湿滤纸并温杯，倒掉预热水。','加入15克中细研磨咖啡粉，轻摇铺平。','注入足够的水打湿粉层，闷蒸约30秒。','以小圈缓慢注水，累计至250克，等待滴滤完成。'],faq:['流速太慢怎么办？','先稍微调粗研磨，并检查滤纸是否贴合。每次只调整一个变量。'],source:['HARIO · V60 入门指南','https://www.hario.co.uk/pages/brew-guides-v60-expert'],condition:'适用于 V60 02 的单杯起点配方；豆子、研磨机与滤纸会改变流速。'},
  {id:'french-press',name:'法压壶',en:'FRENCH PRESS',icon:'press',tag:'饱满 · 直接',principle:'咖啡粉浸泡在水中，随后用金属滤网分离。更多油脂与少量细粉进入杯中，口感常更厚实。',gear:'法压壶、热水壶、电子秤、粗研磨咖啡粉',params:[['咖啡粉','20 g'],['注水量','400 g'],['研磨','粗研磨'],['浸泡时间','4 分钟']],steps:['温热壶体后倒掉水，加入20克粗研磨咖啡粉。','注入400克刚烧开稍放凉的水，使咖啡粉充分浸湿。','放上盖子，先不下压，浸泡约4分钟。','缓慢压下滤网，马上倒出咖啡，避免继续浸泡。'],faq:['为什么杯底有细粉？','金属滤网会让部分细粉通过。避免过细研磨，倒出时留下最后少量液体。'],source:['Alternative Brewing · Bodum 法压指南','https://www.youtube.com/watch?v=lIHXoNMr3D0'],condition:'按指南50克粉配1升水等比例缩小；壶体需有足够容量。'},
  {id:'moka',name:'摩卡壶',en:'MOKA POT',icon:'moka',tag:'浓郁 · 扎实',principle:'下壶受热产生压力，让水向上通过粉层。它比滴滤浓郁，但不等同于意式机器萃取的浓缩。',gear:'摩卡壶、适配热源、摩卡壶用研磨咖啡粉',params:[['用粉量','粉槽松填满'],['水量','安全阀下方'],['研磨','中细研磨'],['火力','中小火']],steps:['下壶加水至安全阀下方，保持安全阀通畅。','粉槽松填满咖啡粉并刮平，不压粉。','擦净密封接触面并拧紧上下壶，以中小火加热。','出液接近结束时停止加热，倒出享用；冷却后再拆洗。'],faq:['能像意式浓缩一样压粉吗？','不要压粉，也不要堵住安全阀。粉量和水量以具体壶型的厂家说明为准。'],source:['Bialetti · Moka Express 使用指南','https://bialetti-cookware.zendesk.com/hc/en-us/articles/5416235346322-How-to-use-the-Moka-Express'],condition:'以 Bialetti Moka Express 为例，不同杯数的壶不使用同一固定克数。'},
  {id:'aeropress',name:'爱乐压',en:'AEROPRESS',icon:'press',tag:'灵活 · 干净',principle:'结合浸泡与手动压力过滤。滤纸带来清晰口感，时间和加水量可以灵活变化。',gear:'AeroPress Original、滤纸、坚固杯子、搅拌棒',params:[['咖啡粉','16–18 g'],['注水量','壶身刻度 4'],['水温','85°C 起'],['等待时间','60 秒']],steps:['采用正置法，在滤盖放入滤纸，拧紧后放在坚固杯上。','加入16–18克中度研磨咖啡粉，轻摇铺平。','加水至刻度4，轻搅约3秒；插入活塞少许形成密封，等待60秒。','平稳轻压活塞，勿用猛力。取下后按口味加水。'],faq:['一定要用倒置法吗？','不需要。这里采用官方正置法，器具保持稳定，压滤时远离身体。'],source:['AeroPress · 官方使用步骤','https://aeropress.com/pages/how-to-use'],condition:'适用于 Original 的官方示例；刻度不是统一毫升配方，其他型号请参阅对应说明。'},
  {id:'cold-brew',name:'冷萃咖啡',en:'COLD BREW',icon:'cold',tag:'低温 · 慢萃',principle:'用常温或冷水长时间浸泡咖啡，再过滤。低温浸泡与冰镇热咖啡是不同的做法。',gear:'家用冷萃壶或洁净密封容器、滤网、电子秤',params:[['咖啡粉','50 g'],['注水量','600 ml'],['研磨','粗研磨'],['浸泡时间','冷藏约12小时']],steps:['准备洁净冷萃壶或密封容器，加入50克粗研磨咖啡。','加入600毫升饮用水，确保粉层充分湿润。','冷藏浸泡约12小时，再过滤分离粉液。','咖啡液保持密封冷藏，按口味加水或奶稀释。'],faq:['冷萃喝起来顺口，咖啡因就更低吗？','不能这样判断。粉水比、用粉量和稀释程度都会影响一杯里的咖啡因。'],source:['HARIO · 冷萃指南','https://www.hario.co.uk/blogs/news/keep-it-cool-with-a-cold-brew'],condition:'本站50克／600毫升的较轻家用调整示例；HARIO现行网页为60克／600毫升。请遵循器具清洁、冷藏和保存说明。'},
  {id:'espresso',name:'意式浓缩',en:'ESPRESSO',icon:'espresso',tag:'集中 · 有力',principle:'高压热水在较短时间内通过细研磨的咖啡粉饼。它也是美式、拿铁等饮品的共同基底。',gear:'意式咖啡机、磨豆机、匹配的粉碗、压粉器、电子秤',params:[['咖啡粉','18 g'],['出液重量','36 g'],['粉液比','1 : 2'],['计量方式','按重量']],steps:['预热咖啡机，确认粉碗适合18克左右的粉量。','研磨后均匀布粉、水平压粉，保持粉碗边缘干净。','开始萃取，用秤计量，在36克出液附近停止。','品尝后微调研磨与粉液比；记录调整，不把时间当作唯一目标。'],faq:['36克出液等于36毫升吗？','不等于。油脂层会影响体积，配方用重量更容易复现；饮品拆解页也分别标注基底重量和配料体积。'],source:['La Marzocco · 理解粉液比','https://home.lamarzoccousa.com/home-lab-1-brew-ratios/'],condition:'18克粉、36克液只是1:2的起点示例，需匹配粉碗、豆子与个人口味。'},
];

// One shared drink catalog for classic recipes and the DIY workbench.
export { drinkCatalog as drinks } from './catalog.js';
