import assert from 'node:assert/strict';
import {existsSync, readFileSync} from 'node:fs';

const html = readFileSync(new URL('../docs/index.html', import.meta.url), 'utf8');

for (const asset of ['mobile-depot', 'signal-runner', 'road-relic']) {
  assert.ok(existsSync(new URL(`../docs/assets/loot/${asset}.png`, import.meta.url)), `${asset} asset missing`);
  assert.match(html, new RegExp(`assets/loot/${asset}\\.png`));
}

assert.match(html, /const DEPLOYMENT_COST = 180/);
assert.match(html, /common: 20, uncommon: 60, rare: 180, epic: 500/);
assert.match(html, /economyVersion: 2/);
assert.match(html, /currentTrip\.money \+= creditReward/);
assert.match(html, /registerDiscovery\(item\)/);
assert.match(html, /SET \$\{collection\.count\}\/\$\{collection\.target\}/);
assert.match(html, /settings\.demoMode \|\| choiceModuleActive/);
assert.match(html, /const usedTypes = new Set\(activeLeadTracking \? \[activeLeadTracking\.type\] : \[\]\)/);
assert.match(html, /id = "discoveryToast"/);
assert.doesNotMatch(html, /小さな遠征を試す/);

for (const moduleKey of ['trace-lens', 'field-rack', 'risk-dial']) {
  assert.match(html, new RegExp(`key: "${moduleKey}"`));
}
assert.match(html, /consumeModuleRecipe\(module\)/);
assert.match(html, /Cargo容量 \+2/);
assert.match(html, /applyVehicleRiskReduction/);
assert.match(html, /id="tripLoadoutGrid"/);
assert.match(html, /makeLeadKey\(decisionNodeId, physicalEdgeKey\)/);
assert.match(html, /startsWith\("lead:v2:"\)/);
assert.match(html, /Math\.floor\(tripCount \/ 3\)/);
assert.match(html, /BUILD 2026\.09\.16-6/);
assert.match(html, /if \(settings\.demoMode\) \{[\s\S]*capturedLeadKeys\.clear\(\);[\s\S]*saveLeadData\(\);/);
assert.match(html, /departTripWithMode\(true\)/);
assert.match(html, /currentTrip && currentTrip\.areaRevealShown/);
assert.match(html, /if \(currentTrip\) currentTrip\.areaRevealShown = true/);

console.log('PASS: encounter assets, differentiated leads, purpose reveal, modules, collection progress, and economy rebalance');
