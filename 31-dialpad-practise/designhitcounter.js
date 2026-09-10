/*
362. Design Hit Counter
Problem Description
You need to design a hit counter system that tracks the number of hits received within the past 5 minutes (300 seconds).

The system should support two main operations:

Recording hits: When a hit occurs at a specific timestamp (in seconds), the system should record it. Multiple hits can happen at the same timestamp.

Querying hit count: Given a timestamp, the system should return the total number of hits that occurred in the past 300 seconds from that timestamp. Specifically, it counts all hits in the time range [timestamp - 299, timestamp].

Key constraints and assumptions:

Timestamps are provided in seconds
Calls to the system happen in chronological order (timestamps are monotonically increasing)
Multiple hits may arrive at the same timestamp
The HitCounter class needs three methods:

HitCounter(): Initializes the hit counter system
hit(timestamp): Records a hit at the given timestamp
getHits(timestamp): Returns the count of all hits in the past 300 seconds from the given timestamp
For example, if hits occurred at timestamps 1, 2, 3, and 301, calling getHits(301) would return 1 (only the hit at timestamp 301 is within the past 300 seconds), 
while getHits(303) would still return 1 since the hit at timestamp 1 is now more than 300 seconds old.
*/

/* !! TWO READINGS OF THE SPEC ABOVE — they give different answers !!

   The description says the range is [timestamp - 299, timestamp] (SLIDING),
   but the worked example says getHits(301) == 1 (FIXED/TUMBLING). Both cannot
   hold: at ts=301 the hits at 2 and 3 are only 299 and 298 seconds old, so a
   sliding window MUST include them -> 3.

     hits at 1, 2, 3, 301:
       ts   sliding   fixed    <- the example only matches the fixed column
       301     3        1
       303     1        1

   SLIDING  = LeetCode 362. Circular buffer / running sum / queue, below.
   FIXED    = a rate-limiter style counter, see FixedWindowHitCounter at the
              bottom of this file. O(1) memory, but bursty at boundaries.
   ASK WHICH ONE IN THE INTERVIEW — it is the single best clarifying question
   here, and the two solutions barely resemble each other.
*/


// Solution
class HitCounter {
    constructor() {
        this.times  = new Array(300).fill(0);   // which second each bucket holds
        this.counts = new Array(300).fill(0);   // hits in that second
    }
    hit(timestamp) {
        const i = timestamp % 300;
        if (this.times[i] !== timestamp) {      // bucket is stale -> overwrite
            this.times[i] = timestamp;
            this.counts[i] = 1;
        } else {
            this.counts[i]++;                   // same second -> accumulate
        }
    }
    getHits(timestamp) {
        let total = 0;
        for (let i = 0; i < 300; i++) {
            if (timestamp - this.times[i] < 300) total += this.counts[i];
        }
        return total;
    }
}


/* ============================================================
   FOLLOW-UP 1: window is 3000 seconds (or 1 day = 86400)

   Why the circular-buffer solution above degrades:
     hit()     -> O(1)   (fine)
     getHits() -> O(W)   -> 3000 iterations per query, 86400 for a day.
   The scan is pure waste: we re-add 2999 buckets that did not change
   since the last call. Fix = keep a RUNNING TOTAL and only pay for
   what expires.
   ============================================================ */

// A) Circular buffer + running total. Fixed memory O(W), amortized O(1) both ops.
//    Best when hits are dense (most seconds have traffic).
class HitCounterRunningSum {
    constructor(windowSize = 3000) {
        this.W = windowSize;
        this.counts = new Array(this.W).fill(0);
        this.total = 0;
        this.lastTs = 0;                       // last timestamp we expired up to
    }

    // Drop everything that fell out of the window. Each second is expired
    // exactly once over the life of the counter -> amortized O(1).
    _expire(timestamp) {
        // `<=`, not `===`: on a backwards timestamp the loop below is skipped
        // but lastTs would still rewind, and the next forward call would then
        // re-clear seconds that are still inside the window -> undercount.
        if (timestamp <= this.lastTs) return;
        const from = Math.max(this.lastTs + 1, timestamp - this.W + 1);
        for (let t = from; t <= timestamp; t++) {
            const i = t % this.W;
            this.total -= this.counts[i];
            this.counts[i] = 0;
        }
        this.lastTs = timestamp;
    }

