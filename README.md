# Coding Mock — Solutions Reference

**Candidate:** Ankur · **Language:** JavaScript · **Session:** June 20–24, 2026

Eighteen problems across multiple mock rounds and rapid-fire drills. Each entry: final working solution, complexity, and the key lesson.

---

## 1. Student Course Overlaps

**Source:** [mock-13/script.js](mock-13/script.js)

> Given `(student_id, course_name)` enrollment pairs, return every pair of students who share at least one course, along with the list of courses they share.

```javascript
function findCourseOverlaps(enrollments) {
  // Step 1: course -> Set of students
  const courseToStudents = new Map();
  for (const [student, course] of enrollments) {
    if (!courseToStudents.has(course)) courseToStudents.set(course, new Set());
    courseToStudents.get(course).add(student);
  }

  // Step 2: pair -> shared courses (canonical sorted key)
  const pairToCourses = new Map();
  for (const [course, studentSet] of courseToStudents) {
    const students = [...studentSet];
    for (let i = 0; i < students.length; i++) {
      for (let j = i + 1; j < students.length; j++) {
        const [a, b] = [students[i], students[j]].sort();
        const key = `${a},${b}`;
        if (!pairToCourses.has(key)) pairToCourses.set(key, []);
        pairToCourses.get(key).push(course);
      }
    }
  }
  return pairToCourses;
}
```

**Complexity:** O(N) build + O(C·S²) pair gen, where C = courses, S = max roster. Space O(pairs).

**Key lesson:** Arrays as `Map` keys use **reference equality** — two arrays with identical contents are distinct keys. Always use a stable string key (e.g. sorted-then-joined) for compound keys.

---

## 2. Calendar Matching

**Source:** [mock-14/script.js](mock-14/script.js)

> Two users' busy schedules + bounds + meeting duration → return common free windows ≥ duration.

```javascript
const toMinutes = (t) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};
const toHHMM = (m) =>
  `${Math.floor(m / 60)}:${String(m % 60).padStart(2, "0")}`;

// Single-cursor walk: no "first / middle / last" special cases
function computeFree(busy, bounds) {
  const free = [];
  let cursor = bounds[0];
  for (const [start, end] of busy) {
    if (cursor < start) free.push([cursor, start]);
    cursor = Math.max(cursor, end);
  }
  if (cursor < bounds[1]) free.push([cursor, bounds[1]]);
  return free;
}

// Two-pointer interval intersection + duration filter
function findCommon(free1, free2, duration) {
  const res = [];
  let i = 0, j = 0;
  while (i < free1.length && j < free2.length) {
    const start = Math.max(free1[i][0], free2[j][0]);
    const end = Math.min(free1[i][1], free2[j][1]);
    if (end - start >= duration) res.push([start, end]);
    if (free1[i][1] < free2[j][1]) i++;   // advance the one that ends earlier
    else j++;
  }
  return res;
}
```

**Complexity:** O(N + M) where N, M are busy-interval counts.

**Key lessons:**
- **Interval intersection rule:** `[max(start), min(end)]`, valid iff `max(start) < min(end)`.
- **Two-pointer advancement:** advance whichever interval ends earlier — never both.
- **Single-cursor walks** beat three-special-case structures for "find gaps in intervals."

---

## 3. Two Sum

**Source:** [mock-15/script.js](mock-15/script.js)

> Return indices of two numbers that add up to target.

```javascript
function twoSum(nums, target) {
  const map = new Map();   // value -> index
  for (let i = 0; i < nums.length; i++) {
    const comp = target - nums[i];
    if (map.has(comp)) return [map.get(comp), i];
    map.set(nums[i], i);
  }
  return [];
}
```

**Complexity:** O(n) time, O(n) space.

**Key lesson:** Store the **complement** mapping while scanning — single pass beats two passes.

---

## 4. Contains Duplicate II

**Source:** [mock-15/script.js](mock-15/script.js)

> Return `true` if there exist distinct indices `i, j` such that `nums[i] === nums[j]` AND `|i - j| <= k`.

```javascript
function containsNearbyDuplicate(nums, k) {
  const map = new Map();   // value -> most recent index
  for (let i = 0; i < nums.length; i++) {
    if (map.has(nums[i]) && i - map.get(nums[i]) <= k) return true;
    map.set(nums[i], i);   // always update — keep most recent
  }
  return false;
}
```

