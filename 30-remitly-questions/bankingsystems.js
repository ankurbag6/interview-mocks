/*

**Level 1:**

Build a `BankingSystem` class supporting:

- `createAccount(accountId)` — registers a new account with balance 0. Returns `true`, or `false` if the account already exists.
- `deposit(accountId, amount)` — adds money. Returns the new balance, or `null` if the account doesn't exist.
- `transfer(fromId, toId, amount)` — moves money between two accounts. Returns the new balance of the *source* account, or `null` if anything about the operation isn't valid.

That's the spec as written — and as you now know from this week, specs as written have holes in them. A few of the holes in this one are deliberate. Floor's yours: clarifying questions first, then code. Clock starts now.
Data model -


class BankingSystem
- accounts: Map<id,ammount>
- constructor(): init accounts 
- createAccount(accountId): Boolean
- deposit(accountId, amount): Integer | null if no account exists
- transfer(fromId, toId, amount) : Balance of source | null if in valid

Do we need store accounts? Also do we need a method to print all the accounts --> Use map 
Do we need to think about Account of Customers ? -- NO
For transfer, you mentioned invalid operations. Can you give me some examples ?
. Two of the holes, 
free: transferring more than the source balance must fail (no overdrafts), 
and either account not existing must fail. 

But there are at least two more holes in that spec that a payments engineer should catch, and I left them in on purpose. 
Look at the parameters of transfer(fromId, toId, amount) — one hole lives in amount, 
one lives in the relationship between fromId and toId. 
Name them both, tell me your decision for each (allow? reject? and what does "reject" return, given the spec says null for invalid?), and note the same amount question applies to deposit too.

fromId, toId --> should be different, otherwise it is invalid
ammount --> amount should be positive, and should be less than equal to the amount of the source

**Level 2:**
The product team ships a leaderboard feature. 
Add:

topSpenders(k) — returns the top k accounts ranked by total outgoing transferred value (lifetime sum of amounts sent via successful transfers — deposits don't count, received money doesn't count). 
Ties broken by smaller accountId first. 
Return format: an array of accountId strings, biggest spender first. Fewer than k accounts exist → return all of them, ranked.

Notice what this does to your Level 1 code: balances alone can't answer it — an account that received 10,000 and sent 10,000 has balance 0 but is your top spender. So something has to start recording outgoing totals, and the question is what and where. 

Two designs will occur to you: bolt a second Map onto the class, or promote the account's value from a bare number to a record { balance, totalOut }. Pick one, defend it in one sentence — extensibility is the tiebreaker, and I'll hint that this interview has a Level 3 — then implement, including the one-line change inside transfer. And now say out loud why the zero-amount bug mattered: what would transfer(a, b, 0) have done to your leaderboard's correctness?

Complexity question ready before your demo: what does topSpenders(k) cost with n accounts, and is sorting everything acceptable here or do you want your heap? (There's a right answer for an interview and a right answer for production — give me both.) Clock check: you're at minute 18 of 60. Demo for Level 2: three accounts, transfers arranged so the balance order and the spender order disagree, plus a tie broken by id. Go.

Level 3 — final stage, 12 minutes on the clock. The compliance team arrives (they always do):

Every mutating operation now carries a timestamp: signatures become 
deposit(ts, accountId, amount) and 
transfer(ts, fromId, toId, amount). 
You're guaranteed timestamps are strictly increasing across all calls — say out loud what that guarantee buys you before you write anything. Then add:

outgoingBetween(accountId, startTs, endTs) — total amount this account sent via successful transfers with startTs ≤ ts ≤ endTs, inclusive. Returns the sum (0 if no activity in range), or null if the account doesn't exist or startTs > endTs.

*/
class MinHeap {
  constructor(cmp = (a, b) => a - b) {
    this.a = [];
    this.cmp = cmp;
  }

  size() {
    return this.a.length;
  }
  peek() {
    return this.a[0];
  }
  push(x) {
    this.a.push(x);
    this._up(this.a.length - 1);
  }
  pop() {
    const top = this.a[0],
      last = this.a.pop();
    if (this.a.length) {
      this.a[0] = last;
      this._down(0);
    }
    return top;
  }

