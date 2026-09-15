export const recipes = {
  scanner: {name:'反応スキャナー',parts:2,supply:1,cost:20,description:'次の探索から「未知」の中身が分かる。'},
  cargo: {name:'拡張カーゴ',parts:1,supply:2,cost:20,description:'次の探索から持ち帰り枠が3→5になる。'}
};
export const names={parts:'精密部品',supply:'補修物資',relic:'古い観測記録'};
export const prices={parts:7,supply:5,relic:18};
export function initial(){return {version:1,money:30,stock:{parts:0,supply:0,relic:0},gear:[],goal:'scanner',trip:0,seen:[],phase:'home',bag:[],distance:0,step:0,events:[]};}
export function capacity(s){return s.gear.includes('cargo')?5:3;}
export function start(s){if(s.phase!=='home')return false;s.money-=5;s.trip++;s.step=0;s.distance=0;s.bag=[];s.phase='road';s.events.push({event:'depart',trip:s.trip,goal:s.goal});return true;}
export function offers(s){
  const rows=[
    [['parts',1,.8],['supply',1,.5],['relic',1,1.3]],
    [['supply',1,.7],['parts',2,1.4],['supply',2,1]],
    [['parts',1,.6],['supply',2,1.2],['relic',1,.9]],
    [['supply',1,.6],['parts',1,.9],['parts',2,1.5]]
  ];
  const row=rows[(s.step+s.trip-1)%rows.length];
  return row.map(([type,count,km],i)=>{
    const id=`${s.trip%2}:${s.step}:${i}`;
    const old=s.seen.includes(id);
    const hidden=i===2&&!s.gear.includes('scanner');
    return {id,type,count:old?0:count,km,hidden,old,index:i,name:old?'調査済みの道':hidden?'正体不明の反応':names[type]};
  });
}
export function choose(s,index,roulette=false){
  if(s.phase!=='road'||s.step>=3)return null;
  const o=offers(s)[index];if(!o)return null;
  s.seen.push(o.id);s.distance+=o.km;s.money-=Math.ceil(o.km*2);s.step++;
  for(let n=0;n<o.count;n++)s.bag.push({type:o.type,source:o.id,bonus:false});
  // Roulette trades route control for salvage, never increases driving risk.
  if(roulette)s.money+=3;
  s.events.push({event:'choice',trip:s.trip,step:s.step,index,hidden:o.hidden,type:o.type,count:o.count,roulette});
  s.last=o;if(s.step===3)s.phase='haul';return o;
}
export function settle(s,indices){
  if(!['road','haul'].includes(s.phase))return false;
  const keep=[...new Set(indices)].filter(i=>Number.isInteger(i)&&i>=0&&i<s.bag.length);
  if(keep.length>capacity(s))return false;
  let sold=0; s.bag.forEach((item,i)=>{if(keep.includes(i))s.stock[item.type]++;else sold+=prices[item.type];});
  s.money+=sold;s.events.push({event:'return',trip:s.trip,kept:keep.map(i=>s.bag[i].type),sold});s.bag=[];s.phase='home';return true;
}
export function canBuild(s,id){const r=recipes[id];return !!r&&!s.gear.includes(id)&&s.stock.parts>=r.parts&&s.stock.supply>=r.supply&&s.money>=r.cost;}
export function build(s,id){if(s.phase!=='home'||!canBuild(s,id))return false;const r=recipes[id];s.stock.parts-=r.parts;s.stock.supply-=r.supply;s.money-=r.cost;s.gear.push(id);s.events.push({event:'build',id,trip:s.trip});return true;}
