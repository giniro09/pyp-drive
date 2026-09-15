import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const html=readFileSync(new URL('../docs/index.html',import.meta.url),'utf8');
const script=html.match(/<script>([\s\S]*?)<\/script>/)[1];
function extract(name){const start=script.indexOf(`function ${name}(`); const end=script.indexOf('\nfunction ',start+1); return script.slice(start,end);}
const elements=new Map();
const c=vm.createContext({Math,graph:{edges:new Map([['end',{id:'end',fromNodeId:'a',toNodeId:'b',lengthM:10}]]),outgoing:new Map()},
 demoEdgeId:'end',demoFraction:0.9,demoSpeedMps:5,demoInterval:1,lastSpeedMps:5,
 document:{getElementById(id){if(!elements.has(id))elements.set(id,{});return elements.get(id);}},
 clearInterval(){},positionAlongEdge:(edge,fraction)=>({lat:fraction,lon:0,heading:0}),
 updateMinimap(){},updateBgMap(){},processPosition(){},recordTraversedEdge(){},setBadge(){},showNotice(){},
});
vm.runInContext(extract('demoTick'),c);
c.demoTick();
assert.equal(c.demoEdgeId,'end');
assert.equal(c.demoFraction,1);
assert.equal(c.demoInterval,null);
assert.equal(c.lastSpeedMps,0);
assert.equal(elements.get('speed').textContent,'0 km/h');
let rendered=false;
Object.assign(c,{mapLiveLat:null,mapLiveLon:null,mapCurrentHeading:0,currentDecision:{},currentMapMatch:{edgeId:'old'},lastMatchEdgeId:'old',matchPosition:()=>null,renderAutoMap(){rendered=true;}});
vm.runInContext(extract('processPosition'),c);
c.processPosition(35,139,90,5);
assert.equal(c.currentMapMatch,null);
assert.equal(c.lastMatchEdgeId,null);
assert.equal(c.currentDecision,null);
assert.ok(rendered);
const callback=script.match(/setTimeout\(\(\) => \{\n        \/\/ A newer GPS update[\s\S]*?\n      \}, 300\);/)[0];
let pending;
Object.assign(c,{setTimeout(fn){pending=fn;},svg:{classList:{remove(){}}},currentDecision:{nodeId:'new'},hideBgMap(){throw Error('Must not hide a recovered junction');}});
vm.runInContext(callback,c);
pending();
console.log('PASS: disconnected demo stops without teleport, lost match clears stale state and redraws, delayed hide respects recovered decision');
