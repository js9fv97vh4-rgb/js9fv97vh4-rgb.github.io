// Each stage is an action, not an elapsed animation. Time is compressed for teaching.
const s = (title, action, hint, control = null) => ({ title, action, hint, control });
export const processingSteps = {
 natural:[s('挑选成熟果实','留下成熟红果','成熟度与挑选是起点；不是把所有果实一起晒。'),s('摊开、翻晒','翻动晒床','整颗咖啡果仍在，翻动让干燥更均匀。','turn'),s('整果干燥','确认干燥完成','动画展示的是压缩后的教学时间；真实干燥通常需要多日，并以水分管理判断终点。','time'),s('脱壳','去除干果壳与羊皮层','干燥完成后才脱壳，留下生豆。')],
 washed:[s('去果皮果肉','启动去皮','留下果胶、羊皮层和种子。'),s('发酵去胶与清洗','完成去胶并清洗','通过发酵配合清洗去除果胶；也有机械去胶工艺。','time'),s('带羊皮层干燥','完成带壳干燥','此时羊皮层还在，果胶已经去除。','time'),s('脱壳','脱去羊皮层','干燥稳定后脱壳，得到生豆。')],
 honey:[s('去皮','去掉果皮果肉','种子外仍包着黏黏的果胶。'),s('观察保留的果胶','确认果胶层','蜜指果胶，没有添加蜂蜜；保留量不是甜度评分。','inspect'),s('翻动并干燥','完成翻晒与干燥','带果胶干燥，需要管理摊铺、翻动与干燥速度。','time'),s('脱壳','去除干燥外层','去掉干燥果胶残留与羊皮层，得到生豆。')],
 'wet-hulled':[s('去皮去胶','完成去皮去胶','先去除果皮、果肉与果胶。'),s('部分干燥','结束初步干燥','含水仍较高，尚未达到最终储存状态。','time'),s('提前脱羊皮层','湿态脱壳','记住时机：还没有充分干燥，就脱去羊皮层。'),s('继续干燥','完成后续干燥','裸露种子继续干燥，再分级与储存。','time')]
};
export const brewDefaults = {
 'pour-over':{dose:15,water:250,output:210,outputUnit:'g',grind:45,time:150,temp:94},
 'french-press':{dose:20,water:400,output:340,outputUnit:'g',grind:80,time:240,temp:94},
 moka:{dose:15,water:150,output:110,outputUnit:'g',grind:40,time:180,temp:90},
 aeropress:{dose:17,water:200,output:165,outputUnit:'g',grind:50,time:60,temp:85},
 'cold-brew':{dose:50,water:600,output:500,outputUnit:'ml',grind:85,time:720,temp:5},
 espresso:{dose:18,water:0,output:36,outputUnit:'g',grind:15,time:28,temp:93}
};
export const brewingSteps = {
 'pour-over':[s('放滤纸','润湿滤纸，倒掉预热水','滤纸贴合滤杯，准备一个干净的接液杯。'),s('加入咖啡粉','加入称好的咖啡粉','轻摇铺平粉床，不压粉。'),s('闷蒸','打湿粉层，完成闷蒸','少量注水使粉层湿润，示例等待约30秒。','time'),s('移动水壶注水','完成绕圈注水','观察水壶绕小圈均匀注水，避免直接冲刷滤纸。','pour'),s('等待滴滤','完成滴滤并移开滤杯','研磨较细通常增加流动阻力；实际时间受豆子和器具影响。','time')],
 'french-press':[s('加入咖啡粉','加入粗研磨粉','金属滤网保留更多油脂，也可能留下少量细粉。'),s('注水','注水并浸湿粉层','按选定的粉水量注水，使咖啡粉充分浸湿。','pour'),s('等待浸泡','完成浸泡','此处将真实约4分钟压缩成时间动画。','time'),s('下压滤网','缓慢下压','轻缓下压，遇阻不要用猛力。','press'),s('倒出','将咖啡倒入杯中','及时倒出，避免在壶中继续浸泡。')],
 moka:[s('下壶加水','加水至安全阀下方','只能加到安全阀下方；这里将最高水位限制在阀下。','level'),s('松填粉槽','填满并刮平','以实际粉槽容量为准，不压粉。'),s('组装','拧紧上下壶','检查密封圈和通道，保持安全阀畅通。'),s('调节火力','开始中小火加热','火焰不超过底座，避免大火。','heat'),s('观察出液','停止加热并倒出','出液接近结束时停止；冷却后再拆洗。','time')],
 aeropress:[s('装滤纸','装好滤纸与滤盖','正置放在坚固杯子上，确认稳固。'),s('加粉、注水','加粉后注水','Original 官方示例加至刻度4；数字水量是本工作台的调整示例。','pour'),s('搅拌','轻轻搅拌','短暂搅匀，再插入活塞少许形成密封。','turn'),s('等待','完成等待','官方示例等待60秒；时间动画仅用于教学。','time'),s('下压','平稳压出咖啡','不要用猛力，器具保持稳定。','press')],
 'cold-brew':[s('加粉','装入粗研磨咖啡粉','家用起点50克粉，搭配600毫升水。'),s('加水','注水使粉层湿润','使用洁净器具与饮用水。','pour'),s('冷藏浸泡','完成冷藏浸泡','实际需要数小时；本例12小时，遵循器具清洁与冷藏说明。','time'),s('过滤','取出滤网，分离粉液','粉渣被留下，得到咖啡液。'),s('饮用稀释','确认饮用稀释量','可按口味加水或奶；加水不会去掉原有咖啡因。','dilute')],
 espresso:[s('称粉','确认粉量','匹配粉碗容量；18克是本例起点。'),s('调研磨','磨成咖啡粉','意式使用细研磨；更细通常增加流动阻力。','grind'),s('布粉压粉','布粉后水平压粉','均匀分布、水平压粉，不靠蛮力。','press'),s('启动萃取','启动水泵','电子秤开始计量出液，接下来由你停止。'),s('停止萃取','停止水泵','设定目标重量，观察出液并自动停止；重量不是体积。','yield')]
};
export const processLayers = (id,step) => {
 if(step>=4)return ['种子（生豆）'];
 if(id==='natural')return ['果皮','果肉','果胶','羊皮层','种子'];
 if(step===0)return ['果皮','果肉','果胶','羊皮层','种子'];
 if(id==='honey')return ['果胶','羊皮层','种子'];
 if(id==='wet-hulled'&&step>=3)return ['种子'];
 return step===1&&id==='washed'?['果胶','羊皮层','种子']:['羊皮层','种子'];
};
export function newWorkshop(kind,method){return {kind,method,step:0,progress:0,params:{...(brewDefaults[method]||{})},done:false,cutaway:true};}
export function advanceWorkshop(state,steps){if(state.step>=steps.length)return state;return {...state,step:state.step+1,progress:0,done:state.step+1===steps.length};}