**Complexity:** O(n) time, O(min(n, k)) space.

**Key lesson:** The bug from yesterday was returning on the *first* duplicate without checking k. Critical: always **update the map** regardless of the comparison result — the most recent index is what minimizes future distance.

---

## 5. Design HashMap

**Source:** [mock-16/MyHashMap.js](mock-16/MyHashMap.js)

> Implement `put`, `get`, `remove` without using built-in hash tables.

```javascript
class MyHashMap {
  constructor() {
    this.store = [];
  }
  put(key, value) {
    this.store[key] = value;
  }
  get(key) {
    return this.store[key] ?? -1;
  }
  remove(key) {
    if (this.store[key] !== undefined) {   // NOT `if (this.store[key])`
      delete this.store[key];
    }
  }
}
```

**Complexity:** O(1) per op. Space O(K) where K = key range (not insert count).

**Key lessons:**
- **`if (this.store[key])` fails for value `0`** — falsy. Use `!== undefined` for presence checks when values can be falsy.
- **`delete` vs `splice`:** use `delete` to clear an index in a sparse array. `splice` shifts indices and breaks key-as-index addressing.

---

## 6. Two Sum III — Design

**Source:** [mock-16/TwoSum.js](mock-16/TwoSum.js)

> Class with `add(num)` and `find(value)`. `find` returns true if any two added numbers sum to `value` (same number can be used twice only if added twice).

```javascript
class TwoSum {
  constructor() {
    this.nums = [];
  }
  add(num) {
    this.nums.push(num);
  }
  find(value) {
    const set = new Set();
    for (const num of this.nums) {
      if (set.has(num)) return true;   // current num matches a stored complement
      set.add(value - num);            // store the complement we'd need
    }
    return false;
  }
}
```

**Complexity:** `add` O(1), `find` O(n). Space per `find` call: O(n).

**Key lesson:** The "stored complements" pattern **naturally handles the duplicate constraint** — a value used twice triggers a hit only on the second iteration, never the first.

---

## 7. Logger Rate Limiter

**Source:** [mock-16/script.js](mock-16/script.js)

> Same message can only print once per 10 seconds.

```javascript
class Logger {
  constructor() {
    this.map = new Map();   // message -> last-printed timestamp
  }
  shouldPrintMessage(timestamp, message) {
    const storedTs = this.map.get(message);
    if (storedTs === undefined || timestamp - storedTs >= 10) {
      this.map.set(message, timestamp);
      return true;
    }
    return false;
  }
}
```

**Complexity:** O(1) per call. Space O(unique messages).

**Key lessons:**
- **Boundary is `>= 10`** (not `> 10`) — t=11 after t=1 is allowed because the gap is exactly 10.
- **Handle the first-time case explicitly** with `=== undefined`.

---

## 8. Subdomain Visit Count

**Source:** [mock-17/SubdomainVisit.js](mock-17/SubdomainVisit.js)

> Given `"count domain"` strings, return per-subdomain visit totals (a visit to `a.b.c` counts for `a.b.c`, `b.c`, and `c`).

```javascript
function subdomainVisits(domains) {
  const map = new Map();
  for (const d of domains) {
    const [countStr, domain] = d.split(" ");
    const count = Number(countStr);
    const parts = domain.split(".");
    for (let i = 0; i < parts.length; i++) {
      const sub = parts.slice(i).join(".");
      map.set(sub, (map.get(sub) ?? 0) + count);
    }
  }
  const res = [];
  for (const [sub, c] of map) res.push(`${c} ${sub}`);
  return res;
}
```

**Complexity:** O(N · L) where N = inputs, L = avg parts per domain.

**Key lessons:**
- **`slice(i).join(".")`** generates each subdomain cleanly. Beats manual concatenation loops.
- **Coerce `Number()` once at split time**, not on every accumulation.

---

## 9. First Unique Character in a String

**Source:** [mock-17/firstUniqChar.js](mock-17/firstUniqChar.js) · also [mock-20/firstUniqChar.js](mock-20/firstUniqChar.js)

> Return the index of the first non-repeating character, or `-1`.

```javascript
function firstUniqChar(str) {
  const map = new Map();
  for (const ch of str) {
    map.set(ch, (map.get(ch) ?? 0) + 1);
  }
  for (let i = 0; i < str.length; i++) {
    if (map.get(str[i]) === 1) return i;
  }
  return -1;
}
```

