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
assert.match(html, /settings\.demoMode \? Math\.min\(2, decision\.branches\.length\) : 1/);
assert.match(html, /const usedTypes = new Set\(activeLeadTracking \? \[activeLeadTracking\.type\] : \[\]\)/);
assert.match(html, /id = "discoveryToast"/);
assert.doesNotMatch(html, /小さな遠征を試す/);

console.log('PASS: encounter assets, differentiated leads, purpose reveal, collection progress, and economy rebalance');
