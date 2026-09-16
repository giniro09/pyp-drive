import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import vm from 'node:vm';
const html=readFileSync(new URL('../docs/index.html',import.meta.url),'utf8');
const start=html.indexOf('  function drawBranchReward(');
const end=html.indexOf('\n  if (settings.minimalUI)',start);
const types=[
  {type:'supply',label:'MOBILE DEPOT',name:'移動デポ',color:'#2DD4D7',asset:'assets/loot/mobile-depot.png'},
  {type:'parts',label:'SIGNAL RUNNER',name:'シグナルランナー',color:'#F6D547',asset:'assets/loot/signal-runner.png'},
  {type:'unknown',label:'ROAD RELIC',name:'ロードレリック',color:'#FF654D',asset:'assets/loot/road-relic.png'},
];
const c=vm.createContext({Math,decision:{},activeLeadTracking:null,capturedLeadKeys:new Set(),branchMults:{left:1.4},LABEL_JA:{left:'左折'},getLeadContinuationBranchId:()=> 'left',defaultBrId:null,bustProb:.1,LEAD_TYPES:types,discoveryCollection:{sets:{}},generateLeadItem:lead=>({name:'応急シール材',credits:80,effect:'帰還時の売却価値 +80G',type:lead.type})});
vm.runInContext(html.slice(start,end),c);
const b={id:'left',label:'left',angleDeg:-90,selected:true,lead:{id:'one',type:'supply',status:'available',targetDistanceM:280}};
let rendered=c.drawBranchReward(b,{text:'×1.4'});
assert.match(rendered,/assets\/loot\/mobile-depot.png/);
assert.match(rendered,/>280m</);
assert.match(rendered,/>\+80G</);
c.capturedLeadKeys.add('one');
assert.doesNotMatch(c.drawBranchReward(b,{text:'×1.4'}),/<image/);
c.activeLeadTracking={type:'parts',targetDistanceM:420,matchedDistanceM:125};
c.generateLeadItem=lead=>({name:'感覚フィン',effect:'スキャナー系クラフト素材',type:lead.type});
rendered=c.drawBranchReward(b,{text:'追跡ルート'});
assert.match(rendered,/assets\/loot\/signal-runner.png/);
assert.match(rendered,/>295m</);
assert.match(rendered,/>装備素材</);
for(const asset of ['mobile-depot','signal-runner','road-relic']) assert.ok(existsSync(new URL(`../docs/assets/loot/${asset}.png`,import.meta.url)));
console.log('PASS: encounter artwork and purpose, collected lead hidden, active trace remaining distance, local assets');
