# Coding Mock — Solutions Reference

**Candidate:** Ankur · **Language:** JavaScript · **Sessions:** June 20 – August 2026

Forty-one problems across four kinds of round. Folders are numbered `01`–`30` in the order they were run.

- **[Part I — Algorithmic problems](#part-i--algorithmic-problems-folders-13-25)** (#1–22, folders `13`–`25`). Blank-page problems. Each entry: final working solution, complexity, key lessons.
- **[Part II — Design & extend drills](#part-ii--design--extend-drills-folders-01-12-basic-js)** (#23–34, folders `01`–`12` + `basic-js`). The interviewer hands you a *working* class, you orient out loud, then extend it under follow-up questions. Some starters ship with a planted bug; a few of my extensions are still buggy or unfinished — those are called out, not hidden. See [Open TODOs](#open-todos).
- **[Part III — Later drills](#part-iii--later-drills-folders-26-29)** (#35–38, folders `26`–`29`). Recent warm-ups and a small build.
- **[Part IV — Remitly prep](#part-iv--remitly-prep-folder-30)** (#39–41, folder `30`). Payments-flavoured questions run as multi-level mocks: the spec arrives with deliberate holes, and each level adds a requirement that reshapes the data model.

---

# Part I — Algorithmic Problems (folders 13–25)

## 1. Student Course Overlaps

**Source:** [13-course-enrollment-grouping/script.js](13-course-enrollment-grouping/script.js)

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

**Source:** [14-meeting-scheduler/script.js](14-meeting-scheduler/script.js)

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

**Source:** [15-two-sum-nearby-duplicate/script.js](15-two-sum-nearby-duplicate/script.js)

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

**Source:** [15-two-sum-nearby-duplicate/script.js](15-two-sum-nearby-duplicate/script.js)

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

**Source:** [16-hashmap-two-sum/MyHashMap.js](16-hashmap-two-sum/MyHashMap.js)

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

**Source:** [16-hashmap-two-sum/TwoSum.js](16-hashmap-two-sum/TwoSum.js)

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

**Source:** [16-hashmap-two-sum/script.js](16-hashmap-two-sum/script.js)

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

**Source:** [17-subdomain-visits-first-unique/SubdomainVisit.js](17-subdomain-visits-first-unique/SubdomainVisit.js)

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

**Source:** [17-subdomain-visits-first-unique/firstUniqChar.js](17-subdomain-visits-first-unique/firstUniqChar.js) · also [20-anagrams-topk-frequent/firstUniqChar.js](20-anagrams-topk-frequent/firstUniqChar.js)

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

**Source:** [18-event-sessionization/script.js](18-event-sessionization/script.js)

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

**Source:** [19-longest-unique-lru-top-spenders/longestunique.js](19-longest-unique-lru-top-spenders/longestunique.js)

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

**Source:** [19-longest-unique-lru-top-spenders/lrucache.js](19-longest-unique-lru-top-spenders/lrucache.js)

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

**Source:** [19-longest-unique-lru-top-spenders/topspenders.js](19-longest-unique-lru-top-spenders/topspenders.js)

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

**Source:** [20-anagrams-topk-frequent/anagrams.js](20-anagrams-topk-frequent/anagrams.js)

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

**Source:** [20-anagrams-topk-frequent/groupAnagrams.js](20-anagrams-topk-frequent/groupAnagrams.js)

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

**Source:** [20-anagrams-topk-frequent/topKFrequent.js](20-anagrams-topk-frequent/topKFrequent.js)

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

**Source:** [21-two-sum-all-pairs/twosumwithscale.js](21-two-sum-all-pairs/twosumwithscale.js)

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

**Source:** [22-sse-parser/script.js](22-sse-parser/script.js)

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

## 19. Throttle

**Source:** [23-debounce/script.js](23-debounce/script.js)

> Wrap a function so it fires at most once per `wait` ms (leading edge — first call fires immediately, then a cooldown).

```javascript
function throttle(fn, wait) {
  let lastCalled = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCalled >= wait) {
      lastCalled = now;
      fn.apply(this, args);   // preserve caller's `this` + forward args
    }
  };
}
```

**Complexity:** O(1) per call.

**Key lessons:**
- **Leading-edge throttle** stores the last-fired timestamp and gates on `now - lastCalled >= wait`. `lastCalled = 0` initially makes the very first call fire (any `now >= wait`).
- **`fn.apply(this, args)`** forwards both the receiver and arguments — a plain `fn(...args)` would drop `this` when the throttled fn is used as a method.
- **Throttle vs debounce:** throttle fires on a fixed cadence *during* a burst; debounce waits for silence and fires once *after*. Debounce is the `clearTimeout`/`setTimeout` reset pattern (see the commented sketch in the same file).

---

## 20. Time-Based Key-Value Store

**Source:** [24-time-map/mapwithTimestamp.js](24-time-map/mapwithTimestamp.js)

> `set(key, value, timestamp)` and `get(key, timestamp)` returning the value with the **largest timestamp ≤ query** (or `""` if none).

```javascript
class TimeMap {
  constructor() {
    this.store = new Map();   // key -> array of [timestamp, value], appended in time order
  }

  set(key, value, timestamp) {
    if (!this.store.has(key)) this.store.set(key, []);
    this.store.get(key).push([timestamp, value]);
  }

  get(key, timestamp) {
    const entries = this.store.get(key);
    if (!entries || entries.length === 0) return "";
    let lo = 0, hi = entries.length - 1, result = "";
    while (lo <= hi) {                       // find largest ts <= timestamp
      const mid = (lo + hi) >> 1;
      if (entries[mid][0] <= timestamp) {
        result = entries[mid][1];            // candidate — search right for a closer one
        lo = mid + 1;
      } else {
        hi = mid - 1;
      }
    }
    return result;
  }
}
```

**Complexity:** `set` O(1) amortized, `get` O(log n) per key's history.

**Key lessons:**
- **Timestamps arrive monotonically**, so the per-key array is already sorted — no sorting needed, just `push` and binary-search.
- **Binary search for an upper bound:** on `entries[mid][0] <= timestamp`, record the candidate and move `lo` right; this converges on the *largest* qualifying timestamp, not just any match.
- **Return `""` for both cases** — missing key and no timestamp ≤ query — so callers get one sentinel.

---

## 21. Map / Set Warm-up Drills

**Source:** [23-debounce/hashmap.js](23-debounce/hashmap.js)

> Rapid-fire fundamentals — the building blocks the harder problems compose.

```javascript
// Frequency count
function countFreq(arr) {
  const map = new Map();
  for (const a of arr) map.set(a, (map.get(a) ?? 0) + 1);
  return map;
}

// Contains duplicate (early exit)
function hasDuplicate(arr) {
  const seen = new Set();
  for (const a of arr) {
    if (seen.has(a)) return true;
    seen.add(a);
  }
  return false;
}

// Array intersection, deduped
function intersection(a, b) {
  const set = new Set(a);
  const result = new Set();
  for (const x of b) if (set.has(x)) result.add(x);
  return [...result];
}

// Single number (all others appear twice)
function singleNumber(nums) {
  const map = new Map();
  for (const n of nums) map.set(n, (map.get(n) ?? 0) + 1);
  for (const [num, count] of map) if (count === 1) return num;
  return -1;
}
```

**Key lessons:**
- **`(map.get(k) ?? 0) + 1`** is the one accumulate idiom to internalize — it powers count/frequency in half the problems above.
- **`new Set(a)`** builds a membership index in one line; use a second Set for the result to dedup automatically (`intersection([1,2,2,1],[2,2]) → [2]`).
- **Early-exit with a Set** (`hasDuplicate`) beats sorting or nested loops — O(n) with a first-hit return.
- **`singleNumber` via counts is O(n) space**; the XOR trick (`nums.reduce((a, b) => a ^ b, 0)`) does it in O(1) space and is the expected follow-up.

---

## 22. Inventory Fulfillment Check

**Source:** [25-inventory-fulfillment/script.js](25-inventory-fulfillment/script.js)

> Given the store's inventory (SKU → units in stock) and a single order of line items `[{ sku, qty }, ...]`, return whether the whole order can be fulfilled. An unknown SKU throws; the same SKU may appear on multiple lines and its quantities aggregate.

```javascript
function canFulfill(inventory, order) {
  if (!order) return false;
  const map = new Map();                 // sku -> total qty requested across lines
  for (const listItem of order) {
    if (!inventory.has(listItem.sku)) throw new Error("Error: Invalid SKU");
    // aggregate the qty — same SKU on two lines sums
    map.set(listItem.sku, map.get(listItem.sku) ? map.get(listItem.sku) + listItem.qty : listItem.qty);
  }
  // fulfillable iff EVERY aggregated line fits its stock
  return [...map].every(([sku, qty]) => qty <= inventory.get(sku));
}
```

**Complexity:** O(L) over order line items; O(distinct SKUs) space.

**Key lessons:**
- **Aggregate first, compare second.** Two lines for the same SKU must sum *before* the stock check — otherwise `[{BREAD,2},{BREAD,2}]` passes twice against a stock of 3 when the real demand is 4. Building the demand map is the whole problem.
- **`every` is the fulfillment gate, not `some`.** The order succeeds only if *all* aggregated lines fit — return `false` on the first shortfall. A `forEach` with `return true` inside is the classic trap: the callback returns, `forEach` ignores it, and the function falls through — use `every`/`for...of` when you need to actually exit.
- **Validate membership before demand.** `inventory.has(sku)` (not `inventory.get(sku) != null`) distinguishes "SKU doesn't exist" (throw) from "SKU exists but stock is 0" (a normal `false`). Zero stock is falsy — don't let it masquerade as a missing SKU.
- **Empty order is vacuously fulfillable** — `[...emptyMap].every(...)` is `true`; a `null`/missing order returns `false`. Confirm both sentinels with the interviewer.

---

# Part II — Design & Extend Drills (folders 01–12, basic-js)

A different format from Part I: the interviewer opens with a small, *already working* class and asks you to orient — narrate what it does, spot the bug, state the complexity — before adding methods under time pressure. The skill being tested is reading unfamiliar code fast and extending it without breaking the existing contract.

---

## 23. API Client with a Concurrency Cap

**Source:** [01-api-client-concurrency/src/client.js](01-api-client-concurrency/src/client.js) · [queue.js](01-api-client-concurrency/src/queue.js) · [errors.js](01-api-client-concurrency/src/errors.js)

> Given an `ApiClient` that queues requests and runs at most `maxConcurrent` at a time, add `get(path)` and `post(path, body)` convenience wrappers.

```javascript
class ApiClient {
  async request(path, opts = {}) {
    return new Promise((resolve, reject) => {
      this.queue.enqueue({ path, opts, resolve, reject });   // park the settle fns
      this._drain();
    });
  }

  async _drain() {
    if (this.activeRequests >= this.maxConcurrent) return;   // at capacity — do nothing
    const next = this.queue.dequeue();
    if (!next) return;

    this.activeRequests++;
    try {
      next.resolve(await this._execute(next.path, next.opts));
    } catch (err) {
      next.reject(err);
    } finally {
      this.activeRequests--;
      this._drain();          // a slot freed → pull the next job
    }
  }

  get(path) {
    return this.request(path, {});
  }

  post(path, body) {
    return this.request(path, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
  }
}
```

**Complexity:** O(1) per enqueue. `dequeue` is `Array.shift()` — O(n), fine at interview scale, worth naming as the bottleneck.

**Key lessons:**
- **Stash `resolve`/`reject` in the queue entry.** That's the whole trick to making a queued job look like a plain awaited promise to the caller — the promise stays pending until the drainer settles it.
- **Drain in `finally`, not after the `try`.** A rejected request must still free its slot, or the pool leaks capacity until it deadlocks.
- **Concurrency is enforced by the *drainer*, not the enqueuer** — `request` always enqueues; only `_drain` looks at `maxConcurrent`.
- `errors.js` exports `isRetryable` (a `[408, 429, 500, 502, 503, 504]` status check) but the client never calls it — retry is the natural follow-up and the import is currently dead.

---

## 24. Orientation Drills — Find the Planted Bug

**Source:** [02-js-warmup-drills/Tier1.js](02-js-warmup-drills/Tier1.js) · [Tier2.js](02-js-warmup-drills/Tier2.js) · [Tier3.js](02-js-warmup-drills/Tier3.js)

> Three tiers of starter snippets. For each: narrate what it does, then find the bug. This is a *reading* exercise, not a writing one.

```javascript
// Tier 2 — the store. Bug: delete() doesn't delete.
class Store {
  delete(key) { this.data[key] = undefined; }   // ✗ key still present
  has(key)    { return key in this.data; }      // → true even after delete
}
// Fix: `delete this.data[key]` — the operator removes the property;
// assigning undefined leaves the key in place, and `in` sees the key, not the value.

// Tier 3 — pipe: reduce as function composition
function pipe(...fns) {
  return (input) => fns.reduce((acc, fn) => fn(acc), input);
}
// pipe(addOne, double)(3) === 8   — left-to-right, seed = input
```

**Key lessons:**
- **`in` tests key presence, not value truthiness.** `this.data[key] = undefined` is not a delete; `has()` keeps returning `true`. Same family as the `!== undefined` lesson in #5 — approached from the other side.
- **`reduce` *is* function composition.** Seed with the input, thread the accumulator through each fn. The async version (`pipeAsync`) is the same shape with `await` inside — reduce over promises with `fns.reduce((p, fn) => p.then(fn), Promise.resolve(input))`.
- **`debounce` must use `fn.apply(this, args)`**, not `fn(...args)` — same `this`-binding trap as throttle in #19.
- **Still broken in `Tier2.js`:** `advPagination` computes `totalPages = items.length * pageSize` (should be `Math.ceil(items.length / pageSize)`) and hardcodes `hasPrev = false` (should be `page > 0`). `EventEmitter.off` does `delete this.listeners[event]`, which drops *every* listener for the event rather than the one passed in — the drill explicitly asked for the single-listener removal, which is the `filter(l => l !== fn)` in #34.

---

## 25. TTL Store (Key-Value with Expiry)

**Source:** [03-kv-store-ttl/src/store.js](03-kv-store-ttl/src/store.js)

> Extend a plain `Map` wrapper with time-to-live: `set(key, value, ttl)` expires the entry after `ttl` ms, `get` on an expired entry returns `null`. Then add `cleanup()`, `keys()`, `stats()`, and a single-flight `getOrSet()`.

```javascript
class TTLStore {
  set(key, value, ttl = null) {
    const expiresAt = ttl ? Date.now() + ttl : null;   // ⚠ see gotcha below
    this.data.set(key, { value, createdAt: Date.now(), expiresAt });
  }

  get(key) {
    const entry = this.data.get(key);
    if (!entry) return null;
    if (entry.expiresAt !== null && Date.now() > entry.expiresAt) {
      this.data.delete(key);      // lazy eviction: expire on read
      return null;
    }
    return entry.value;
  }

  cleanup() {                     // eager eviction: sweep everything once
    let removed = 0;
    this.data.forEach((entry, key) => {
      if (entry.expiresAt !== null && Date.now() > entry.expiresAt) {
        this.data.delete(key);
        removed++;
      }
    });
    return removed;
  }

  keys() {                        // only *live* keys — never leak expired ones
    const valid = [];
    this.data.forEach((entry, key) => {
      if (entry.expiresAt === null || entry.expiresAt > Date.now()) valid.push(key);
    });
    return valid;
  }
}
```

**Complexity:** `set`/`get` O(1). `cleanup`/`keys`/`stats` O(n), O(1) extra space.

**Key lessons:**
- **Lazy vs eager expiry are complementary, not alternatives.** `get` evicts on read (O(1), but dead entries linger and hold memory); `cleanup()` sweeps proactively (O(n), reclaims memory). Real caches run both. Say this out loud — it's the design point the question exists to surface.
- **`expiresAt === null` means permanent.** Store the *absolute deadline* at write time, not the relative TTL — otherwise every read has to remember when the entry was written.
- **Deleting from a `Map` while `forEach`-ing it is safe** in JS (unlike some languages) — the iterator tolerates deletion of the current key.
- **Gotcha, still live in the code:** `ttl ? … : null` treats `ttl = 0` as *no TTL* — `0` is falsy, so a "expire immediately" entry becomes permanent. Use `ttl != null ? Date.now() + ttl : null`. Also `has(key)` delegates straight to `this.data.has()` and skips the expiry check, so it reports `true` for expired entries that `get()` would report as gone.
- **Single-flight `getOrSet` (unfinished — see [Open TODOs](#open-todos)):** the shape is an `inFlight` Map of key → in-progress promise. Concurrent callers for the same key find the pending promise and `return` *it* rather than invoking the factory a second time; clear the entry in a `finally`. This is the cache-stampede fix.

---

## 26. Sliding-Window Rate Limiter

**Source:** [04-rate-limiter/src/rateLimiter.js](04-rate-limiter/src/rateLimiter.js)

> `isAllowed(clientId)` allows at most `maxRequests` per rolling `windowMs`. Add `remaining()`, `reset()`, `resetAll()`, `stats()`, `prune()`.

```javascript
class RateLimiter {
  constructor(maxRequests, windowMs) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
    this.requests = new Map();   // clientId -> array of timestamps
  }

  isAllowed(clientId) {
    const now = Date.now();
    const timestamps = this.requests.get(clientId) || [];
    const recent = timestamps.filter((t) => now - t < this.windowMs);   // drop stale

    if (recent.length >= this.maxRequests) return false;

    recent.push(now);
    this.requests.set(clientId, recent);   // write back the pruned array
    return true;
  }

  remaining(clientId) {
    const now = Date.now();
    const timestamps = this.requests.get(clientId) || [];
    return this.maxRequests - timestamps.filter((t) => now - t < this.windowMs).length;
  }

  prune() {                       // evict clients with no activity in the window
    const now = Date.now();
    const inactive = [];
    this.requests.forEach((timestamps, clientId) => {
      if (timestamps.filter((t) => now - t < this.windowMs).length === 0) {
        inactive.push(clientId);
      }
    });
    for (const clientId of inactive) this.requests.delete(clientId);   // delete AFTER the walk
    return inactive.length;
  }
}
```

**Complexity:** O(k) per call, k = requests held for that client (bounded by `maxRequests` once the filter writes back). Space O(clients × maxRequests).

**Key lessons:**
- **True sliding window ≠ fixed bucket.** Filtering timestamps by `now - t < windowMs` on every call is exact; a fixed counter reset every `windowMs` lets a client fire `2 × max` across a window boundary. Name the difference — it's the point of the question.
- **The `filter` isn't just a read — write the pruned array back.** That's what stops the timestamp array growing forever.
- **Collect-then-delete when removing during iteration.** `prune` gathers IDs first, then deletes. It happens to be safe on a `Map` here, but the two-phase pattern is the habit that keeps you out of trouble generally.
- **A never-touched client is at full budget:** `remaining()` on an unknown ID returns `maxRequests`, courtesy of the `|| []` default.
- **Bugs still in the file:** `stats()` increments `activeClients++` twice (a duplicated line), double-counting every active client. `_getRecent()` does `return recent = timestamps.filter(...)` — no declaration, so it assigns an implicit global and throws in strict mode. Neither is called by `index.js`'s happy path, which is exactly why they survived.

---

## 27. Async Task Queue with Concurrency Control

**Source:** [05-async-task-queue/src/taskQueue.js](05-async-task-queue/src/taskQueue.js)

> `add(task)` returns a promise for the task's result, but at most `concurrency` tasks run at once.

```javascript
class TaskQueue {
  constructor(concurrency = 2) {
    this.concurrency = concurrency;
    this.running = 0;
    this.queue = [];
  }

  add(task) {
    return new Promise((resolve, reject) => {
      this.queue.push({ task, resolve, reject });
      this._run();
    });
  }

  async _run() {
    if (this.running >= this.concurrency || this.queue.length === 0) return;

    const { task, resolve, reject } = this.queue.shift();
    this.running++;
    try {
      resolve(await task());
    } catch (err) {
      reject(err);
    } finally {
      this.running--;
      this._run();     // free slot → immediately pull the next task
    }
  }
}
```

**Complexity:** O(1) amortized per task (`shift` is O(n) — swap in a head index or a real deque to fix).

**Key lessons:**
- **Same skeleton as #23** — park `resolve`/`reject`, gate in the runner, recurse in `finally`. Once you've seen the shape, connection-pool / job-queue / rate-limited-fetch questions are all the same problem wearing different clothes.
- **Tasks must be *thunks*** (`() => doWork()`), not promises. A promise is already running the moment it's constructed — passing `doWork()` instead of `() => doWork()` defeats the entire queue, because everything starts immediately and the concurrency cap gates nothing.
- **A task that throws must not wedge the queue.** The `finally` decrements `running` and re-drains regardless of outcome.

---

## 28. Event Bus with Unsubscribe

**Source:** [06-event-bus/src/eventBus.js](06-event-bus/src/eventBus.js)

> `subscribe(event, handler)` returns a function that removes *that* handler. `publish(event, data)` fans out to all handlers.

```javascript
class EventBus {
  constructor() {
    this.subscribers = new Map();   // event -> [handler]
  }

  subscribe(event, handler) {
    if (!this.subscribers.has(event)) this.subscribers.set(event, []);
    this.subscribers.get(event).push(handler);

    return () => {                                    // closure captures event + handler
      const handlers = this.subscribers.get(event) || [];
      const index = handlers.indexOf(handler);
      if (index > -1) handlers.splice(index, 1);      // remove exactly one
    };
  }

  publish(event, data) {
    (this.subscribers.get(event) || []).forEach((handler) => handler(data));
  }
}
```

**Complexity:** `subscribe` O(1), `unsubscribe` O(n) in handlers for that event, `publish` O(n).

**Key lessons:**
- **Returning the unsubscribe closure beats an `off(event, handler)` method.** The caller can't get the arguments wrong, and it composes — this is exactly why React's `useEffect` cleanup and `AbortController` are shaped the way they are.
- **`indexOf` + `splice(i, 1)` removes one handler**; the same handler subscribed twice keeps its second registration. Compare with `filter(h => h !== handler)` (#34), which removes *all* copies. Ask which the interviewer wants.
- **`publish` iterating the live array is a latent bug:** a handler that unsubscribes itself mid-publish `splice`s the array being iterated, and `forEach` skips the next handler. Iterate a snapshot — `[...handlers].forEach(…)` — if handlers may unsubscribe during dispatch.
- **One handler throwing kills the rest of the fan-out.** Wrap each call in try/catch if delivery must be independent.

---

## 29. LRU Cache — Read-Only Accessors

**Source:** [07-lru-cache/src/lruCache.js](07-lru-cache/src/lruCache.js) · [10-lru-cache/src/cache.js](10-lru-cache/src/cache.js)

> Same LRU as #12, but the follow-up is the interesting part: add `peek(key)` and `has(key)` that **must not** change recency order.

```javascript
class LRUCache {
  get(key) {                        // ← mutates recency
    if (!this.cache.has(key)) return null;
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);     // re-insert = promote to most-recent
    return value;
  }

  set(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);                        // refresh recency
    } else if (this.cache.size >= this.capacity) {
      this.cache.delete(this.cache.keys().next().value);   // evict LRU (first key)
    }
    this.cache.set(key, value);
  }

  peek(key) { return this.cache.get(key); }   // ← read-only: no delete/re-insert
  has(key)  { return this.cache.has(key); }   // ← read-only: Map.has never reorders
}
```

**Complexity:** O(1) for every operation.

**Key lessons:**
- **`peek` is `get` minus the promotion.** The whole exercise is noticing that the delete/re-insert pair *is* the recency update — strip it and you have a read-only accessor for free.
- **`Map.get` and `Map.has` never reorder.** Insertion order only changes on `set` of a *new* key. So `peek`/`has` are trivially safe; nothing extra to defend.
- **Evict-before-insert (`else if (size >= capacity)`) vs insert-then-trim (`size > capacity`, #12) are both correct** — but only if the existing-key branch short-circuits first. Update-at-capacity must refresh, never evict.
- **`peek` returns `undefined` for a miss while `get` returns `null`.** Inconsistent sentinels across two methods on the same class is exactly the kind of thing a reviewer catches — pick one.

---

## 30. Async Retry with Exponential Backoff

**Source:** [08-async-retry/warmup.js](08-async-retry/warmup.js)

> Retry a failing async fn up to `maxAttempts` times, backing off between tries.

```javascript
async function retry(fn, maxAttempts, delayMs = 0) {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      return await fn();                       // success → return immediately
    } catch (err) {
      if (i === maxAttempts - 1) throw err;    // last attempt → give up, rethrow
      if (delayMs > 0) {
        const delay = delayMs * Math.pow(2, i);   // 1×, 2×, 4×, 8× …
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }
}
```

**Complexity:** O(maxAttempts) calls; total wait ≈ `delayMs · (2^(maxAttempts-1) - 1)`.

**Key lessons:**
- **`return await fn()` inside the `try` is load-bearing.** Drop the `await` and the promise escapes the try block un-awaited — a rejection then propagates to the caller instead of being caught, and the retry never fires.
- **Check "is this the last attempt?" *before* sleeping**, not after — otherwise you burn a full backoff delay before rethrowing a failure you already know is terminal.
- **`delayMs * 2**i` is the backoff.** In production add *jitter* (`delay * (0.5 + Math.random())`) so a fleet of clients retrying after an outage doesn't stampede in lockstep. Mentioning jitter unprompted is the strongest signal you can send on this question.
- **Not every error deserves a retry** — a 400 will fail identically forever. Gate on `isRetryable(err)` (folder `01`'s status list: 408, 429, 5xx) and rethrow the rest immediately.

---

## 31. Priority Job Queue with Pause + Timeout

**Source:** [09-job-queue/src/jobQueue.js](09-job-queue/src/jobQueue.js)

> A serial job queue. Follow-ups: (1) `size` = jobs *waiting*; (2) priority ordering; (3) `pause()`/`resume()`; (4) per-job timeout that rejects and lets the queue continue.

```javascript
class JobQueue {
  enqueue(job, priority = 0, timeoutMs = 0) {
    this.jobs.push({ job, priority, timeoutMs });
    this.jobs.sort((a, b) => b.priority - a.priority);   // higher priority first
    if (!this.isPaused) this._process();
  }

  async _process() {
    if (this.isProcessing || this.jobs.length === 0) return;

    this.isProcessing = true;
    const entry = this.jobs.shift();          // active job leaves the array here

    try {
      if (entry.timeoutMs > 0) {
        const timeout = new Promise((_, reject) =>
          setTimeout(() => reject(new Error("TimeoutError")), entry.timeoutMs)
        );
        await Promise.race([entry.job(), timeout]);   // whichever settles first wins
      } else {
        await entry.job();
      }
    } catch (err) {
      console.error("Job failed:", err.message);      // swallow — one bad job ≠ dead queue
    } finally {
      this.isProcessing = false;
      if (!this.isPaused) this._process();
    }
  }

  get size() {
    return this.jobs.length;   // active job already shifted off → this is exactly "waiting"
  }
}
```

**Complexity:** `enqueue` O(n log n) from the re-sort. A binary heap gets it to O(log n) — the right answer if the queue is hot.

**Key lessons:**
- **`size` was a one-liner and I over-built it.** The active job is `shift`-ed off *before* processing, so `this.jobs` already contains only waiting jobs — no filter, no `isProcessing` bookkeeping. Under time pressure the instinct is to add machinery; trace the existing code first and the machinery usually turns out to be already there.
- **`Promise.race` implements the timeout, but it does not *cancel* anything.** The losing job keeps running to completion in the background — it can still mutate state, write to the DB, or resolve long after the queue moved on. That's the tradeoff the interviewer is fishing for. Real cancellation needs `AbortController` threaded into the job itself.
- **`Array.prototype.sort` is stable** (guaranteed since ES2019), so equal-priority jobs retain FIFO order for free. Say so — otherwise it looks accidental.
- **Guard the re-entrant drain on both flags.** `_process` re-invokes itself in `finally`, so `isPaused` has to be re-checked there — checking only at `enqueue` would let a paused queue keep chewing through jobs.

---

## 32. Counter with Undo + Summary

**Source:** [11-counter-with-history/src/counter.js](11-counter-with-history/src/counter.js)

> A counter that logs every op to `history`. Add `undo()` (reverse the last op) and `summary()` (read-only op tallies).

```javascript
class Counter {
  constructor(initial = 0) {
    this.initial = initial;    // kept so netChange has a baseline
    this.value = initial;
    this.history = [];
  }

  reset() {
    const prev = this.value;
    this.value = 0;
    this.history.push({ op: "reset", prev, value: 0 });   // record prev — undo needs it
    return this.value;
  }

  undo() {
    if (this.history.length === 0) return this.value;     // nothing to undo
    const last = this.history.pop();
    if (last.op === "increment") this.value -= last.amount;
    else if (last.op === "decrement") this.value += last.amount;
    else if (last.op === "reset") this.value = last.prev ?? 0;
    return this.value;
  }

  summary() {
    let totalIncrements = 0, totalDecrements = 0, totalResets = 0;
    this.history.forEach((h) => {
      if (h.op === "increment") totalIncrements++;
      else if (h.op === "decrement") totalDecrements++;
      else if (h.op === "reset") totalResets++;
    });
    return { totalIncrements, totalDecrements, totalResets,
             netChange: this.value - this.initial };
  }
}
```

**Complexity:** `undo` O(1); `summary` O(h) time, O(1) space.

**Key lessons:**
- **Undo is only possible if the op log is *reversible*.** `increment`/`decrement` carry their `amount`, so inverting is arithmetic — but `reset` destroys the old value, so it has to record `prev` at write time. Design the log entry around what undo will need, not around what looks tidy.
- **One `forEach` with three counters beats three `filter` passes.** The first draft filtered `history` three times, allocating three arrays to read three lengths. Same O(h), a third of the work, no garbage.
- **`netChange` needs `this.initial`.** A counter constructed at `10` and incremented to `15` has net change `5`, not `15` — so the constructor has to stash the baseline.
- **`summary()` must not mutate.** It's a pure read over `history`; `undo()` is the only thing that pops.

---

## 33. Budget Tracker

**Source:** [12-budget-tracker/src/budget.js](12-budget-tracker/src/budget.js)

> Track spending against a limit. Add `spendByCategory()`, `summary()` (with `byCategory` + `topCategory`), and `reset(category?)`.

```javascript
class BudgetTracker {
  spend(category, amount) {
    if (amount <= 0) throw new Error("Amount must be positive");   // validate at the door
    this.spent += amount;
    this.transactions.push({ category, amount, ts: Date.now() });
    return this.spent;
  }

  get remaining()    { return this.limit - this.spent; }
  get isOverBudget() { return this.spent > this.limit; }

  // Group-by-category, then argmax — the same Map-ranking pipeline as #13 / #16
  summary() {
    const byCategory = new Map();
    let totalSpent = 0;
    for (const { category, amount } of this.transactions) {
      totalSpent += amount;
      byCategory.set(category, (byCategory.get(category) ?? 0) + amount);
    }
    const topCategory = this.transactions.length
      ? [...byCategory].reduce((max, cur) => (cur[1] > max[1] ? cur : max))[0]
      : null;
    return { totalSpent, remaining: this.remaining,
             isOverBudget: this.isOverBudget, byCategory, topCategory };
  }
}
```

**Complexity:** `spend` O(1); `spendByCategory`/`summary` O(t) over transactions.

**Key lessons:**
- **`reduce` with no initial value throws on an empty array** — `TypeError: Reduce of empty array with no initial value`. The `topCategory` argmax hits this the moment `summary()` runs on a fresh tracker. Guard the empty case (above) or pass a seed.
- **`transactions` is the source of truth; `spent` is a derived cache.** Any mutation has to update *both* or they drift — which is precisely where `reset()` goes wrong today.
- **`.map()` for side effects is a smell.** The original `spendByCategory` used `.map()` purely to accumulate into a closure variable, allocating a throwaway array of `undefined`. Use `for…of` (or `reduce`) when you want a fold, `.map()` only when you want the mapped array.
- **Broken in the file:** `reset(category)` uses `findIndex` + `splice(index, 1)`, which removes only the **first** matching transaction, never adjusts `this.spent`, and returns `{transactions, spent}` instead of the amount removed. The spec wants: filter out *all* of the category's transactions, subtract their total from `this.spent`, and return that total. Also `summary().byCategory` returns a `Map` where the spec asked for a plain object — `Object.fromEntries(byCategory)`.

---

## 34. JS Fundamentals — Debounce, Throttle, EventEmitter

**Source:** [basic-js/promise.js](basic-js/promise.js) · [eventemitter.js](basic-js/eventemitter.js) · [script.js](basic-js/script.js)

> The primitives everything else composes from. `script.js` is an array/Map API scratchpad; the other two are the classic closure exercises.

```javascript
// Debounce — fire once after the caller goes quiet for `ms`
function debounce(fn, ms, leading = false) {
  let timer = null;
  return function (...args) {
    if (leading && !timer) fn(...args);     // leading edge: fire on the first call of a burst
    clearTimeout(timer);                    // every call resets the clock
    timer = setTimeout(() => {
      timer = null;                         // clear so the next burst can lead again
      if (!leading) fn(...args);            // trailing edge: fire after the silence
    }, ms);
  };
}

// EventEmitter — Map of event -> listeners
class EventEmitter {
  constructor() {
    this.events = new Map();
  }
  on(event, listener) {
    if (this.events.has(event)) this.events.get(event).push(listener);
    else this.events.set(event, [listener]);
  }
  off(event, listener) {
    if (!this.events.has(event)) return;
    this.events.set(event, this.events.get(event).filter((l) => l !== listener));
  }
  emit(event, ...args) {
    if (!this.events.has(event)) return;
    this.events.get(event).forEach((l) => l(...args));
  }
}
```

**Complexity:** debounce/throttle O(1) per call. `on`/`emit` O(1)/O(n); `off` O(n).

**Key lessons:**
- **Debounce vs throttle, in one line each:** debounce waits for *silence* then fires once (search-as-you-type); throttle fires on a *fixed cadence* during a burst (scroll handlers, rage-clicks). Debounce is the `clearTimeout`/`setTimeout` reset; throttle is the timestamp gate (#19).
- **`timer = null` inside the callback is what makes `leading` work.** Without it the timer handle stays truthy forever and the leading edge never fires again after the first burst.
- **The closure *is* the state.** `timer` / `lastCalled` live in the wrapper's scope — one per wrapped function, private, no instance needed. That's the whole point of the exercise.
- **`off` via `filter(l => l !== listener)` needs the same function reference.** An inline arrow passed to `on` can never be removed — you didn't keep a handle to it. Compare #28, which sidesteps this by returning the unsubscribe closure.
- **The trailing-throttle variant in `promise.js` is unfinished** (a literal `???` where the trailing call should be scheduled) — see [Open TODOs](#open-todos).

---

# Part III — Later Drills (folders 26–29)

## 35. LRU Cache — `Map` Insertion-Order Recency

**Source:** [26-lru-cache/script.js](26-lru-cache/script.js)

> Bounded-capacity in-memory cache: `get(key)` / `set(key, value)`, evict the least-recently-used entry when full. Capacity fixed at construction.

```javascript
class LRUCache {
  constructor(capacity) {
    if (capacity <= 0) throw new Error("Error: Invalid capacity");
    this.capacity = capacity;
    this.map = new Map();
  }
  get(key) {
    if (!this.map.has(key)) return undefined;
    const val = this.map.get(key);
    this.map.delete(key);          // re-insert to promote to most-recent
    this.map.set(key, val);
    return val;
  }
  set(key, val) {
    if (this.map.has(key)) {
      this.map.delete(key);
    } else if (this.map.size >= this.capacity) {
      this.map.delete(this.map.keys().next().value); // evict oldest
    }
    this.map.set(key, val);
  }
}
```

**Complexity:** O(1) `get`/`set` — `Map` delete + re-insert is amortized constant.

**Key lessons:**
- **`Map` insertion order encodes recency.** `keys().next().value` is the oldest key; `delete`-then-`set` moves a touched key to the back. No doubly-linked list needed for the interview version.
- **`has()` before `get()`** so stored falsy values (`0`, `null`, `false`) survive — the test suite checks exactly this.
- Same shape as #12 and #29; this is the from-scratch, well-tested rendition.

---

## 36. Promo Code Validator

**Source:** [27-promo-code-validator/script.js](27-promo-code-validator/script.js)

> Validate a promo-code *format* before it hits the DB: 4–12 chars, uppercase letters and digits only, must start with a letter. On failure, tell the caller *why*.

```javascript
const isDigit = (ch) => /^\d$/.test(ch);
const isUpper = (ch) => /^[A-Z]$/.test(ch);

function validatePromoCode(promo) {
  if (typeof promo !== "string" || promo === "")
    throw new Error("Error: Not a valid String");
  if (promo.length < 4 || promo.length > 12)
    throw new Error("Error: Length should be between 4-12");
  if (!isUpper(promo[0]))
    throw new Error("Error: Must start with a letter");
  for (const ch of promo)
    if (!isUpper(ch) && !isDigit(ch))
      throw new Error("Error: Only uppercase letters and digits allowed");
  return true;
}
```

**Complexity:** O(n) single scan over the code.

**Key lessons:**
- **Guard the type first.** `typeof promo !== "string"` catches `null`/`undefined` before any `.length` access throws its own opaque error.
- **Order the checks from cheapest/most-specific to broadest** (empty → length → first char → per-char) so the thrown message points at the *first* real problem.
- **Distinct error messages per rule** is the actual ask — a boolean return would fail the "tell them why" requirement.

---

## 37. Roomba Grid Simulator (React)

**Source:** [28-roomba-grid-simulator/roomba/src/roomba.js](28-roomba-grid-simulator/roomba/src/roomba.js) · [App.jsx](28-roomba-grid-simulator/roomba/src/App.jsx) · [plan](28-roomba-grid-simulator/implementation_plan.md)

> A Roomba on a 10×10 grid starts at a position facing a direction. Each click moves it one cell forward; at an edge it **turns instead of falling off**. Rotation shown via CSS transform; grid responsive.

**Core movement logic** (the interview-worthy part — kept pure and separate from React):

```javascript
const DIRECTIONS = ["up", "right", "down", "left"];       // clockwise
const DELTA = {
  up: { row: -1, col: 0 }, right: { row: 0, col: 1 },
  down: { row: 1, col: 0 }, left: { row: 0, col: -1 },
};
const rotateCW = (d) => DIRECTIONS[(DIRECTIONS.indexOf(d) + 1) % 4];

function nextMove({ position, direction }, size = 10) {
  let dir = direction;
  for (let i = 0; i < 4; i++) {                          // try up to 4 turns
    const d = DELTA[dir];
    const [r, c] = [position[0] + d.row, position[1] + d.col];
    if (r >= 0 && r < size && c >= 0 && c < size)
      return { position: [r, c], direction: dir };
    dir = rotateCW(dir);                                 // rotate clockwise
  }
  return { position: [...position], direction: dir };    // boxed in — stay put
}
```

**Key lessons:**
- **Keep the domain logic out of the component.** `roomba.js` is a pure function unit-tested on its own ([roomba.test.js](28-roomba-grid-simulator/roomba/src/roomba.test.js)); `App.jsx` only holds state and renders. This is what makes the "add a feature" follow-ups cheap.
- **The turn-at-edge rule is a bounded rotate-and-retry**, not a special-case per wall. Cap the attempts at 4 so a fully boxed-in Roomba terminates instead of spinning forever.
- **Direction as an index into a cyclic array** (`(i + 1) % 4`) makes "rotate clockwise" one line and maps straight onto the CSS `rotate()` angle.

---

## 38. Checkerboard Printer

**Source:** [29-printchecker/printChecker.js](29-printchecker/printChecker.js)

> Given `column_width`, `columns`, `row_height`, `rows`, print an `X`/`O` checkerboard where each square is `column_width × row_height` characters and the pattern alternates every block.

```javascript
function printChecker(column_width, columns, row_height, rows) {
  let res = "";
  let shouldPrintXinRow = true;
  let cntRowHt = 0;

  for (let r = 0; r < rows * row_height; r++) {
    let shouldPrintXinCol = shouldPrintXinRow;  // each line inherits the row's phase
    let cntColWd = 0;
    cntRowHt++;
    for (let c = 0; c < columns * column_width; c++) {
      res += shouldPrintXinCol ? "X" : "O";
      if (++cntColWd === column_width) { shouldPrintXinCol = !shouldPrintXinCol; cntColWd = 0; }
    }
    res += "\n";
    if (cntRowHt === row_height) { shouldPrintXinRow = !shouldPrintXinRow; cntRowHt = 0; }
  }
  return res;
}
```

**Complexity:** O(rows·row_height · columns·column_width) — one character emitted per cell.

**Key lessons:**
- **Two independent phase flags, not a 2-D grid.** A column flag flips every `column_width` chars; a row flag flips every `row_height` lines. Each new line *seeds* its column flag from the current row phase — that seeding is what produces the diagonal offset.
- **Flip on a counter, not on parity of the index.** Blocks are `column_width` wide, so `(c % column_width === 0)` at the block boundary drives the flip; index parity only works when the block is width 1.

---

# Part IV — Remitly Prep (folder 30)

Payments-domain mocks run in levels. The pattern across all three: the opening spec is deliberately underspecified, and the follow-up levels add a requirement that the *existing data model can't answer* — forcing a schema change rather than a new method.

---

## 39. Deck of Cards

**Source:** [30-remitly-questions/cards.js](30-remitly-questions/cards.js)

> Build a `Deck` class for a standard 52-card deck with a notion of Suit and Rank. It must print all its cards, shuffle itself randomly, and print again.

```javascript
const CardSuit = Object.freeze({
  CLUBS: "♣", DIAMONDS: "♦", HEARTS: "♥", SPADES: "♠",
});
const ranks = ["Ace","2","3","4","5","6","7","8","9","10","Jack","Queen","King"];

class Card {
  constructor(suit, rank) { this.suit = suit; this.rank = rank; }
}

class Deck {
  constructor() {
    this.cards = [];
    for (const suit in CardSuit) {                 // 4 suits × 13 ranks = 52
      ranks.forEach((rank) => this.cards.push(new Card(CardSuit[suit], rank)));
    }
  }

  print() {
    this.cards.forEach((c) => console.log(`${c.rank} of ${c.suit}`));
  }

  // Fisher–Yates — the correct shuffle (currently commented out in the file)
  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));       // 0..i inclusive
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }
}
```

**Complexity:** construction O(52); `shuffle` O(n) time, O(1) space, in place.

**Key lessons:**
- **`Object.freeze` for the suit enum.** Gives you a named, immutable domain vocabulary instead of magic strings — and `for...in` iterates it for the deck build.
- **Fisher–Yates is the only correct shuffle.** Walk backwards, pick `j` in `[0, i]` *inclusive*, swap. Every permutation is equally likely. Picking `j` from `[0, i)` instead is the classic off-by-one that makes some orderings impossible.
- **`sort(() => Math.random() - 0.5)` is not a shuffle** — see [Open TODOs](#open-todos). It's biased even at best, and V8's sort can behave erratically with an inconsistent comparator. Worth knowing *why* so you can reject it out loud when the interviewer offers it as a shortcut.
- **Separate `Card` from `Deck`.** Extensibility is the reason: jokers, multi-deck shoes, or a `compareTo` for poker ranking all hang off `Card` without touching `Deck`.

---

## 40. Bank Transfers to Threshold

**Source:** [30-remitly-questions/countTransfers.js](30-remitly-questions/countTransfers.js)

> Given account balances and a compliance threshold, return the **number of transfers** needed to bring every account to at least the threshold. Return `-1` if the total money in the system can't cover it.

```javascript
function countTransfers(accounts, threshold) {
  const diffs = accounts.map((a) => a - threshold);

  // Infeasibility is data, not an exception — the system is short overall
  if (diffs.reduce((s, d) => s + d, 0) < 0) return -1;

  const donors = [], needs = [];
  for (let i = 0; i < diffs.length; i++) {
    if (diffs[i] > 0) donors.push(i);        // strictly > 0 — a zero-diff account is neither
    else if (diffs[i] < 0) needs.push(i);
  }

  let d = 0, r = 0, count = 0;
  while (r < needs.length) {
    const give = Math.min(diffs[donors[d]], -diffs[needs[r]]);   // THE rule
    diffs[donors[d]] -= give;                // donor never dips below threshold
    diffs[needs[r]] += give;
    count++;
    if (diffs[donors[d]] === 0) d++;         // whoever exhausted, advances
    if (diffs[needs[r]] === 0) r++;          // both zero → both advance, ONE transfer
  }
  return count;
}
```

**Complexity:** O(n) — each transfer zeroes out at least one account, so there are at most `n − 1` of them. That bound is also the proof that this greedy is *optimal*, which is the follow-up question.

**Key lessons:**
- **Normalise to surplus/deficit first.** `a - threshold` turns "meet a floor" into "balance a ledger to zero" — after that it's the classic two-pointer settle-up.
- **`give = min(donor surplus, receiver deficit)`** is the entire algorithm. It guarantees each transfer fully drains a donor *or* fully fills a receiver (or both), which is what caps the count at `n − 1`.
- **Advance with two independent `if`s, not `if/else`.** When both hit zero on the same transfer, both pointers move and you've spent one transfer, not two. An `else if` here silently overcounts.
- **Infeasibility returns `-1`, it doesn't throw.** The prompt flags that interviewers split on this — say which you're choosing and why. "Absence of a valid answer is a normal outcome of a query, not a fault" is the defensible line.
- **Bug still in the file:** the live `countTransfers` puts zero-diff accounts in `donor` (`else donor.push(i)` instead of `else if (diffs[i] > 0)`). Each contributes a `give` of 0 — a no-op transfer that still increments `cnt`. `[100, 150, 50]` at threshold 100 returns 2 instead of 1.

---

## 41. Banking System — Three Levels

**Source:** [30-remitly-questions/bankingsystems.js](30-remitly-questions/bankingsystems.js)

> **L1:** `createAccount` / `deposit` / `transfer`, with deliberate holes in the spec.
> **L2:** `topSpenders(k)` — rank by lifetime outgoing value, ties to the smaller id.
> **L3:** every op carries a strictly-increasing `ts`; add `outgoingBetween(accountId, startTs, endTs)`.

**The holes in the L1 spec** (the actual test — the interviewer plants them and waits):

| Hole | Decision |
|---|---|
| `amount <= 0` on `transfer`/`deposit` | Reject → `null`. A zero-amount transfer is the nasty one: it's a harmless no-op for balances but pollutes the L2 leaderboard and the L3 audit log with phantom activity. |
| `fromId === toId` | Reject → `null`. Self-transfer is a balance no-op that would still inflate `totalOut`. |
| Overdraft (`balance < amount`) | Reject → `null` (given free). |
| Either account missing | Reject → `null` (given free). |

**The data-model decision at L2:** promote the Map value from a bare number to a record. `Map<id, { balance, totalOut, outgoing[] }>` — one lookup returns everything about an account, and L3 lands as a new *field* rather than a third parallel Map to keep in sync.

```javascript
transfer(fromId, toId, amount, ts) {
  if (fromId === toId || amount <= 0) return null;
  if (!this.accounts.has(fromId) || !this.accounts.has(toId)) return null;
  const src = this.accounts.get(fromId), dst = this.accounts.get(toId);
  if (src.balance < amount) return null;

  src.balance -= amount;
  dst.balance += amount;
  src.totalOut += amount;                                  // L2: one-line change

  const out = src.outgoing;                                // L3: append-only log
  const prevPrefix = out.length ? out[out.length - 1].prefix : 0;
  out.push({ ts, amount, prefix: prevPrefix + amount });    // running prefix sum
  return src.balance;
}

// L3 — two boundary searches over a prefix-summed, ts-sorted log
outgoingBetween(accountId, startTs, endTs) {
  if (!this.accounts.has(accountId) || startTs > endTs) return null;
  const out = this.accounts.get(accountId).outgoing;
  if (out.length === 0) return 0;

  // leftmost index i in [0..out.length] where pred(out[i].ts) holds
  // (may return out.length — "no such index" — which is why hi starts there)
  const firstIdx = (pred) => {
    let lo = 0, hi = out.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (pred(out[mid].ts)) hi = mid;   // candidate — keep looking left
      else lo = mid + 1;
    }
    return lo;
  };

  const first = firstIdx((ts) => ts >= startTs);   // inclusive left bound
  const last  = firstIdx((ts) => ts >  endTs) - 1; // inclusive right bound
  if (first > last) return 0;                      // empty window

  const before = first > 0 ? out[first - 1].prefix : 0;
  return out[last].prefix - before;
}
```

**Complexity:**

| Op | Cost | Note |
|---|---|---|
| `createAccount` / `deposit` / `transfer` | O(1) | prefix append is O(1) amortised |
| `topSpenders(k)` | O(n log k), O(k) space | bounded min-heap; drop the smallest once size exceeds `k` |
| `outgoingBetween` | O(log m) | m = transfers on that account |

**Key lessons:**
- **The strictly-increasing timestamp guarantee is the whole L3 gift — say it before writing code.** It means the per-account log is *already sorted* on append, so you never sort and you can binary-search it. Same insight as the TimeMap in #20.
- **Pay O(1) at write time to make reads O(log m).** Storing a running `prefix` in each log entry turns a range sum into one subtraction. Correct trade for compliance queries, which are read-heavy — but it assumes the log is **append-only**. If transfers could ever be reversed or amended out of order, every downstream prefix goes stale and you want a Fenwick tree (O(log n) update *and* query). Volunteering that caveat is the strongest signal on this question.
- **Inclusive on both ends needs two *different* predicates.** `ts >= startTs` for the left bound, `ts > endTs` (then `−1`) for the right. Using `>=` for both silently drops any transfer landing exactly on `endTs` — `outgoingBetween(1, 30, 30)` returns 0 instead of 300.
- **Binary-search the array indices, not the timestamp space.** My first attempt computed `mid = startTs + (endTs - startTs) / 2` and moved the *timestamps* toward each other. The sorted thing is the log; the timestamps are just the comparison key. `hi = out.length` (exclusive), never `length - 1`, so "no such index" is representable.
- **`first > last` is the empty-window check, not `first === last`.** Three distinct cases collapse into it: range entirely before the log, entirely after, or in a gap between transfers — all produce `last = first − 1`.
- **`0` and `null` are different answers.** `0` = "account exists, no activity in range"; `null` = "account doesn't exist, or `startTs > endTs`". Conflating them is the sentinel mistake from #29.
- **Balance order and spender order disagree** — that's why L2 can't be answered from `balance` alone. An account that received 10,000 and sent 10,000 has a balance of 0 and is your top spender. State this before choosing the data model, not after.
- **`topSpenders` — two right answers.** Interview: sort all `n` accounts, O(n log n), obviously correct in three lines. Production: a bounded min-heap of size `k`, O(n log k), because `k ≪ n` on a real leaderboard. Ties go to the *smaller* id, so the heap comparator inverts on the tiebreak (`b.id - a.id`) — the min-heap must evict the *larger* id first.

---

## Open TODOs

Genuinely unfinished or incorrect, worth a second pass:

| Where | What's wrong |
|---|---|
| [03-kv-store-ttl/src/store.js](03-kv-store-ttl/src/store.js) | `getOrSet()` is commented out — the single-flight `inFlight` promise dedupe is never implemented. `set()` treats `ttl = 0` as permanent (falsy check). `has()` skips the expiry check. |
| [04-rate-limiter/src/rateLimiter.js](04-rate-limiter/src/rateLimiter.js) | `stats()` double-counts `activeClients` (duplicated `++` line). `_getRecent()` assigns an undeclared `recent` — implicit global, throws in strict mode. |
| [12-budget-tracker/src/budget.js](12-budget-tracker/src/budget.js) | `reset(category)` removes only the first matching transaction, never adjusts `this.spent`, and returns the wrong shape. `summary()` throws on an empty tracker (`reduce` with no seed). `byCategory` returns a `Map`, not an object. |
| [02-js-warmup-drills/Tier2.js](02-js-warmup-drills/Tier2.js) | `advPagination` has the `totalPages` formula backwards and hardcodes `hasPrev = false`. `EventEmitter.off` deletes all listeners for an event instead of the one passed. |
| [basic-js/promise.js](basic-js/promise.js) | Trailing-edge `throttle` is a stub — literal `???` in the body. |
| [01-api-client-concurrency/src/client.js](01-api-client-concurrency/src/client.js) | `isRetryable` is imported but never used; retry-on-5xx is unimplemented. |
| [30-remitly-questions/cards.js](30-remitly-questions/cards.js) | `shuffle()` precomputes one `Math.random() - 0.5` and returns that same constant from the comparator — so `sort` gets a *fixed* verdict for every pair and the deck barely moves (and is wildly non-uniform when it does). The correct Fisher–Yates is sitting commented out directly above it — uncomment it. |
| [30-remitly-questions/countTransfers.js](30-remitly-questions/countTransfers.js) | Zero-diff accounts land in `donor` (`else` instead of `else if (diff > 0)`), producing no-op transfers that still increment the count. `[100, 150, 50]` at threshold 100 returns 2 instead of 1. |
| [30-remitly-questions/bankingsystems.js](30-remitly-questions/bankingsystems.js) | `_lowerBound` / `_upperBound` are dead after the refactor to the inline `firstIdx(pred)` closure — delete them. `deposit` still takes `(accountId, amount)` while `transfer` takes `ts` *last*; the L3 spec puts `ts` first on both. Inconsistent, and it would fail a literal spec check. |

---

## Recurring lessons across all 41

**From the algorithmic rounds (Part I):**

1. **Stable string keys for compound Map lookups.** Arrays and objects compare by reference.
2. **`!== undefined` for presence checks**, not truthiness — values can be `0`, `""`, `false`.
3. **Two-pass beats nested loops** when one pass builds an index and the other queries it.
4. **`for...of` over `for...in`** on arrays. Always.
5. **State complexity before coding**, not after the interviewer asks.

**From the design & extend rounds (Part II):**

6. **Trace the existing code before adding to it.** The `size` one-liner in #31 was already correct by construction — I built machinery around a problem the starter had solved. Under time pressure the reflex is to *add*; the discipline is to *read*.
7. **Queue, pool, and rate-limiter questions are one question.** Park `resolve`/`reject` in the entry, gate in the drainer, re-drain in `finally` (#23, #27, #31). Recognize the skeleton and you've already answered.
8. **`finally` is where correctness lives** in every async runner. A slot that isn't released on the error path is a deadlock waiting for one bad request.
9. **Derived state drifts.** When a cache (`spent`) shadows a source of truth (`transactions`), every mutation path has to touch both — and the one you forget is the one that ships (#33).
10. **Volunteer the tradeoff.** `Promise.race` doesn't cancel (#31); backoff without jitter stampedes (#30); lazy expiry leaks memory until you sweep (#25). Saying it first is worth more than the code.

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
| Bare `fn(...args)` drops `this` | Use `fn.apply(this, args)` in throttle/debounce wrappers |
| Monotonic timestamps are already sorted | Just `push` + binary-search; don't re-sort on every `get` |
| Linear scan for "largest ts ≤ query" is O(n) | Binary-search the upper bound — record candidate, move `lo` right |
| `obj[key] = undefined` is not `delete obj[key]` | The key stays; `key in obj` and `has()` still return `true` |
| `ttl ? Date.now() + ttl : null` | `ttl = 0` is falsy → "expire now" silently becomes "never expire" |
| `reduce` with no initial value on `[]` | Throws `TypeError` — seed it, or guard the empty case |
| `return fn()` vs `return await fn()` in a `try` | Without `await` the rejection escapes the `try` — `catch` never runs |
| `Promise.race([job, timeout])` doesn't cancel | The losing job runs to completion in the background and can still mutate state |
| Passing `doWork()` where a queue wants `() => doWork()` | A promise starts on construction — the concurrency cap gates nothing |
| `splice` during `forEach` on the same array | Skips the next element — iterate a snapshot (`[...arr]`) if handlers self-remove |
| `filter(l => l !== fn)` vs `splice(indexOf(fn), 1)` | Removes *all* copies vs exactly one — ask which the spec wants |
| `off` can't remove an inline arrow | No stable reference to compare against — keep a handle, or return an unsubscribe closure |
| `.map()` used for side effects | Allocates a throwaway array of `undefined` — use `for...of` for a fold |
| `x = value` with no declaration | Implicit global; throws in strict mode / ESM |
| `Array.prototype.sort` is stable (ES2019+) | Equal-priority items keep FIFO order for free — say so, don't leave it looking accidental |
| Exponential backoff without jitter | Every retrying client wakes at the same instant and stampedes the recovering service |