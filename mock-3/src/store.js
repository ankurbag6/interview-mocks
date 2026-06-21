// A simple in-memory key-value store with expiration support.
// Task 1:

/*
I want you to add a ttl (time-to-live) feature. 
The set method should accept an optional third parameter — a number of milliseconds. 

If provided, the entry should expire after that duration. 

A get on an expired entry should return null, as if it doesn't exist. Entries set without a ttl should never expire."

*/

// Task 2 
/**
 * 
 * I want you to add a cleanup() method that proactively removes all expired entries from the store in one pass — rather than waiting for them to be lazily deleted on get. 
 * 
 * It should return the number of entries it removed. Then, 
 * 
 * add a keys() method that returns an array of all keys that are currently valid (i.e., not expired). Expired keys should not appear in the result, and ideally keys() shouldn't return stale data."
 * 
 */
// Psedo-code

// Task 3

/**
 * 
 * Nice work so far. Let's go deeper. 
 * I want you to add a getOrSet(key, factory, ttl) method to TTLStore. Here's how it should work: if the key exists and hasn't expired, return the existing value.
 * 
 *  If the key doesn't exist or has expired, call the factory function to produce a new value, store it with the given ttl, and return it. 
 * The factory function is asynchronous — it returns a Promise. One more thing: if two concurrent calls come in for the same key while the factory is in-flight, only one factory call should be made.
 *  The second caller should wait for the first factory call to resolve and use that result."
 * 
 */

class TTLStore {
  constructor() {
    this.data = new Map();
    this.inFlight = new Map(); // ← add this
  }

  // Add a new optional param - ttl
  set(key, value, ttl = null) {
    const expiresAt = ttl ? Date.now() + ttl : null;
    console.log("expiresAt",expiresAt, ttl);
    this.data.set(key, { value, 
        createdAt: Date.now(), 
        expiresAt: expiresAt });
    // if ttl is expired then dlete the key
    
  }

  get(key) {
    const entry = this.data.get(key); // A get on an expired entry should return null
    // console.log( "Date.now(), entry.expiresAt ", Date.now(), entry.expiresAt, (entry.expiresAt < Date.now()));
    if (!entry) return null;
    if (entry.expiresAt !== null && Date.now() > entry.expiresAt) {
        this.data.delete(key);
        return null;
    }
    return entry.value;
  }

  has(key) {
    return this.data.has(key);
  }

  delete(key) {
    return this.data.delete(key);
  }

  get size() {
    return this.data.size;
  }

  // cleanup
    /**
     * delte Entries that have epired
     * cntOfkeysDelete = 0 
     * Scan all keys in this.data
     *      if(expired) delete key; cntOfkeysDelete++;
     *      if (entry.expiresAt !== null && Date.now() > entry.expiresAt) {
                this.data.delete(key);
                cntOfkeysDelete++;
            }
    * return cntOfkeysDelete;
    */
    cleanup() {
        let cntOfkeysDelete = 0;
         this.data.forEach((value, key) => {
            console.log(`Entry: ${key}`);
            if (value.expiresAt !== null && Date.now() > value.expiresAt) {
                this.data.delete(key);
                cntOfkeysDelete++;
            }
        });
        return cntOfkeysDelete;
    }
// keys
/**
 * validKeys = []
 * scan over the map :this.data
 *   check for notExpired
 *    if (entry.expiresAt == null ||  entry.expiresAt > Date.now()) {
            validKeys.push(entry);
      }
    return validkeys
 */
    keys() {
        let validKeys = [];

        this.data.forEach((value, key) => {
            //console.log(`${key} has the role: ${value}`);
            if (value.expiresAt == null || (value.expiresAt !== null && value.
                 expiresAt > Date.now())) {
                 console.log(`Entry: ${key} ${value.expiresAt}`);
                     validKeys.push(key);
             }
        });
        // for (const key of this.data.keys()) {
            
        //     if (this.data[key]?.expiresAt == null || (this.data[key]?.expiresAt !== null && this.data[key].
        //         expiresAt > Date.now())) {
        //         console.log(`Entry: ${key} ${this.data[key].value}`);
        //             validKeys.push(key);
        //     }
        // }
        return validKeys;
    }

    /** PSedocode */
 /**
  * getOrSet(key, factory, ttl)
  *  if(key and !expired) return the value
  *  else
  *   if(!key or expired)
  *     async factory() 
  *               ---> produces a new value
  *               ---> store in the TTLStore  with a ttl given 
  *               ---> returns Promise
  * 
  * Concurrency
  * Promise chaining : 1 call should wait for the other call
  * 
  */
    
    // async factory(key, value, ttl) {
    //     try {
    //         // store in the TTLStore  with a ttl given
    //         this.set(key, value, ttl)
    //         return new Promise((resolve, reject) => {
    //             {
    //                 setTimeout(() => resolve("Data received!"), 2000);
    //             },
    //             {

    //             }
    //         } )
    //     } catch (error) {
    //         // Catch errors (like network failures) in one place
    //         console.error("Error fetching data:", error);
    //     }
    // }
    
    // async getOrSet(key, factory, ttl) {
    //     // Part A: return existing valid entry
    //     const entry = this.data.get(key); 
    //     if (entry !== undefined && entry.expiresAt === null || Date.now() < entry.expiresAt) {
    //         return entry.value;
    //     }
    //     // Part B: if already in-flight, wait for it
    //     if (this.inFlight.has(key)) {
    //         return this.inFlight.get(key);
    //     }

    //     else 
    //         if(entry === null || (entry.expiresAt !== null && Date.now() > entry.expiresAt)) {
    //              await factory(entry, ttl);  
    //         }
    // }

    /**
     * Psedocode 
     * stats() -->
     * {
        total: 10,        // total number of entries (including expired ones not yet cleaned)
        active: 7,        // entries that are valid right now
        expired: 3,       // entries that have expired but haven't been cleaned up yet
        withTTL: 6,       // entries that were set with a TTL (expired or not)
        permanent: 4,     // entries set without a TTL (never expire)
        }
     *  total : {  size() }
        active : 
         -- > getActive()
         --> iterates over the this.data
         --> if ttl --> ttl not expired : increment the count, reurn the count
        expired : total - active

        withTTL : 
        --> iterates over the this.data
        --> if ttl -->  increment the count , return the count

        permanent: total - withTTL

     */
    stats() {
        let total = 0, active = 0, expired = 0, withTTL = 0, permanent = 0; // C
        
        total = this.size; // C
        // active = _getActive();
        // --> iterates over the this.data
        // --> if ttl --> ttl not expired : increment the count, reurn the count
        //for (const key of this.data) {
            //console.log(key, value.expiresAt)
            // Tn - O(N)
            this.data.forEach((value, key) => {
                if ((value.expiresAt === null) || 
                    (Date.now() < value.expiresAt)) {
                    active++;
                }
            
            });
       // }
        expired = total - active;

        // withTTL : 
        // --> iterates over the this.data
        // --> if ttl -->  increment the count , return the count
        //for (const key of this.data) {

            this.data.forEach((value, key) => {
            if (value.expiresAt !== null) {
                withTTL += 1;
            }
        });
        //}
        permanent = total - withTTL;

        return {
            "total": total, "active": active, "expired": expired, "withTTL": withTTL, "permanent": permanent
        };

    }

    // TIme COmplexity : O (N)
    // Space. : O(1)

}

module.exports = { TTLStore };