    hit(timestamp) {
        this._expire(timestamp);
        this.counts[timestamp % this.W]++;
        this.total++;
    }

    getHits(timestamp) {
        this._expire(timestamp);
        return this.total;
    }
}

// B) Queue of (timestamp, count) + running total. O(1) amortized,
//    memory O(distinct seconds that actually had hits) -> wins when traffic
//    is sparse or the window is huge (a day, a week).
//    Uses a head index instead of shift() to keep pops O(1).
class HitCounterQueue {
    constructor(windowSize = 3000) {
        this.W = windowSize;
        this.q = [];       // [[ts, count], ...] strictly increasing ts
        this.head = 0;
        this.total = 0;
    }

    _expire(timestamp) {
        while (this.head < this.q.length && this.q[this.head][0] <= timestamp - this.W) {
            this.total -= this.q[this.head][1];
            this.q[this.head] = null;          // let GC reclaim
            this.head++;
        }
        if (this.head > 1000 && this.head * 2 > this.q.length) {  // periodic compaction
            this.q = this.q.slice(this.head);
            this.head = 0;
        }
    }

    hit(timestamp) {
        this._expire(timestamp);
        const last = this.q[this.q.length - 1];
        if (last && last[0] === timestamp) last[1]++;
        else this.q.push([timestamp, 1]);
        this.total++;
    }

    getHits(timestamp) {
        this._expire(timestamp);
        return this.total;
    }
}

// C) Coarse buckets when an exact boundary is not required.
//    3000s window as 50s buckets -> 60x less memory, and getHits scans 61
//    slots instead of 3000. Answer OVERCOUNTS by at most one bucket (it keeps
//    the partially-expired oldest bucket). This is what real metrics systems
//    (statsd, Prometheus rate()) do.
//    NOTE: n = ceil(W/bucket) + 1, not ceil(W/bucket). With exactly 60 slots,
//    bucket 6 and bucket 0 collide mod 60 while both are still in window, and
//    a live bucket gets wiped -> undercount. The +1 slot is what prevents it.
class HitCounterApprox {
    constructor(windowSize = 3000, bucketSize = 50) {
        this.bucket = bucketSize;
        this.n = Math.ceil(windowSize / bucketSize) + 1;
        this.times = new Array(this.n).fill(-1);
        this.counts = new Array(this.n).fill(0);
        this.total = 0;
    }
    _slot(timestamp) {
        if (timestamp < 0) return -1;          // before t=0 there is nothing to recycle
        const b = Math.floor(timestamp / this.bucket);
        const i = b % this.n;
        if (this.times[i] !== b) {             // stale bucket -> recycle
            this.total -= this.counts[i];
            this.times[i] = b;
            this.counts[i] = 0;
        }
        return i;
    }
    hit(timestamp) {
        this.counts[this._slot(timestamp)]++;
        this.total++;
    }
    getHits(timestamp) {
        for (let k = 0; k < this.n; k++) this._slot(timestamp - k * this.bucket);
        return this.total;                     // O(n) = 60 instead of 3000
    }
}


