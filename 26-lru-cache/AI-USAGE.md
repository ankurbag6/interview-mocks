# AI Usage — Mock 26 (LRU Cache)

Tool used: Claude Code (Opus 4.8)

## What I did myself

- Wrote the problem statement and the full implementation plan (data structure choice,
  recency strategy using `Map` insertion order, eviction approach) before any AI involvement.
- Designed the class skeleton: `LRUCache` with `map` + `capacity` attributes, constructor
  with capacity validation, and method-level comments describing the exact algorithm for
  `get` and `set`.
- Tightened the constructor guard from `capacity < 0` to `capacity <= 0` after the edge
  case was pointed out.
- Ran the test file myself to verify results.

## What AI did

- Implemented the bodies of `get(key)` and `set(key, val)` strictly following my written
  plan (delete + re-insert to update recency; `map.keys().next().value` to find the LRU key).
- Ran a quick sanity check of the implementation via node.
- Flagged the `capacity === 0` edge case in the constructor guard (I applied the fix myself).
- Generated the 10 test cases at the bottom of `script.js` (basic get/set, eviction,
  recency updates via both `get` and `set`, capacity bounds, capacity 1, invalid capacity,
  falsy values).

## Prompts given

1. "Please follow my guideline and implement get and set"
2. "Can you implement test cases as well?"