**Complexity:** O(n) time, O(1) space (≤ 26 entries for lowercase English).

**Key lessons:**
- **Two-pass count-then-scan** beats `indexOf`/`lastIndexOf` tricks (which are secretly O(n²)).
- **`for...in` on arrays gives string keys** (`"0"`, `"1"`, ...) — use `for...of` or classic `for (let i = 0; ...)` to get number indices.

---

## 10. Sessionize Events

**Source:** [mock-18/script.js](mock-18/script.js)

> Given time-ordered events, split them into sessions — a gap larger than the threshold between consecutive events starts a new session.

```javascript
function sessionize(events, gapThreshold) {
  if (events.length === 0) return [];
  const result = [[events[0]]];          // first event always opens session 1
  for (let i = 1; i < events.length; i++) {
    const gap = events[i].timestamp - events[i - 1].timestamp;
    if (gap > gapThreshold) {
      result.push([events[i]]);          // gap too big → start a new session
    } else {
      result[result.length - 1].push(events[i]);   // continue current session
    }
  }
  return result;
}
```

**Complexity:** O(n) time, O(n) space.

**Key lessons:**
- **Seed the result with the first event** in its own session, then loop from index 1 — avoids first/last special-casing.
- **Compare consecutive events** (`i` vs `i-1`), not against the session start — a session can drift arbitrarily far as long as each step is within threshold.
- **`> threshold`** opens a new session; a gap exactly equal to the threshold stays in the current one.

---

## 11. Longest Unique Streak

**Source:** [mock-19/longestunique.js](mock-19/longestunique.js)

> Return the length of the longest contiguous run of actions with no repeats (longest substring without repeating elements).

```javascript
function longestUniqueStreak(actions) {
  const seen = new Set();
  let left = 0, max = 0;
  for (let right = 0; right < actions.length; right++) {
    while (seen.has(actions[right])) {   // shrink until the window is unique again
      seen.delete(actions[left]);
      left++;
    }
    seen.add(actions[right]);
    max = Math.max(max, right - left + 1);
  }
  return max;
}
```

**Complexity:** O(n) time, O(n) space (window contents).

**Key lessons:**
- **Sliding window with a `Set`:** expand `right` every step; when a duplicate appears, advance `left` (deleting as you go) until the window is valid.
- **A two-pointer `p`/`q` scan that resets to `p+1` on a clash is wrong** — it rescans and skips valid windows. The window must *shrink from the left*, not restart.
- **Window length is `right - left + 1`**, measured after the window is made valid.

---

## 12. LRU Cache

**Source:** [mock-19/lrucache.js](mock-19/lrucache.js)

> `get`/`put` in O(1); evict the least-recently-used key when over capacity.

```javascript
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();   // Map preserves insertion order = recency order
  }
  get(key) {
    if (!this.cache.has(key)) return -1;
    const value = this.cache.get(key);
    this.cache.delete(key);          // re-insert to mark most-recently-used
    this.cache.set(key, value);
    return value;
  }
  put(key, value) {
    if (this.cache.has(key)) this.cache.delete(key);   // refresh recency
    this.cache.set(key, value);
    if (this.cache.size > this.capacity) {
      const lruKey = this.cache.keys().next().value;   // oldest = first key
      this.cache.delete(lruKey);                        // .delete, NOT `delete`
    }
  }
}
```

**Complexity:** O(1) per `get`/`put`. Space O(capacity).

**Key lessons:**
- **A JS `Map` keeps insertion order**, so the first key is the LRU and the last is the most recent — re-inserting (`delete` then `set`) is the whole promotion trick.
- **`put` on an existing key must delete-then-set too** — otherwise the value updates but recency doesn't, and you evict the wrong key.
- **Evict with `this.cache.delete(k)`**, not the `delete` operator. `delete map.keys()...` is a no-op that silently breaks eviction.
- **Add first, then check `size > capacity`** — handles update-at-capacity correctly without evicting the key you just touched.

---

## 13. Top Spenders

**Source:** [mock-19/topspenders.js](mock-19/topspenders.js)

> Group transactions by user, total each, and return user IDs whose total exceeds a threshold, highest first.

