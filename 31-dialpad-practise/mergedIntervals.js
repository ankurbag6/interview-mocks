/*
Merge Intervals :
[
  { start: 1, end: 5 },
  { start: 4, end: 8 },
  { start: 10, end: 12 },
  { start: 12, end: 15 }
]
[
  { start: 1, end: 3 },
  { start: 1, end: 5 },
  { start: 4, end: 8 },
  { start: 12, end: 15 }
]

[
  { start: 1, end: 3 },
  { start: 4, end: 8 },
  { start: 10, end: 11 },
  { start: 12, end: 15 }
] --> same
Invalid : 
[
   { start: 5, end: 3 }
] --> return same

Output :
[
 { start: 1, end: 8 },
 { start: 10, end: 12 },
 { start: 12, end: 15 }
]
*/

// function mergeIntervals(intervals, isInclusive = false) {
//     // validations of undefined, empty 
//     if(intervals.length === 0 || intervals === undefined) return [];

//     const mergedIntervals = [];
//     // process of intervals
//     // all the intervals are sorted by start time
//     // compare 2 intervals
//     // if(S of 2nd  < e of 1st) --> merge 
// /*
//         [
//         { start: 1, end: 5 },
//         { start: 4, end: 8 },
//         { start: 10, end: 12 },
//         { start: 12, end: 15 }
//     ]
//   */
//     for(let i=1; i<intervals.length; i++) {
//         let prev = intervals[i-1], curr = intervals[i], prevInMergedIntervals = mergedIntervals[i-1];
//         // prev :  { start: 1, end: 5 } curr : { start: 4, end: 8 },
//         // isInclusive = fals
//         if (!isInclusive && prevInMergedIntervals && curr.start < prevInMergedIntervals.end) {
//             let newPrev = {start: Math.min(prevInMergedIntervals.start, curr.start), end:Math.max(prevInMergedIntervals.end, curr.end)};
//             // [{s:1,8 }]
//             mergedIntervals[i-1] = newPrev;
//         } else if(isInclusive && prevInMergedIntervals && curr.start <= prev.end) { 
//             let newPrev = {start: Math.min(prevInMergedIntervals.start, curr.start), end:Math.max(prevInMergedIntervals.end, curr.end)};
//             // [{s:1,8 }]
//             mergedIntervals[i-1] = newPrev;
//         } 
        
//         else if(!isInclusive && curr.start < prev.end) {
//             mergedIntervals.push({start: Math.min(prev.start, curr.start), end:Math.max(prev.end, curr.end)});
//             // [{s:1,8 }]
//         } else if(isInclusive && curr.start <= prev.end) { 
//             mergedIntervals.push({start: Math.min(prev.start, curr.start), end: Math.max(prev.end, curr.end)});
//         } 
        
//         else {
//             mergedIntervals.push(curr); // [{s:1,8 },{ start: 10, end: 12 }, { start: 12, end: 15 } ]
//         }

//     }

//     return mergedIntervals;
// }


function mergeIntervals(intervals, isInclusive = false) {
    if (!intervals || intervals.length === 0) return [];

    const overlaps = (a, b) => (isInclusive ? b.start <= a.end : b.start < a.end);

    const merged = [{ ...intervals[0] }];
    for (let i = 1; i < intervals.length; i++) {
        const curr = intervals[i];
        const last = merged[merged.length - 1];
        if (overlaps(last, curr)) {
            last.start = Math.min(last.start, curr.start);
            last.end = Math.max(last.end, curr.end);
        } else {
            merged.push({ ...curr });
        }
    }
    return merged;
}


console.log(mergeIntervals([
  { start: 1, end: 5 },
  { start: 4, end: 8 },
  { start: 10, end: 12 },
  { start: 12, end: 15 }
]));

console.log(mergeIntervals([
  { start: 1, end: 3 },
  { start: 1, end: 5 },
  { start: 4, end: 8 },
  { start: 12, end: 15 }
]));