  _up(i) {
    // while (i && this.cmp(this.a[i], this.a[(i-1)>>1]) < 0) {
    //   [this.a[i], this.a[(i-1)>>1]] = [this.a[(i-1)>>1], this.a[i]];
    //   i = (i-1)>>1;
    // }

    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (this.cmp(this.a[i], this.a[parent]) >= 0) break; // parent is fine
      [this.a[i], this.a[parent]] = [this.a[parent], this.a[i]];
      i = parent;
    }
  }

  _down(i) {
    const n = this.a.length;
    while (true) {
      let parent = i,
        l = 2 * i + 1,
        r = 2 * i + 2;
      if (l < n && this.cmp(this.a[l], this.a[parent]) < 0) parent = l;
      if (r < n && this.cmp(this.a[r], this.a[parent]) < 0) parent = r;
      if (parent === i) break;
      [this.a[i], this.a[parent]] = [this.a[parent], this.a[i]];
      i = parent;
    }
  }
}

class BankingSystem {
  constructor() {
    this.accounts = new Map();
  }

  //`createAccount(accountId)` — registers a new account with balance 0. Returns `true`, or `false` if the account already exists.
  createAccount(accountId) {
    if (!this.accounts.has(accountId)) {
      this.accounts.set(accountId, { balance: 0, totalOut: 0, outgoing: [] });
      return true;
    }
    return false;
  }
  //- `deposit(accountId, amount)` — adds money. Returns the new balance, or `null` if the account doesn't exist.
  deposit(accountId, amount) {
    if (this.accounts.has(accountId) && amount > 0) {
      let accountDetails = this.accounts.get(accountId);
      let newAmt = accountDetails.balance + amount;
      accountDetails.balance = newAmt;
      this.accounts.set(accountId, accountDetails);
      return newAmt;
    }
    return null;
  }

  //- `transfer(fromId, toId, amount)` — moves money between two accounts. Returns the new balance of the *source* account, or `null` if anything about the operation isn't valid.
  transfer(fromId, toId, amount, ts) {
    // validations
    // fromId and toId should exists
    // fromId != toId, amount > 0 and <amount of fromId
    if (fromId === toId || amount <= 0) return null;
    if (!this.accounts.has(fromId) || !this.accounts.has(toId)) return null;
    let sourceAccount = this.accounts.get(fromId);
    let toAccount = this.accounts.get(toId);
    if (sourceAccount.balance < amount) return null;

    // valid cases
    sourceAccount.balance -= amount;
    sourceAccount.totalOut += amount; // record out
    const out = sourceAccount.outgoing;
    const prevPrefix = out.length ? out[out.length - 1].prefix : 0;
    out.push({ ts, amount, prefix: prevPrefix + amount });
    sourceAccount.outgoing = out;
    toAccount.balance += amount;
    this.accounts.set(fromId, sourceAccount);
    this.accounts.set(toId, toAccount);
    return sourceAccount.balance;
  }
  /*

outgoingBetween(accountId, startTs, endTs) — 
total amount this account sent via successful transfers with startTs ≤ ts ≤ endTs, inclusive. 
Returns the sum (0 if no activity in range), or null if the account doesn't exist or startTs > endTs.
*/
  //

  /* Linear scan
let sum = 0;
for (const e of out) if (e.ts >= startTs && e.ts <= endTs) sum += e.amount;
return sum;
*/
  outgoingBetween(accountId, startTs, endTs) {
    if (!this.accounts.has(accountId) || startTs > endTs) return null;
    const out = this.accounts.get(accountId).outgoing;
    if (out.length === 0) return 0;

    // leftmost index i in [0..out.length] where pred(out[i].ts) is true
    // (may return out.length: "no such index" — that's why hi starts at length)
    const firstIdx = (pred) => {
      let lo = 0,
        hi = out.length;
      while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (pred(out[mid].ts)) hi = mid;
        else lo = mid + 1;
      }
      return lo;
    };

    const first = firstIdx((ts) => ts >= startTs); // first event in range
    const last = firstIdx((ts) => ts > endTs) - 1; // last event in range
    if (first > last) return 0; // empty window

    const before = first > 0 ? out[first - 1].prefix : 0;
    return out[last].prefix - before; // O(log m)
  }

  // first index i where outgoing[i].ts >= target  (== length if none)
  _lowerBound(arr, target) {
    let lo = 0,
      hi = arr.length; // hi is exclusive
    while (lo < hi) {
      const mid = lo + ((hi - lo) >> 1);
      if (arr[mid].ts >= target)
        hi = mid; // mid is a candidate, look left
      else lo = mid + 1; // mid too small, go right
    }
    return lo;
  }

  // first index i where outgoing[i].ts > target  (== length if none)
  _upperBound(arr, target) {
    let lo = 0,
      hi = arr.length;
    while (lo < hi) {
      const mid = lo + ((hi - lo) >> 1);
      if (arr[mid].ts > target) hi = mid;
      else lo = mid + 1;
    }
    return lo;
  }

  /*
    topSpenders(k) — returns the top k accounts ranked by total outgoing transferred value (lifetime sum of amounts sent via successful transfers — deposits don't count, received money doesn't count). 
    Ties broken by smaller accountId first. 
    Return format: an array of accountId strings, biggest spender first. Fewer than k accounts exist → return all of them, ranked.

    */
  topSpenders(k) {
    if (k < 1) return null;
    const res = [];
    const mh = new MinHeap((a, b) =>
      a.totalOut !== b.totalOut ? a.totalOut - b.totalOut : b.id - a.id,
    );
    // Create Heap
    for (const [id, acc] of this.accounts) {
      mh.push({ id, totalOut: acc.totalOut });
      if (mh.size() > k) mh.pop();
    }
    // Sort the Heap
    while (mh.size()) res.push(String(mh.pop().id));
    return res.reverse();
  }
}

