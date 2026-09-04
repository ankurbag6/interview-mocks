
/*2484. Count Palindromic Subsequences
Hard
Topics
premium lock icon
Companies
Hint
Given a string of digits s, return the number of palindromic subsequences of s having length 5. Since the answer may be very large, return it modulo 109 + 7.

Note:

A string is palindromic if it reads the same forward and backward.
A subsequence is a string that can be derived from another string by deleting some or no characters without changing the order of the remaining characters.
 

Example 1:

Input: s = "103301"
Output: 2
Explanation: 
There are 6 possible subsequences of length 5: "10330","10331","10301","10301","13301","03301". 
Two of them (both equal to "10301") are palindromic.
Example 2:

Input: s = "0000000"
Output: 21
Explanation: All 21 subsequences are "00000", which is palindromic.
Example 3:

Input: s = "9999900000"
Output: 2
Explanation: The only two palindromic subsequences are "99999" and "00000".
 

Constraints:

1 <= s.length <= 104
s consists of digits.
*/
/*
Both solutions in JavaScript, labeled per usual.

**The key insight first:** a length-5 palindrome is `a b m b a` — it's fully determined by the pair `(a,b)` before the middle and the mirrored pair `(b,a)` after it. The middle `m` can be anything. So instead of enumerating subsequences, count pairs.

## Brute Force — O(n⁵)

Enumerate every 5-index combination, check palindrome. Only viable for n ≲ 50, but great for verifying the smart solution.
*/

const MOD = 1_000_000_007n;

function countPalindromesBrute(s) {
  const n = s.length;
  let count = 0n;
  for (let i = 0; i < n; i++)
    for (let j = i + 1; j < n; j++)
      for (let k = j + 1; k < n; k++)
        for (let l = k + 1; l < n; l++)
          for (let m = l + 1; m < n; m++)
            // a b _ b a : positions i j k l m
            if (s[i] === s[m] && s[j] === s[l])
              count = (count + 1n) % MOD;
  return Number(count);
}
/*
- **Time:** O(n⁵) — all C(n,5) index tuples. At n = 10⁴ that's ~8×10¹⁷ — hopeless.
- **Space:** O(1).

Note the check is just `s[i]===s[m] && s[j]===s[l]` — the middle char never matters. That observation *is* the smart solution.

## Smart — O(100·n) time, O(100) space

Treat every index `k` as the **middle** of the palindrome. Then the answer is:

```
Σ over middles k, Σ over digit pairs (a,b):
    pairsBefore[a][b] × pairsAfter[b][a]
```

Maintain pair counts incrementally: a suffix structure you remove from as you sweep, a prefix structure you add to.
*/
function countPalindromes(s) {
  const MOD = 1_000_000_007;
  const n = s.length;
  const D = 10;

  // preSingle[c]  = count of digit c in prefix
  // prePair[a][b] = count of subsequence "ab" in prefix (unmodded — max C(1e4,2) ≈ 5e7, safe)
  const preSingle = new Array(D).fill(0);
  const sufSingle = new Array(D).fill(0);
  const prePair = Array.from({ length: D }, () => new Array(D).fill(0));
  const sufPair = Array.from({ length: D }, () => new Array(D).fill(0));

  // Build suffix counts over the whole string (right to left)
  for (let i = n - 1; i >= 0; i--) {
    const c = s.charCodeAt(i) - 48;
    // new pairs (c, d) formed with everything already to the right
    for (let d = 0; d < D; d++) sufPair[c][d] += sufSingle[d];
    sufSingle[c]++;
  }

  let ans = 0;
  for (let k = 0; k < n; k++) {
    const c = s.charCodeAt(k) - 48;

    // 1. Remove s[k] from the suffix (it's the middle now, not part of "ba")
    sufSingle[c]--;
    for (let d = 0; d < D; d++) sufPair[c][d] -= sufSingle[d];

    // 2. Count palindromes centered at k: prefix "ab" × suffix "ba"
    for (let a = 0; a < D; a++)
      for (let b = 0; b < D; b++)
        ans = (ans + (prePair[a][b] % MOD) * (sufPair[b][a] % MOD)) % MOD;

    // 3. Add s[k] to the prefix for future middles
    for (let d = 0; d < D; d++) prePair[d][c] += preSingle[d];
    preSingle[c]++;
  }
  return ans;
}/*

- **Time:** O(100·n) ≈ 10⁶ ops at max constraints — the 100 comes from the 10×10 digit-pair table scanned per middle position.
- **Space:** O(100) — two 10×10 tables plus two length-10 arrays, regardless of n.
- **Precision note:** pair counts stay unmodded (max ~5×10⁷), and each product `(≤1e9)×(≤1e9)` would overflow... so we mod each factor first: `(5×10⁷ mod M)` is just 5×10⁷, and 5×10⁷ × 5×10⁷ = 2.5×10¹⁵ < 2⁵³, so plain numbers are exact — no BigInt needed in the hot loop.

**Order of operations matters in the sweep:** remove from suffix *before* counting (the middle char can't also serve as the trailing `b` or `a`), add to prefix *after* counting (it can't serve as the leading pair for its own middle). Getting this order wrong double-counts index reuse — the classic bug in this problem.

Edge cases: n < 5 → loops produce 0 naturally. All-identical string ("0000000") → C(7,5) = 21 ✓. Verified logic against all three examples.

**Sanity check** (run brute vs smart on random short strings):

```javascript
for (let t = 0; t < 200; t++) {
  const s = Array.from({ length: 8 }, () => Math.floor(Math.random() * 3)).join('');
  if (countPalindromesBrute(s) !== countPalindromes(s)) throw new Error(s);
}
```

The pattern here: **fix the middle, precompute prefix/suffix counts** — same family as "Count Number of Ways to Place Houses"-style pair counting and Sum of Subarray-type sweeps where you decompose by a pivot element. Want to try the follow-up variation (length-3 palindromic subsequences with distinct outer chars) to lock the pattern in?
*/