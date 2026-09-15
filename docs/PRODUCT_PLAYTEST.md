# Product experiment: small expedition

## Hypothesis, not a claim of fun
An explicit desired upgrade should change which branch the player wants. A recovered item should explain its purpose immediately, and a built upgrade should change the next trip's information or carrying decision.

## Playable slice
`playtest.html` is a separate, clearly labelled fictional-route experiment. No GPS, no real driving, no migration/reset of game saves. Three forks, optional early return, cargo selection, sale of leftovers, and two craftable permanent upgrades. Existing two illustrations reused; no new asset generation.

- Scanner: two parts + one supply + 20G; reveals otherwise unknown outcomes next trip.
- Cargo: one part + two supplies + 20G; carry capacity 3 → 5.
- Route costs are shown before choice. Roulette relinquishes route control for 3G salvage. Debt does not block exploration.
- Collected locations do not refill. The finite trial alternates two route sets; this is not a production world generator.

## Validation
`scripts/check-product-loop.mjs`: either upgrade reachable in first expedition, scanner changes second-trip information, cargo capacity, selection limits, no repeated collection, soft debt and roulette accounting.
Browser: selected three routes, kept two parts and one supply, sold leftovers, built scanner. Visual inspection of directional layout completed. This establishes functionality, not enjoyment.

## Questions that determine the next implementation
1. Can the player state what they want before selecting a direction, without extra explanation?
2. At which fork did they hesitate, and why? A repeated obvious recipe route is a failure, not success.
3. Does building the device make them want another trip? Does scanner merely remove all uncertainty and flatten choice?
4. Do illustrated finds feel desirable, or like generic currencies?

Local choice events and optional feedback can be copied deliberately by the player; nothing is transmitted automatically. Assess actual responses before adding more content, combat, or upgrade trees.

## Known limitations
The authored three-fork scenario can become a shopping list. No sustained discovery narrative, real-world exploration connection, vehicle travel feel, or driving-safe interaction validation yet. This is deliberately a small test of the missing loop, not a finished redesign of the full game. Existing live dial integration is not declared repaired by this experiment.