```javascript
function topSpenders(transactions, threshold) {
  if (!transactions) return [];
  const totals = new Map();
  for (const { userId, amount } of transactions) {
    totals.set(userId, (totals.get(userId) ?? 0) + amount);
  }
  return [...totals]
    .sort((a, b) => b[1] - a[1])      // descending by total
    .filter(([, total]) => total > threshold)
    .map(([userId]) => userId);
}
```

**Complexity:** O(n + u log u) where u = distinct users.

**Key lessons:**
- **`(totals.get(k) ?? 0) + amount`** is the clean accumulate-into-Map idiom — no `undefined` special-case.
- **Spread a Map to `[key, value]` pairs** with `[...map]`, then `sort`/`filter`/`map` as a pipeline — no need to rebuild an intermediate Map.
- **Sort comparator `b[1] - a[1]`** sorts descending by value (index 1).
- **Confirm the boundary** (`>` vs `>=` threshold) with the interviewer — it flips inclusion of exact-threshold users.

---

## 14. Valid Anagram

**Source:** [mock-20/anagrams.js](mock-20/anagrams.js)

> Return `true` if `t` is an anagram of `s`.

```javascript
function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const counts = new Map();
  for (const ch of s) counts.set(ch, (counts.get(ch) ?? 0) + 1);
  for (const ch of t) {
    const c = counts.get(ch);
    if (!c) return false;          // missing or already exhausted (0)
    counts.set(ch, c - 1);
  }
  return true;
}
```

**Complexity:** O(n) time, O(1) space (≤ alphabet size).

**Key lessons:**
- **Length check first** — unequal lengths can't be anagrams, and it lets the count pass assume a 1:1 match.
- **Count up on `s`, count down on `t`.** `if (!c)` catches both "char never seen" and "seen too many times" in one guard.

---

## 15. Group Anagrams

**Source:** [mock-20/groupAnagrams.js](mock-20/groupAnagrams.js)

> Group words that are anagrams of one another.

```javascript
function groupAnagrams(strs) {
  const groups = new Map();
  for (const word of strs) {
    const key = word.split("").sort().join("");   // canonical form
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(word);
  }
  return [...groups.values()];   // don't forget to return!
}
```

**Complexity:** O(N · L log L) — N words, L = max length (the per-word sort).

**Key lessons:**
- **Sorted letters are the canonical key** — all anagrams collapse to the same string.
- **Return `[...groups.values()]`** — building the Map isn't the answer; the grouped arrays are. (A missing `return` was the bug here.)

---

## 16. Top K Frequent Elements

**Source:** [mock-20/topKFrequent.js](mock-20/topKFrequent.js)

> Return the `k` most frequent values.

```javascript
function topKFrequent(nums, k) {
  const counts = new Map();
  for (const n of nums) counts.set(n, (counts.get(n) ?? 0) + 1);
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])   // descending by frequency
    .slice(0, k)
    .map(([num]) => num);
}
```

**Complexity:** O(n + u log u), u = distinct values. (Bucket sort gets it to O(n) if needed.)

**Key lessons:**
- **Count → spread → sort by value desc → slice k → map to keys** is the reusable Map-ranking pipeline (same shape as Top Spenders).
- **Mention bucket sort** as the O(n) follow-up: index an array by frequency (0…n) and read buckets high-to-low — avoids the sort entirely.

---

## 17. Two Sum — All Pairs (at Scale)

**Source:** [mock-21/twosumwithscale.js](mock-21/twosumwithscale.js)

> Unlike #3, return **every** index pair that sums to target, not just the first.

```javascript
function twoSumAllPairs(nums, target) {
  if (!nums || nums.length === 0) return [];
  const seen = new Map();   // value -> list of indices seen so far
  const res = [];
  for (let i = 0; i < nums.length; i++) {
    const comp = target - nums[i];
    if (seen.has(comp)) {
      for (const j of seen.get(comp)) res.push([j, i]);   // pair with each earlier index
    }
    if (!seen.has(nums[i])) seen.set(nums[i], []);
    seen.get(nums[i]).push(i);
  }
  return res;
}
```

**Complexity:** O(n + P) where P = number of pairs found (output-bound, e.g. `[3,3,3,…]`).

**Key lessons:**
- **Store a *list* of indices per value**, not one — that's what surfaces all pairs, including duplicate-value combinations like `[[0,1],[0,2],[1,2]]`.
- **Check the complement before inserting `i`** — guarantees `j < i`, so each unordered pair is emitted exactly once.
- **Scale talking points** when the output itself blows up (all-equal arrays → O(n²) pairs): bound the response size, paginate/batch, stream results, or return just a *count* if the caller doesn't need every pair.

