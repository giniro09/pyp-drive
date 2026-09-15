import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const html=readFileSync(new URL('../docs/index.html',import.meta.url),'utf8');
const script=html.match(/<script>([\s\S]*?)<\/script>/)[1];
new vm.Script(script);
function extract(name){
  const start=script.indexOf(`function ${name}(`);
  assert.ok(start>=0);
  const end=script.indexOf('\nfunction ',start+1);
  return script.slice(start,end<0?undefined:end);
}
const c=vm.createContext({Math});
vm.runInContext('const R_EARTH=6371000, DEG2RAD=Math.PI/180, RAD2DEG=180/Math.PI;\n'+['haversineM','bearingDeg','perpendicularDistance','positionAlongEdge'].map(extract).join('\n'),c);
const edge={geometry:[[0,0],[0.001,0],[0.001,0.001]],lengthM:222.39,startBearingDeg:90};
const midpoint=c.positionAlongEdge(edge,0.5);
assert.ok(Math.abs(midpoint.lon-0.001)<1e-9);
assert.ok(Math.abs(midpoint.lat)<1e-9,'Midpoint must follow the corner, not cut across it');
for(const fraction of [0,0.1,0.4,0.6,0.9,1]){
  const p=c.positionAlongEdge(edge,fraction);
  const match=c.perpendicularDistance(p.lat,p.lon,edge);
  assert.ok(match.distM<0.001);
  assert.ok(Math.abs(match.fraction-fraction)<1e-7);
}
const match=c.perpendicularDistance(0.0005,0.0011,edge);
assert.ok(Math.abs(match.lon-0.001)<1e-9);
assert.ok(Math.abs(match.fraction-0.75)<1e-7);
assert.ok(Math.abs(match.heading)<0.01,'Heading follows local northbound segment');
const degenerate={geometry:[[139,35],[139,35]],startBearingDeg:0};
assert.ok(Number.isFinite(c.positionAlongEdge(degenerate,0.5).lat));
assert.ok(Number.isFinite(c.perpendicularDistance(35,139,degenerate).fraction));
console.log('PASS: syntax, curved-road interpolation, projection round trips, local heading, degenerate segment');
