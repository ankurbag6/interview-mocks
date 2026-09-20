/*
Passes, including the tie case. Q1 complete — solid: clean first-pass solve, quick fix on the tie-break. One nit: your comment says "Ascending" but `b[1] - a[1]` is descending — comments that lie are worse than none, and Karat reviewers read your comments. ~11 min total.

---

**Question 2 — Medium** (target: 12 min)

To schedule an all-hands, you need to consolidate everyone's busy calendar blocks. Times are numbers; `10.5` means 10:30.

```js
busy = [[9, 10.5], [10, 11], [12.5, 13], [12.75, 14], [15, 16]]
```

**Part 1:** Merge overlapping intervals into consolidated busy windows.

```js
// → [[9, 11], [12.5, 14], [15, 16]]
```

Input is not guaranteed sorted. 
Decide and state whether touching intervals (`[1,2],[2,3]`) merge — either is fine,
but commit out loud before you code.

Clarify → approach → complexity → code.
*/

function mergeIntervals(busy, isInclusive = false) {
  /*
        [1,2],[2,3] for this i will take a isInclusive boolean, default to false

        
        [[9, 10.5], [10, 11], [12.5, 13], [12.75, 14], [15, 16]]
        sort on the nasis of the start time
        [[9, 10.5], [10, 11], [12.5, 13], [12.75, 14], [15, 16]]
        op : [[9, 11], [12.5, 14], [15, 16]]

        compare 2 intervals, declare res = [[9, 10.5]]
        if(s[i+1] < e[i]) --> merge and push
        else push to putput
    */
  if (busy === undefined || busy.length === 0) return [];
  const sortedSchedules = busy.sort((a, b) => a[0] - b[0]); // O(nlogn)

  const mergedintervals = [sortedSchedules[0]];
  //sortedSchedules:  [[9, 10.5], [10, 11], [12.5, 13], [12.75, 14], [15, 16]]
  // mergedintervals:  [[9, 10.5]]
  let j = 0;
  for (let i = 1; i < sortedSchedules.length; i++) {
    //[10, 11] //[12.5, 13] //[12.75, 14]
    let last = mergedintervals[mergedintervals.length - 1]; // [9, 10.5]
    if (
      (!isInclusive && sortedSchedules[i][0] < last[1]) || //10<10.5
      (isInclusive && sortedSchedules[i][0] <= last[1])
    ) {
      last[1] = Math.max(sortedSchedules[i][1], last[1]); // [9, 11]
    } else {
      mergedintervals.push(sortedSchedules[i]); // [[9, 11], [12.5, 13], ]
    }
  }

  return mergedintervals;
}

let busy = [
  [9, 10.5],
  [10, 11],
  [12.5, 13],
  [12.75, 14],
  [15, 16],
];
console.log(mergeIntervals(busy));
busy = [[1, 10], [2, 3], [5, 6]]
console.log(mergeIntervals(busy));
