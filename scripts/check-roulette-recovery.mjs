import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const html = readFileSync(new URL('../docs/index.html', import.meta.url), 'utf8');
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
new vm.Script(script);
function extract(name) {
  const start = script.indexOf(`function ${name}(`);
  assert.ok(start >= 0);
  const end = script.indexOf('\nfunction ', start + 1);
  return script.slice(start, end < 0 ? undefined : end);
}
for (const id of ['dialRing', 'distArc', 'rouletteArc']) assert.ok(html.includes(`id="${id}"`));
for (const id of ['branchChoiceDeck', 'field-scan', 'DECISION FIELD']) assert.ok(!html.includes(id));

function scenario(showRing, distance) {
  const branches = [{ id: 'left', angleDeg: -90 }, { id: 'right', angleDeg: 90 }];
  const ring = { setAttribute() {} };
  const context = {
    currentDecision: { branches }, rouletteUsedThisJunction: false,
    displayDistanceM: distance, rouletteAnimId: null, dialFixedAngle: 0,
    rouletteWinner: null, previewBranchId: 'right', rouletteBranchId: null,
    branchMults: { left: 1.2, right: 1.3 }, lastChoiceWasRoulette: false,
    settings: { roulette: true, rouletteThresh: 200 }, NOTCH_DEG: 5,
    swipeActive: true, lastSwipeVelocity: 800, lastNotchAngle: null,
    tripCount: 0, selected: null, performance: { now: () => 0 },
    document: { getElementById: id => id === 'dialRing' && showRing ? ring : null },
    normalize180: a => ((a + 180) % 360 + 360) % 360 - 180,
    tripTrackRoulette() { context.tripCount++; },
    requestAnimationFrame(fn) { context.frame = fn; return 1; }, cancelAnimationFrame() {},
    findClosestBranch: () => branches[0], applyBranchHighlight() {},
    rerollBranchMults() {}, animateDialSnap() {}, flashConfirmRoad() {},
    showRouletteMultOverlay() {}, chooseBranch(id) { context.selected = id; },
    setTimeout() {},
  };
  vm.createContext(context);
  vm.runInContext(extract('startRoulette') + '\n' + extract('onSwipeEnd'), context);
  return context;
}
for (const showRing of [true, false]) {
  const c = scenario(showRing, 400);
  assert.equal(c.startRoulette(800), true);
  c.frame(5000);
  assert.equal(c.rouletteUsedThisJunction, true);
  assert.ok(['left', 'right'].includes(c.selected));
  assert.equal(c.tripCount, 1);
  assert.equal(c.startRoulette(800), false);
}
const near = scenario(true, 99);
near.onSwipeEnd();
assert.equal(near.tripCount, 0, 'Rejected roulette must not count as played');
assert.equal(near.selected, 'right', 'Near-junction flick must still confirm the chosen branch');
console.log('PASS: syntax, restored dial, roulette with/without ticks, result selection, repeat guard, near-junction fallback');
