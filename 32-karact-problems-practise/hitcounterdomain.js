/*
**Question 1 — Easy** (target: 10 min)

Xero tracks page hits by domain. You're given a list of strings, each `"count domain"`. A visit to a subdomain also counts as a visit to every parent domain.

```js
cpdomains = [
  "9001 discuss.leetcode.com",
  "50 xero.com",
  "1 invoices.xero.com"
]
```

Return the total visit count for every domain and subdomain, in `"count domain"` format (order doesn't matter):

```js
[
  "9001 discuss.leetcode.com",
  "9001 leetcode.com",
  "9051 com",
  "51 xero.com",
  "1 invoices.xero.com"
]
```

cpdomains = ["2 mail.app.dev", "3 app.dev", "5 dev"]

// mail.app.dev → counts for mail.app.dev, app.dev, dev
// app.dev      → counts for app.dev, dev
// dev          → counts for dev

// →
[
  "2 mail.app.dev",
  "5 app.dev",    // 2 + 3
  "10 dev"        // 2 + 3 + 5
]


*/
function countDomainHits(cpdomains, k = -1) {
  /*
        maintain hit map
        [domain --> hit]

        scan -> set the count from child
        [mail.app.dev --> 2]
        [app.dev -> 2]
        [dev -> 2]

        Scan the array
         split by space
            
          split the second half by "." , 
            add to map -> sliding window from 0 to length

    */
  if (cpdomains === undefined || cpdomains.length === 0) return [];
  const res = [];
  const hitMap = new Map();
  // ["2 mail.app.dev", "3 app.dev", "5 dev"]
  for (const cpdomain of cpdomains) {
    let [cnt, domain] = cpdomain.split(" "); // 2 mail.app.dev
    let domaintree = domain.split("."); // [mail,app, dev]
    let currDomain = "";
    let r = domaintree.length;
    for (let l = 0; l < r; l++) {
      currDomain = domaintree.slice(l, r + 1).join("."); // mail.app.dev
      hitMap.set(currDomain, Number(hitMap.get(currDomain) ?? 0) + Number(cnt)); // mail.app.dev
      //console.log({currDomain, hitMap});
    }
  }
  if (k !== -1) {
    const sortedDomains = new Map(
      [...hitMap.entries()].sort((a, b) => {
        // 1. If values are different, sort by value (Ascending)
        if (b[1] !== a[1]) {
          return b[1] - a[1];
        }
        // 2. Tie-breaker: Sort alphabetically by key
        return a[0].localeCompare(b[0]);
      }),
    );
    let currCnt = 0;
    for (const [domain, cnt] of sortedDomains) {
      if (currCnt !== k) {
        res.push(`${cnt} ${domain}`);
      } else {
        break;
      }
      currCnt++;
    }
  } else {
    for (const [domain, cnt] of hitMap) {
      res.push(`${cnt} ${domain}`);
    }
  }
  return res;
}

let cpdomains = [
  "9001 discuss.leetcode.com",
  "50 xero.com",
  "1 invoices.xero.com",
];

console.log(countDomainHits(cpdomains, 2));

// Time complexity - O(n*L) where L is the length of domain
// Space complexity - O(L) where L is the length of domain

// Approch 2
// Time complexity - O(n*L)+O(nlogN) where L is the length of domain
// Space complexity - O(L+K) where L is the length of domain
