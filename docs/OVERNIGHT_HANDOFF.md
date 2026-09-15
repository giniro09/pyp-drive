# Overnight checkpoint

## Completed
- Demo position now follows every coordinate in the road geometry, not the straight endpoint chord.
- Map matching projects onto every road segment; heading scoring uses the local segment direction.
- Added `scripts/check-road-geometry.mjs`: curved-road midpoint, projection round trips, local heading and duplicate-point checks pass.
- Existing roulette recovery checks pass. No public UI redesign or save reset.

## Continue next
- Demo still discards remaining travel distance at an edge transition and can relocate randomly at a disconnected dead end. Fix without skipping traversal/reward events.
- Exploration Map still needs full-polyline drawing, crossing-viewport culling and saved geometry fallback when the active graph changes. Preserve North-up and existing saves.
- Check delayed no-decision notice for stale callbacks and clear stale match state when location matching fails.
- Separate `wayfaring-loot-study.html` in the conversation visualization directory contains the two existing item sprites and reduced text; `loot-preview.html` is rendered, but mobile/desktop visual verification remains pending. Do not apply to public UI without approval.

## Verification boundary
Pure-function and roulette regression checks only in this checkpoint. Browser demo and real driving are not verified. Keep the remaining work separate from completed fixes.