---

## 18. SSE Stream Parser

**Source:** [mock-22/script.js](mock-22/script.js)

> Parse a Server-Sent-Events stream (e.g. an LLM token stream) fed in arbitrary chunks. Buffer across calls, emit only complete events, parse each `data:` payload, and recognize the `[DONE]` sentinel.

```javascript
class SSEParser {
  constructor() {
    this.buffer = "";
  }

  feed(chunk) {
    this.buffer += chunk;
    const events = [];
    let sep;
    while ((sep = this.buffer.indexOf("\n\n")) !== -1) {   // event boundary
      const raw = this.buffer.slice(0, sep);
      this.buffer = this.buffer.slice(sep + 2);            // keep the remainder
      events.push(this.parseEvent(raw));
    }
    return events.filter((e) => e !== null);
  }

  parseEvent(raw) {
    const dataLines = [];
    for (const line of raw.split("\n")) {
      if (line.startsWith("data:")) {
        // spec: an optional single space follows the colon
        dataLines.push(line.startsWith("data: ") ? line.slice(6) : line.slice(5));
      }
      // event:, id:, retry: ignored for now
    }
    if (dataLines.length === 0) return null;
    const data = dataLines.join("\n");          // multi-line data joins with \n

    if (data === "[DONE]") return { type: "done" };
    try {
      return { type: "data", payload: JSON.parse(data) };
    } catch (err) {
      return { type: "error", raw: data, message: err.message };
    }
  }
}
```

**Complexity:** O(n) over total bytes fed; O(buffer) space for the unterminated tail.

**Key lessons:**
- **Buffer state lives on the instance**, not the call — a chunk can split mid-event (even mid-JSON), so retain the remainder and only emit on a complete `\n\n` boundary.
- **`while (indexOf("\n\n"))`** drains *all* complete events in one chunk; slice off each and keep the leftover for next time.
- **Multi-line `data:` joins with `\n`**, and the value has an optional single leading space after the colon — handle both `slice(6)`/`slice(5)`.
- **Treat `[DONE]` as a sentinel** before `JSON.parse`, and wrap the parse in try/catch so a malformed frame becomes an error event instead of throwing.

---

## Recurring lessons across all 18

1. **Stable string keys for compound Map lookups.** Arrays and objects compare by reference.
2. **`!== undefined` for presence checks**, not truthiness — values can be `0`, `""`, `false`.
3. **Two-pass beats nested loops** when one pass builds an index and the other queries it.
4. **`for...of` over `for...in`** on arrays. Always.
5. **State complexity before coding**, not after the interviewer asks.

---

## JS gotchas seen this session

| Gotcha | Why it bites |
|---|---|
| `Array.prototype.push()` returns new length, not the array | Don't chain or pass as an argument |
| `[] === []` is `false` | Reference equality; check `arr.length` instead |
| Arrays as `Map` keys use reference equality | Two literals with same contents = different keys |
| `if (obj[key])` fails for `0`, `""`, `null` | Use `=== undefined` or `in` operator |
| `splice` shifts array indices | Use `delete` for sparse-array key removal |
| `indexOf` / `lastIndexOf` are O(n) | Don't call them inside a loop |
| `for...in` on arrays returns string keys | Use `for...of` or classic for-loop |
| `!arr` is false for empty arrays | Use `!arr || arr.length === 0` for empty guard |
| Comparing `"HH:MM"` strings sorts wrong past 9:59 | Convert to total minutes for time math |
| `delete map.keys().next().value` is a no-op | Use `map.delete(key)` — the `delete` operator only removes object properties |
| `Map` insertion order = recency | Re-insert (`delete` then `set`) to promote a key to most-recent |
| Two-pointer reset on clash rescans/skips | Sliding window must *shrink from the left*, not restart at `p+1` |
| `[...map]` yields `[key, value]` pairs | Sort/filter/map directly — no need to rebuild a Map |
| Building a Map isn't returning the answer | `return [...groups.values()]` — a missing `return` yields `undefined` |
| `map.get(i)` vs `map.get(s[i])` | Look up by the character, not the loop index |
| One index per value misses duplicate pairs | Store a *list* of indices per value to surface all pairs |