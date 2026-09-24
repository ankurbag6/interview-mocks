/*
Good instinct — athletes warm up. 5 minutes, three reps, all pointed at exactly what today's problem needs. From memory, no docs, one file, **run it, paste code + output together.**

**Rep 1 — Count occurrences.** Given `["a", "b", "a", "c", "b", "a"]`, build a count map → `{ a: 3, b: 2, c: 1 }`. Use a plain object or a `Map`, your pick — but be ready to say why you picked it.

**Rep 2 — Filter objects by a property.** Given

```javascript
const users = [
  { name: "Ana", active: true },
  { name: "Raj", active: false },
  { name: "Li",  active: true }
];
```

return only the active users' **names** → `["Ana", "Li"]`. One line.

**Rep 3 — Two-pass thinking.** Given `[3, 1, 3, 2, 1, 3]`, return the values that appear exactly once → `[2]`. Use Rep 1's count map as pass 1, then a filter as pass 2.

Rep 3 *is* today's problem in miniature — numbers instead of records. If it feels easy, good: that's the point of a warmup.

Go. Paste when done, then we roll straight into the mock.
*/

// Rep 1 
// Using Map
function getCount(chars) {
    if(!chars) return null;
    const countMap = new Map();
    for(const ch of chars) {
        countMap.set(ch, (countMap.get(ch) ?? 0 ) + 1)
    }
    return countMap;
}
console.log(getCount(["a", "b", "a", "c", "b", "a"]))
console.log(getCount())
// Output
/*
Map(3) { 'a' => 3, 'b' => 2, 'c' => 1 }
null
*/

// Rep 2 — Filter objects by a property. Given
function getUsersByactiveStats(users, isActive = true) {

    if(!users) return null;

    return users.filter(user => user.active === isActive).map(u => u.name);
}

const users = [
  { name: "Ana", active: true },
  { name: "Raj", active: false },
  { name: "Li",  active: true }
]

console.log(getUsersByactiveStats(users));// [ 'Ana', 'Li' ]
console.log(getUsersByactiveStats(users, false));// [ 'Raj' ]
console.log(getUsersByactiveStats());// null

// Rep - 3
function getValueByCount(chars, count=1) {
    if(!chars) return null;

    const countMap = getCount(chars);
    let res = [];
    for(const [k,v] of countMap) {
        if(v === count) res.push(k);
    }
    return res;
}
console.log(getValueByCount([3, 1, 3, 2, 1, 3]));// [ 2 ]
console.log(getValueByCount());// null


