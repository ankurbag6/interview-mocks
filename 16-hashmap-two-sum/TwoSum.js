/***
 * 
 * 
 * 

### Q2 of 5 — Two Sum III: Data Structure Design

Design a class that supports two operations:

- `add(number)` — add `number` to an internal data structure
- `find(value)` — return `true` if there exists any pair of numbers (added previously) whose sum equals `value`; otherwise `false`. **A number can be used twice only if it was added twice.**

```javascript
const ts = new TwoSum();
ts.add(1);
ts.add(3);
ts.add(5);
ts.find(4);    // → true   (1 + 3)
ts.find(7);    // → false
ts.add(3);
ts.find(6);    // → true   (3 + 3, both added)
ts.find(6);    // (before the second add(3)) → false
```

State your approach + complexity for both `add` and `find` before coding.
 */

class TwoSum {
    nums = [];

    add(num) {
        this.nums.push(num);
    }

    find(value) { // [1  5] , 6
        let set = new Set();
        for(const num of this.nums) {
            let comp = value - num; // 3 
            if(set.has(num)) return true;
            else set.add(comp); // {3}
        }
        return false;
    }
}

const ts = new TwoSum();
ts.add(1);
//ts.add(3);
ts.add(5);
console.log(ts.find(4));    // → true   (1 + 3)
console.log(ts.find(7));    // → false
console.log(ts.find(6)); 
ts.add(3);
console.log(ts.find(6));    // → true   (3 + 3, both added)
ts.find(6);    // (before the second add(3)) → false