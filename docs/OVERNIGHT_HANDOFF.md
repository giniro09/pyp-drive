# Overnight checkpoint

## Completed
- Demo position now follows every coordinate in the road geometry, not the straight endpoint chord.
- Map matching projects onto every road segment; heading scoring uses the local segment direction.
- Added `scripts/check-road-geometry.mjs`: curved-road midpoint, projection round trips, local heading and duplicate-point checks pass.
- Existing roulette recovery checks pass. No public UI redesign or save reset.
- Exploration Map draws full polylines, including roads crossing the viewport with both endpoints outside. Current road is consistently highlighted.
- Traversed road geometry is saved alongside existing edge records. Legacy records are enriched when their graph is available; otherwise saved endpoint coordinates remain a display fallback. A new graph no longer removes saved road shapes.
- `scripts/check-exploration-render.mjs` passes crossing-road, curved shape, migration, graph replacement, legacy fallback and North-up/scale checks. Geometry and roulette checks also pass.
- Separate item-led dial proposal verified in the browser at desktop and 360px widths: both sprites visible, no observed label overlap, right selection updates, roulette completes and re-enables. Captured browser error log is empty. This is a mockup, not a game integration or real-drive test.

## Continue next
- Demo still discards remaining travel distance at an edge transition. This causes speed loss on short edges, not teleportation; any follow-up must preserve traversal/reward events.
- Browser-check the Exploration Map update. Older saves whose road geometry is no longer available can only show endpoint fallback until revisited; do not invent lost shape data.
- Position recovery fixed: delayed hide callback now respects a newly restored decision; failed matching clears old road match/continuity and redraws; disconnected demo endpoint stops in place with a notice, rather than selecting a random road. `check-position-recovery.mjs` reproduces and passes all three cases. Existing three regression scripts pass.
- Public browser check: PIN screen is present; PIN entry reaches TripStart. Existing test profile has -5000G. Departure raises an in-game borrowing confirmation; the browser dialog handle was unavailable and subsequent UI reads/Escape timed out. Do not repeat the same blocked automation or reset user saves. Public driving smoke test remains for manual confirmation or a restored browser session. No real-drive verification yet.
- Separate `wayfaring-loot-study.html` in the conversation visualization directory is ready for user review; `loot-preview.html` is its browser wrapper. Do not apply to public UI without approval.

## Verification boundary
Pure-function and roulette regression checks only in this checkpoint. Browser demo and real driving are not verified. Keep the remaining work separate from completed fixes.

Night run concluded after the bounded fixes and proposal were delivered. Browser validation limitation is explicit above. Further gameplay changes and applying the proposal require daytime review; do not expand the feature set to fill the overnight window.
