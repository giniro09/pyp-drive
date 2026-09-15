# UI recovery

The rectangular field, separate branch cards, decorative scan, and FIELD HAUL strip introduced after e6a5dc5 were rejected in user review. Restore the circular junction presentation from e6a5dc5, preserving the earlier Lead continuity fixes. No history or player data is deleted.

Roulette no longer depends on the optional dialRing element. Rejected attempts do not increment the trip roulette counter. A fast swipe within 100 m falls back to normal branch confirmation.

Validation: `node scripts/check-roulette-recovery.mjs` checks syntax, restored dial elements, roulette completion with and without ticks, repeated-use rejection, and near-junction selection fallback. Browser PIN entry passed; departure dialog automation timed out, so full browser roulette validation remains pending.

Known follow-ups:
- demoTick interpolates between edge endpoints, ignoring intermediate geometry. Investigate curved-road travel together with perpendicularDistance and Exploration Map drawing, which also use endpoints.
- A missing Decision does not mean mapping stopped. Replace ambiguous wording with a factual branch-detection status after verifying stopReason semantics.
- New visual designs must first be presented as a separate screen proposal. Preserve direction-aligned information and the tactile circular selector. Avoid decorative scanner targets, detached comparison cards, glow-heavy panels, and unsupported item benefits.
