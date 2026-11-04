// Recipes are teaching examples, not a claim that a drink name fixes a dose,
// serving size or caffeine content. Source links describe the drink family;
// the weight-based recipes below are our adaptable workshop examples.
export const categories = [
  { id: 'black', name: '黑咖啡', groups: [{ id: 'espresso-family', name: '浓缩家族' }, { id: 'water-family', name: '加水类' }, { id: 'filter-family', name: '滤泡与浸泡' }] },
  { id: 'milk', name: '奶咖', groups: [{ id: 'classic-milk', name: '经典奶咖' }, { id: 'plant-milk', name: '植物奶咖' }] },
  { id: 'dessert', name: '风味与甜品咖啡', groups: [{ id: 'flavored-milk', name: '调味奶咖' }, { id: 'cream-family', name: '奶油类' }, { id: 'icecream-family', name: '冰淇淋类' }] },
  { id: 'sparkling', name: '气泡特调', groups: [{ id: 'tonic-family', name: '汤力类' }, { id: 'soda-family', name: '苏打类' }] },
];

// caffeineKnown only describes the plain ingredient specified here. Flavored,
// fortified or coffee-containing products require their own label values.
export const ingredients = [
  { id: 'water', name: '水', unit: 'ml', color: '#b3c6c5', caffeineKnown: true, milk: false },
  { id: 'milk', name: '原味牛奶', unit: 'ml', color: '#f2e5cc', caffeineKnown: true, milk: true },
  { id: 'oat', name: '原味燕麦奶', unit: 'ml', color: '#ddc8a3', caffeineKnown: true, milk: true },
  { id: 'coconut', name: '原味椰乳', unit: 'ml', color: '#eee9df', caffeineKnown: true, milk: true },
  { id: 'cream', name: '原味打发奶油', unit: 'g', color: '#fff5dc', caffeineKnown: true, milk: false },
  { id: 'chocolate', name: '巧克力酱', unit: 'g', color: '#4c2c23', caffeineKnown: false, milk: false },
  { id: 'vanilla', name: '香草糖浆', unit: 'ml', color: '#c29d61', caffeineKnown: true, milk: false },
  { id: 'caramel', name: '焦糖糖浆', unit: 'ml', color: '#b5743d', caffeineKnown: true, milk: false },
  { id: 'ice', name: '冰', unit: 'g', color: '#d7e6e7', caffeineKnown: true, milk: false },
  { id: 'icecream', name: '冰淇淋（口味自选）', unit: 'g', color: '#f5dbb5', caffeineKnown: false, milk: false },
  { id: 'tonic', name: '原味汤力水', unit: 'ml', color: '#cadbd3', caffeineKnown: true, milk: false },
  { id: 'soda', name: '无糖苏打水', unit: 'ml', color: '#bdd2d5', caffeineKnown: true, milk: false },
];

const sources = {
  espresso: ['Starbucks · 浓缩饮品说明', 'https://about.starbucks.com/stories/2025/espresso-explained/'],
  ratios: ['Wacaco · 短萃、浓缩与长萃', 'https://www.wacaco.com/blogs/news/ristretto-espresso-lungo-with-the-minipresso-ns'],
  longBlack: ['Nespresso · Long Black', 'https://www.nespresso.com/au/en/coffee-recipes/long-black'],
  pourOver: ['HARIO · V60 冲煮指南', 'https://www.hario.co.uk/pages/brew-guides-v60-expert'],
  frenchPress: ['REC COFFEE · Bodum 法压配方', 'https://rec-coffee.com/en/pages/bodum-recipe'],
  coldBrew: ['HARIO · 冷萃指南', 'https://www.hario.co.uk/blogs/news/keep-it-cool-with-a-cold-brew'],
  oat: ['Nespresso · 燕麦奶咖配方（本例省略调味）', 'https://www.nespresso.com/recipes/ca/en/37508SPI-spicy-oat-latte.html'],
  coconut: ['NESCAFÉ · 椰乳冰拿铁（本例改为意式基底）', 'https://www.nescafe.com/us/recipes/iced-coconut-latte/'],
  recipes: ['Nespresso · 咖啡配方集', 'https://www.nespresso.com/us/en/coffee-recipes'],
  flavored: ['Nespresso · 风味奶咖与甜品配方', 'https://www.nespresso.com/ecom/medias/sys_master/public/28475407171614/Recetario-B2B-2022-DIGITAL-compressed-compressed-1-1-.pdf'],
  vienna: ['Nespresso · Café Viennois', 'https://www.nespresso.com/recipes/my/en/23085CAF-cafe-viennois.html'],
  tonic: ['NESCAFÉ · Espresso Tonic（本例改为意式基底）', 'https://www.nescafe.com/gb/recipes/espresso-tonic'],
  soda: ['Nespresso · Sparkling Coffee（本例不加糖浆）', 'https://www.nespresso.com/nz/en/coffee-recipes/sparkling-coffee'],
};