// Test

const bs = new BankingSystem();
console.log(bs.createAccount(1));
console.log(bs.createAccount(2));
console.log(bs.createAccount(2));
console.log(bs.deposit(1, 5000));
console.log(bs.deposit(3, 5000));
console.log(bs.deposit(2, -5000));
console.log(bs.deposit(-5000));
console.log(bs.deposit(2, 100));
console.log(bs.deposit(2, 100));
console.log(bs.transfer(1, 3, 100));
console.log(bs.transfer(1, 1, 100));
console.log(bs.transfer(1, 2, -100));
console.log(bs.transfer(1, 2, 10000));
console.log(bs.transfer(1, 2, 0));
console.log(bs.transfer(1, 2, 1000));
console.log(bs.transfer(1, 2, 1000));
console.log(bs.transfer(1, 2, 1000));
console.log(bs.transfer(1, 2, 1000));
console.log(bs.transfer(1, 2, 1000));
console.log(bs.transfer(1, 2, 1000));

console.log(bs.topSpenders(2));

// Test — Level 3: outgoingBetween
// NOTE: your transfer signature is transfer(fromId, toId, amount, ts) — ts is LAST.

const bs3 = new BankingSystem();
bs3.createAccount(1);
bs3.createAccount(2);
bs3.createAccount(3);
bs3.deposit(1, 10000);

// timestamps strictly increasing
console.log(bs3.transfer(1, 2, 100, 10)); // 9900
console.log(bs3.transfer(1, 2, 200, 20)); // 9700
console.log(bs3.transfer(1, 3, 300, 30)); // 9400
console.log(bs3.transfer(1, 2, 400, 40)); // 9000
console.log(bs3.transfer(1, 3, 500, 50)); // 8500

// failed transfer must NOT be recorded in the outgoing log
console.log(bs3.transfer(1, 2, 999999, 60)); // null (insufficient funds)

// --- happy path ---
console.log(bs3.outgoingBetween(1, 10, 50)); // 1500 (full range)
console.log(bs3.outgoingBetween(1, 20, 40)); //  900 (200+300+400)
console.log(bs3.outgoingBetween(1, 25, 35)); //  300 (only ts=30)

// --- inclusive boundaries ---
console.log(bs3.outgoingBetween(1, 30, 30)); //  300 (start === end, hits a txn)
console.log(bs3.outgoingBetween(1, 10, 10)); //  100 (first txn exactly)
console.log(bs3.outgoingBetween(1, 50, 50)); //  500 (last txn exactly)
console.log(bs3.outgoingBetween(1, 11, 49)); //  900 (excludes both endpoints' txns)

// --- empty ranges (0, not null) ---
console.log(bs3.outgoingBetween(1, 0, 5)); // 0 (entirely before activity)
console.log(bs3.outgoingBetween(1, 60, 99)); // 0 (entirely after activity)
console.log(bs3.outgoingBetween(1, 31, 39)); // 0 (gap between txns)
console.log(bs3.outgoingBetween(1, 55, 70)); // 0 (failed transfer not recorded)
console.log(bs3.outgoingBetween(2, 0, 100)); // 0 (account exists, never sent)
console.log(bs3.outgoingBetween(3, 0, 100)); // 0 (only received)

// --- null cases ---
console.log(bs3.outgoingBetween(99, 0, 100)); // null (account doesn't exist)
console.log(bs3.outgoingBetween(1, 50, 10)); // null (startTs > endTs)
console.log(bs3.outgoingBetween(99, 50, 10)); // null (both invalid)

// --- sanity: balances still correct after all queries ---
console.log(bs3.outgoingBetween(1, -Infinity, Infinity)); // 1500 (== totalOut)
console.log(bs3.topSpenders(3)); // ['1', '2', '3']