/* ============================================================
   OTHER FOLLOW-UPS AN INTERVIEWER WILL ASK

   2) Concurrency: many threads/workers call hit() at once.
      - The running-total versions are NOT safe: total++ and the expire loop
        race. Options: a lock around _expire + an atomic per-bucket counter;
        or shard by writer (N counters, sum on read); or make hit() lock-free
        on counts[i] and do expiry only on the read path.

   3) Distributed: hits land on 100 servers.
      - Each server keeps a local bucket array, getHits fans out and sums;
        or push per-second buckets into Redis and use a sorted set /
        HyperLogLog. Clock skew becomes the real problem, not the data
        structure -> bucket by arrival time at a single aggregator, or accept
        a lateness watermark.

   4) Out-of-order / late timestamps (the monotonic assumption drops).
      - Circular buffer still works if the hit is inside the window: just
        index by ts % W and guard `times[i] === ts`. Anything older than the
        window is dropped. But the running-total trick breaks (you can no
        longer expire once), so either fall back to the O(W) scan, or use a
        Fenwick/BIT over the W slots -> O(log W) hit and O(log W) range query,
        and it also answers arbitrary [a, b] ranges, not just "last W".

   5) Millisecond precision / 10^6 hits per second.
      - Don't store per-hit. Two-level buckets: 1000 ms-buckets rolled up into
        second-buckets rolled up into minute-buckets (hierarchical wheel).
        Query = a few coarse buckets + partial fine buckets, O(log) levels.

   6) getHits for an arbitrary window ("last 60s AND last 3000s"), or
      percentiles/rates -> Fenwick tree, or keep several HitCounters at
      different granularities.

   7) Unbounded window / "hits ever, weighted toward recent"
      -> exponentially decaying counter: value = value * e^(-(t-last)/tau) + 1.
      O(1) memory, no buckets at all.

   8) Memory: sparse traffic + huge window (a day = 86400 slots per counter,
      times 1M users) -> the queue version (B), or coarse buckets (C), or
      count-min sketch if you need per-key counts approximately.

   COMPLEXITY SUMMARY (W = window size)
     original circular buffer : hit O(1),   getHits O(W),        mem O(W)
     A running sum            : hit O(1)*,  getHits O(1)*,       mem O(W)
     B queue + running sum    : hit O(1)*,  getHits O(1)*,       mem O(distinct secs)
     C coarse buckets         : hit O(1),   getHits O(W/bucket), mem O(W/bucket), approximate
     Fenwick (out-of-order)   : hit O(logW),getHits O(logW),     mem O(W)
     * amortized
   ============================================================ */


/* ============================================================
   FIXED / TUMBLING WINDOW — the reading the worked example describes.
   Time is chopped into blocks [0,299], [300,599], ...; the count resets
   at each block boundary rather than sliding.

   hits at 1, 2, 3, 301 -> getHits(301) == 1, getHits(303) == 1.

   Trade-off vs sliding:
     + O(1) memory and O(1) time, no array at all -- the window size could be
       3000 or 86400 and nothing changes. This is the cheapest possible answer
       to the "what if W is huge" follow-up.
     - Boundary burst: 300 hits at t=299 and 300 more at t=300 both "pass",
       so a 300/window limit admits 600 hits in 2 seconds. The standard fix is
       a SLIDING WINDOW COUNTER: blend the current block with the previous one
       weighted by how far into the block you are (see below) -- O(1) memory,
       much smoother, off by a few % in the worst case.
   ============================================================ */
class FixedWindowHitCounter {
    constructor(windowSize = 300) {
        this.W = windowSize;
        this.block = -1;                       // which block `count` belongs to
        this.count = 0;
    }
    _roll(timestamp) {
        const b = Math.floor(timestamp / this.W);
        if (b !== this.block) { this.block = b; this.count = 0; }
    }
    hit(timestamp)     { this._roll(timestamp); this.count++; }
    getHits(timestamp) { this._roll(timestamp); return this.count; }
}

// The industry middle ground: fixed-window memory, near-sliding accuracy.
// Keeps only the current and previous block counts and interpolates.
class SlidingWindowCounter {
    constructor(windowSize = 300) {
        this.W = windowSize;
        this.block = -1;
        this.curr = 0;
        this.prev = 0;
    }
    _roll(timestamp) {
        const b = Math.floor(timestamp / this.W);
        if (b === this.block) return;
        this.prev = (b === this.block + 1) ? this.curr : 0;  // gap > 1 block -> nothing carries
        this.curr = 0;
        this.block = b;
    }
    hit(timestamp) { this._roll(timestamp); this.curr++; }
    getHits(timestamp) {
        this._roll(timestamp);
        const into = (timestamp % this.W) / this.W;          // fraction into current block
        return Math.round(this.prev * (1 - into) + this.curr);
    }
}