export const recipeDisclaimer = '本站教学示例，份数与配方并非统一行业标准。来源介绍饮品组成，具体克数为工作台示例；各地、器具与门店做法可能不同。';
export const caffeineReference = {
  mg: 80, volume: 60, unit: 'ml',
  basis: 'EFSA 的一杯 60 ml 浓缩咖啡约含 80 mg 咖啡因，仅作独立参考；不能套用到按克计量的本页配方。',
  source: ['EFSA · 咖啡因', 'https://www.efsa.europa.eu/en/topics/topic/caffeine'],
  daily: 400, pregnancyDaily: 200,
  note: '400 mg 是一般健康成人全天总摄入的参考上限，不是推荐摄入目标。孕期及哺乳期参考为全天 200 mg；个体敏感性不同。',
};

const defaults = {
  method: 'espresso', shots: 2, dose: 18, output: 36, outputUnit: 'g',
  ingredients: {}, foam: 0, tags: ['热'], caffeine: null,
};

export const drinkCatalog = [
  {
    id: 'espresso', name: '意式浓缩', en: 'Espresso', category: 'black', subcategory: 'espresso-family',
    shots: 1, dose: 9, output: 18, notes: '浓郁 · 集中 · 短小',
    detail: '压力使热水穿过细研磨的咖啡粉。表面 crema 来自咖啡，并非奶泡；香气随豆子和萃取变化。单份示例需使用匹配的粉碗。',
    compare: '双份浓缩增加的是用粉及基底份数；长萃是在相同粉量下让更多水通过粉饼。', source: sources.espresso,
  },
  {
    id: 'doppio', name: '双份浓缩', en: 'Doppio', category: 'black', subcategory: 'espresso-family',
    notes: '集中 · 双份基底', detail: '双份浓缩是两份浓缩的杯量概念。本例用 18 g 粉、36 g 出液作为制作起点。',
    compare: '双份不等于长萃，也不保证咖啡因正好是另一门店单份的两倍。', source: sources.espresso,
  },
  {
    id: 'ristretto', name: '短萃', en: 'Ristretto', category: 'black', subcategory: 'espresso-family',
    output: 22, notes: '紧凑 · 浓缩感', detail: '在同样用粉量的示例中，较早停止出液，减少通过粉饼的水量。实际风味取决于研磨、豆子与设备。',
    compare: '它改变萃取过程；把正常浓缩倒掉一部分，并不等于做了短萃。', source: sources.ratios,
  },
  {
    id: 'lungo', name: '长萃', en: 'Lungo', category: 'black', subcategory: 'espresso-family',
    output: 54, notes: '舒展 · 更长萃取', detail: '同样的粉量让更多水通过粉饼，得到较多咖啡液。它会同时改变浓度与萃取过程。',
    compare: '美式是在萃取完成后另加水，长萃的水则继续通过咖啡粉。', source: sources.ratios,
  },
  {
    id: 'americano', name: '美式咖啡', en: 'Americano', category: 'black', subcategory: 'water-family',
    ingredients: { water: 150 }, tags: ['热', '可冰饮'], notes: '清爽 · 咖啡本味',
    detail: '浓缩做好后加入饮用水，稀释咖啡而不改变这份基底已有的咖啡因。',
    compare: '手冲直接让水穿过粉层；美式先做浓缩再稀释。', source: sources.espresso,
  },
  {
    id: 'long-black', name: '长黑咖啡', en: 'Long Black', category: 'black', subcategory: 'water-family',
    ingredients: { water: 100 }, notes: '清晰 · 浓缩香气',
    detail: '先在杯中放热水，再加入浓缩。可以留意表面油脂的状态；本例用水少于示例美式。',
    compare: '与美式的常见区别是加入顺序及用水量，门店命名与配方可能重叠。', source: sources.longBlack,
  },
  {
    id: 'pour-over', name: '手冲咖啡', en: 'Pour Over', category: 'black', subcategory: 'filter-family',
    method: 'pour-over', shots: 0, dose: 15, output: 220, outputUnit: 'ml', water: 250,
    notes: '清晰 · 轻盈', detail: '水穿过咖啡粉与滤纸滴入杯中，滤纸截留细粉及部分油脂。杯量受吸水与滴滤情况影响，本例出杯量为示意。',
    compare: '法压主要是浸泡再过滤；手冲主要在注水和流动中萃取。', source: sources.pourOver,
  },
  {
    id: 'french-press', name: '法压咖啡', en: 'French Press', category: 'black', subcategory: 'filter-family',
    method: 'french-press', shots: 0, dose: 20, output: 350, outputUnit: 'ml', water: 400,
    notes: '饱满 · 油脂感', detail: '咖啡粉在热水中浸泡后用金属滤网分离，杯中可能保留少量细粉。本例出杯量仅作示意。',
    compare: '与滤纸手冲相比，金属滤网常带来更明显的油脂感。', source: sources.frenchPress,
  },
  {
    id: 'cold-brew', name: '冷萃咖啡', en: 'Cold Brew', category: 'black', subcategory: 'filter-family',
    method: 'cold-brew', shots: 0, dose: 50, output: 500, outputUnit: 'ml', water: 600, tags: ['冷'],
    notes: '低温慢萃 · 柔和', detail: '以冷水长时间浸泡再过滤。本工作台保留 50 g / 600 ml 的较轻示例；HARIO 现行指南为 60 g / 600 ml，出杯量只是示意。',
    compare: '冰美式是浓缩加水与冰；冷萃的萃取本身就在低温进行。顺口不等于低咖啡因。', source: sources.coldBrew,
  },
  {
    id: 'latte', name: '拿铁', en: 'Caffè Latte', category: 'milk', subcategory: 'classic-milk',
    ingredients: { milk: 180 }, foam: .08, tags: ['热', '可冰饮'], notes: '奶香 · 顺滑',
    detail: '浓缩与较多牛奶融合，热版本表面常有薄薄微奶泡。奶香与咖啡共同决定整体风味。',
    compare: '同样基底下，示例拿铁比馥芮白奶量更多，咖啡感更柔和。', source: sources.espresso,
  },
  {
    id: 'cappuccino', name: '卡布奇诺', en: 'Cappuccino', category: 'milk', subcategory: 'classic-milk',
    ingredients: { milk: 120 }, foam: .35, notes: '绵密 · 奶泡丰富',
    detail: '浓缩、热牛奶与明显的奶泡共同构成口感。本例的奶泡来自这 120 ml 牛奶的一部分，未另外加入一份奶。',
    compare: '奶泡比示例拿铁明显；并不要求所有门店都采用精确的三等份。', source: sources.espresso,
  },
  {
    id: 'flat-white', name: '馥芮白', en: 'Flat White', category: 'milk', subcategory: 'classic-milk',
    ingredients: { milk: 100 }, foam: .06, notes: '丝滑 · 咖啡感突出',
    detail: '浓缩搭配薄而细腻的微奶泡，咖啡与奶融合。各地会使用不同杯量、浓缩或短萃基底。',
    compare: '本例用奶少于拿铁；名称本身并不意味着固定浓缩份数。', source: sources.espresso,
  },
  {
    id: 'cortado', name: '科尔塔多', en: 'Cortado', category: 'milk', subcategory: 'classic-milk',
    ingredients: { milk: 40 }, foam: .04, notes: '小杯 · 咖啡与奶平衡',
    detail: '用少量蒸汽奶柔化浓缩。常以咖啡与奶体积接近作为理解起点，但本页咖啡用克、奶用毫升，不能直接宣称精确 1:1。',
    compare: '通常比拿铁小，奶量少；与玛奇朵相比，奶参与得更多。', source: sources.recipes,
  },
  {
    id: 'macchiato', name: '浓缩玛奇朵', en: 'Espresso Macchiato', category: 'milk', subcategory: 'classic-milk',
    shots: 1, dose: 9, output: 18, ingredients: { milk: 15 }, foam: .65, notes: '浓缩主导 · 一抹奶泡',
    detail: '在浓缩上加入少量牛奶与奶泡，保留浓缩的集中感。本例是小杯浓缩玛奇朵。',
    compare: '它与大杯焦糖玛奇朵、拿铁玛奇朵不是同一种组成。', source: sources.espresso,
  },
  {
    id: 'oat-latte', name: '燕麦拿铁', en: 'Oat Latte', category: 'milk', subcategory: 'plant-milk',
    ingredients: { oat: 180 }, foam: .08, tags: ['热', '可冰饮'], notes: '谷物香 · 柔滑',
    detail: '以燕麦饮替换牛奶，形成谷物风味。是否额外含糖、能否稳定发泡，要看具体产品。',
    compare: '与牛奶拿铁的区别来自奶基底，不代表咖啡因随之减少。', source: sources.oat,
  },
  {
    id: 'coconut-latte', name: '椰乳拿铁', en: 'Coconut Latte', category: 'milk', subcategory: 'plant-milk',
    ingredients: { coconut: 180, ice: 60 }, foam: 0, tags: ['冷'], notes: '椰香 · 圆润',
    detail: '浓缩与椰乳相遇。本例不额外加糖；商品椰乳可能已加糖，口感与配料以包装为准。',
    compare: '椰乳、椰子水和浓稠椰浆不是同一种配料，不能随意等量替换。', source: sources.coconut,
  },
  {
    id: 'mocha', name: '摩卡', en: 'Caffè Mocha', category: 'dessert', subcategory: 'flavored-milk',
    ingredients: { milk: 150, chocolate: 20 }, foam: .1, tags: ['热', '可冰饮'], notes: '巧克力 · 醇厚',
    detail: '浓缩与牛奶加入巧克力酱，可可带来风味与额外咖啡因，未获配料数据时总量保持未知。',
    compare: '饮品摩卡包含巧克力；摩卡壶是一种器具，名字相似却不意味着做出来就是摩卡。', source: sources.flavored,
  },
  {
    id: 'vanilla-latte', name: '香草拿铁', en: 'Vanilla Latte', category: 'dessert', subcategory: 'flavored-milk',
    ingredients: { milk: 180, vanilla: 15 }, foam: .08, tags: ['热', '可冰饮'], notes: '香草香 · 甜润',
    detail: '在拿铁中加入香草糖浆。香草香气和添加糖带来的甜味，不应误认为豆子本身的风味。',
    compare: '与原味拿铁相比，多了香草调味；咖啡基底不变时，加糖浆不会消除咖啡因。', source: sources.recipes,
  },
  {
    id: 'caramel-latte', name: '焦糖拿铁', en: 'Caramel Latte', category: 'dessert', subcategory: 'flavored-milk',
    ingredients: { milk: 180, caramel: 15 }, foam: .08, tags: ['热', '可冰饮'], notes: '焦糖 · 奶香',
    detail: '拿铁加入焦糖糖浆形成甜味与焦糖香。配料带来的焦糖风味与咖啡豆自然产生的联想需要区分。',
    compare: '不是所有焦糖玛奇朵都按这个顺序或配方制作，点单需确认具体组成。', source: sources.flavored,
  },
  {
    id: 'con-panna', name: '康宝蓝', en: 'Espresso con Panna', category: 'dessert', subcategory: 'cream-family',
    ingredients: { cream: 20 }, notes: '浓缩 · 奶油', detail: '在浓缩顶上放打发奶油，奶油慢慢融入咖啡。奶油不是蒸汽牛奶打出的奶泡。',
    compare: '浓缩玛奇朵用少量奶泡，康宝蓝用打发奶油。', source: sources.espresso,
  },
  {
    id: 'vienna', name: '维也纳咖啡', en: 'Café Viennois', category: 'dessert', subcategory: 'cream-family',
    ingredients: { water: 80, cream: 30 }, notes: '奶油顶 · 温润',
    detail: '这里采用黑咖啡加打发奶油的教学版本，以浓缩加水作为较大杯基底。来源版本使用长杯咖啡，名称与配方存在地区差异。',
    compare: '与示例康宝蓝相比，咖啡基底更舒展、杯量更大；两者都不是牛奶奶泡饮品。', source: sources.vienna,
  },
  {
    id: 'affogato', name: '阿芙佳朵', en: 'Affogato', category: 'dessert', subcategory: 'icecream-family',
    ingredients: { icecream: 60 }, tags: ['冷热交融'], notes: '冰淇淋 · 浓缩 · 融化',
    detail: '把热浓缩浇在冰淇淋上，温差与融化让每一口都不同。本例以香草冰淇淋理解，具体产品咖啡因仍需核实。',
    compare: '它更接近一份咖啡甜品；不是把普通拿铁加冰就能得到的饮品。', source: sources.recipes,
  },
  {
    id: 'espresso-tonic', name: '浓缩汤力', en: 'Espresso Tonic', category: 'sparkling', subcategory: 'tonic-family',
    ingredients: { tonic: 150, ice: 80 }, tags: ['冷'], notes: '气泡 · 微苦 · 清爽',
    detail: '冰与汤力水中缓慢加入浓缩。汤力水带有奎宁的苦味，普通版本通常还有糖。',
    compare: '与苏打水咖啡相比，汤力水会加入自身的苦味和甜味，不只是气泡。', source: sources.tonic,
  },
  {
    id: 'coffee-soda', name: '咖啡苏打', en: 'Coffee Soda', category: 'sparkling', subcategory: 'soda-family',
    ingredients: { soda: 150, ice: 80 }, tags: ['冷'], notes: '气泡 · 清爽 · 咖啡本味',
    detail: '浓缩配无糖苏打水与冰。本例省略糖浆，让气泡与咖啡本身成为主要体验。',
    compare: '本例苏打水不含汤力水的奎宁调味。名称可能覆盖其他基底与果味版本。', source: sources.soda,
  },
].map(drink => ({ ...defaults, ...drink, ingredients: { ...drink.ingredients }, tags: drink.tags ?? [...defaults.tags] }));
