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

class HitCounter {
    constructor() {
        this.store = Map();
    }

    hit(timestamp) {
        const records = this.store.get(timestamp);
        this.store.set(timestamp, (records === undefined) ? 1 : records+1 );
    }

    getHits(timestamp) {
        // if timestamp >300
        // for()
        for (let i = 0; i < 300; i++) {
            if (timestamp - this.store.get(i) < 300) total += this.counts[i];
        }
        return total;
    }
}


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
