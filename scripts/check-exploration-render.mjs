import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const html=readFileSync(new URL('../docs/index.html',import.meta.url),'utf8');
const script=html.match(/<script>([\s\S]*?)<\/script>/)[1];
new vm.Script(script);
const start=script.indexOf('function renderAutoMap()');
const end=script.indexOf('\nfunction ',start+1);
const svg={setAttribute(){},innerHTML:''}, container={style:{}}, stats={};
const edge={id:'e',fromNodeId:'a',toNodeId:'b',geometry:[[-0.02,0],[0,0.001],[0.02,0]]};
let saves=0;
const c=vm.createContext({Math,Map,Set,DEG2RAD:Math.PI/180,MAP_RADIUS_M:500,
  document:{getElementById:id=>id==='autoMapSvg'?svg:id==='autoMap'?container:stats},
  mapLiveLat:0,mapLiveLon:0,mapNodes:{a:{lat:0,lon:-0.02},b:{lat:0,lon:0.02}},
  mapEdges:[{from:'a',to:'b'}],mapVisitedEdgeIds:new Set(['e']),mapVisitedPhysicalKeys:new Set(['p']),
  graph:{edges:new Map([['e',edge]]),outgoing:new Map()},
  currentMapMatch:null,currentDecision:null,settings:{demoMode:false},
  getPhysicalEdgeKey:()=> 'p',saveAutoMap(){saves++;}
});
vm.runInContext(script.slice(start,end),c);
c.renderAutoMap();
assert.match(svg.innerHTML,/<polyline/,'Long road crossing the viewport must remain visible');
assert.match(svg.innerHTML,/0.0,-20.0/,'Intermediate geometry point must be rendered');
assert.equal(saves,1,'Legacy save is enriched once');
assert.equal(c.mapEdges[0].geometry.length,3);
c.graph={edges:new Map(),outgoing:new Map()};
c.renderAutoMap();
assert.match(svg.innerHTML,/<polyline/,'Saved road survives active graph replacement');
assert.equal(saves,1);
c.mapEdges=[{from:'a',to:'b'}];
c.renderAutoMap();
assert.match(svg.innerHTML,/<polyline/,'Legacy endpoints remain a fallback without graph');
assert.match(svg.innerHTML,/>N<\/text>/);
assert.match(svg.innerHTML,/>100m<\/text>/);
console.log('PASS: crossing-road visibility, curved geometry, legacy enrichment, graph replacement, legacy fallback, North-up scale');
