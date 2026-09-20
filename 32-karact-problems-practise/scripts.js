/**Mini-Mock 2** — same size, one notch up, Sets this time:

Xero app-store data, `[customer, app]` pairs — customers can appear multiple times:

```js
installs = [
  ["Acme", "Payroll"],
  ["Acme", "Invoicing"],
  ["Globex", "Payroll"],
  ["Globex", "Invoicing"],
  ["Initech", "Payroll"],
  ["Acme", "Payroll"]      // duplicate — count once
]
```

**Part 1:** For a given pair of customers, return the list of apps **both** have installed. `("Acme", "Globex")` → `["Payroll", "Invoicing"]`.

Clock's running.
*/
function getListofApps(customers, installs) {
    // build map --> [c, [apps..]]
    const map = new Map();
    let res = new Set();
    for(const [cust, app] of installs) {
        if(!map.has(cust)) map.set(cust, new Set());
        map.get(cust).add(app);

    }
    // find intersection between customers

    res = (map.get(customers[0]) ?? new Set()).intersection((map.get(customers[1])?? new Set()))
    return [...res];
}

function getIntersection(customers, customerMap) {
    let res = new Set();
    res = (customerMap.get(customers[0]) ?? new Set()).intersection((customerMap.get(customers[1])?? new Set()))
    return [...res];
}

let customers = ["Acme", "Globex"];
let installs = [
  ["Acme", "Payroll"],
  ["Acme", "Invoicing"],
  ["Globex", "Payroll"],
  ["Globex", "Invoicing"],
  ["Initech", "Payroll"],
  ["Acme", "Payroll"]      // duplicate — count once
];

//console.log(getListofApps(customers, installs));
// Time : O(n)
// Space : O(n)

// Part 2: return the pair of customers (across all customers) sharing the most apps
function mostSharedPair(installs) {
  // 1. build cust → Set(apps)        (you have this)
  const map = new Map();
    for(const [cust, app] of installs) {
        if(!map.has(cust)) map.set(cust, new Set());
        map.get(cust).add(app);

    }
  // 2. customers = [...map.keys()]
  const customers = [...map.keys()];
  // 3. pair loop i < j               (Gym Buddy shape)
  //      count = intersection size   (your Part 1 line)
  //      running best: strictly more → take it
  //                    tie → alphabetically earlier pair
  let maxLen = 0;
  let res = [];
  for(let i=0; i<customers.length; i++) {
    for(let j=i+1; j<customers.length; j++) {
        let sharedApps = getIntersection([customers[i], customers[j]], map);
        //console.log({sharedApps, customers1:customers[i], customers2: customers[j] })
        if(sharedApps.length > maxLen) {
            res = [customers[i], customers[j]];
            maxLen = sharedApps.length;
        } 
    }
  }
  // 4. return [bestA, bestB]
  return res;
}

// Time : O(n) + O(C2), Space : O(n)

console.log(mostSharedPair(installs));

