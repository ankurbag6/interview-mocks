/*


**Question 2** (target: ~12 min)

A secure server room logs badge-ins. 
You get an unordered list of `[name, time]` entries for one day — times are 24-hour integers like `859` (8:59 AM) or `1330` (1:30 PM).

```js
entries = [
  ["Paul", 1355], ["Jennifer", 1910], ["Jose", 835],
  ["Jose", 830],  ["Paul", 1315],     ["Chloe", 0],
  ["Chloe", 1910], ["Jose", 1615],    ["Jose", 1640],
  ["Paul", 1405],  ["Jose", 855],     ["Chloe", 815],
  ["Jose", 930],   ["Jose", 915],     ["Jose", 1210],
  ["Jose", 900],   ["Jennifer", 1335], ["Jennifer", 730],
  ["Jose", 1230],  ["Jennifer", 5]
]
```

Find any person who badged in **three or more times within a one-hour period**. Return each such person with the badge times of that period. If a person has multiple qualifying one-hour periods, return the **earliest** one.

Expected output shape for this input:

```js
{
  "Jose": [830, 835, 855, 900, 915],
  "Chloe": [] // only if she qualifies — she doesn't here, so she's absent
}
// i.e. → { Jose: [830, 835, 855, 900, 915] }
```

Approach first, then code. Clock's at ~13 min.


// Example 2 — simple qualify
entries = [["Amy", 900], ["Amy", 930], ["Amy", 958]]
// 958 - 900 = 58 min apart, 3 badges within one hour
// → { Amy: [900, 930, 958] }

// Example 3 — spread too far
entries = [["Amy", 900], ["Amy", 1000], ["Amy", 1100]]
// no window of one hour contains 3 badges (900→1000 is exactly 60 min — that's OUTSIDE the window; window is < 60 min apart)
// → { }

// Example 4 — earliest window wins
entries = [
  ["Ben", 800], ["Ben", 810], ["Ben", 820],   // qualifies
  ["Ben", 1400], ["Ben", 1410], ["Ben", 1420] // also qualifies, but later
]
// → { Ben: [800, 810, 820] }

// Example 5 — HHMM arithmetic trap
entries = [["Cy", 855], ["Cy", 905], ["Cy", 940]]
// 940 - 855 = 85 as integers, but in real minutes it's only 45 min → qualifies
// → { Cy: [855, 905, 940] }



*/

function badgedPerson(entries, k = 3) {
  if (!entries || entries.length === 0) return {};

  // HHMM integer → minutes since midnight (855 → 535, 900 → 540)
  const toMin = t => Math.floor(t / 100) * 60 + (t % 100);

  // group times per person
  const byPerson = new Map();
  for (const [name, time] of entries) {
    if (!byPerson.has(name)) byPerson.set(name, []);
    byPerson.get(name).push(time); // keep original HHMM for output
  }

  const output = {};
  for (const [name, times] of byPerson) {
    times.sort((a, b) => a - b); // numeric sort — HHMM sorts correctly as numbers

    let s = 0;
    // for (let e = 0; e < times.length; e++) {
    //   // shrink from the left until the window spans < 60 real minutes
    //   while (toMin(times[e]) - toMin(times[s]) >= 60) s++;

    //   if (e - s + 1 >= k) {
    //     // earliest qualifying window — collect everything within one hour of times[s]
    //     const windowEnd = toMin(times[s]) + 60;
    //     output[name] = times.filter(t => t >= times[s] && toMin(t) < windowEnd);
    //     break; // earliest only
    //   }
    // }

    let l=0; r=0, cnt =0;
    while(r<times.length) {
       console.log({output, l, r, name, cnt,times_r: times[r],times_l: times[l] });
      if(toMin(times[r]) - toMin(times[l]) < 60) {
        // expand
        r++;
        console.log("here");
        if(r-l+1>= k) {
          const windowEnd = toMin(times[s]) + 60;
          //output[name] = times.slice(l,r);
          while (r < times.length && toMin(times[r]) < windowEnd) r++;
      output[name] = times.slice(l, r);
      break;                      // fix #1: next person, don't return
    

        }
        
      } else {
        console.log("there");
        l++;
      }
    }
  }
  
  return output;
}
//let entries = [["Amy", 900], ["Amy", 930], ["Amy", 958]]
//console.log(badgedPerson(entries, 3));

entries = [
  ["Ben", 800], ["Ben", 810], ["Ben", 820],   // qualifies
  ["Ben", 1400], ["Ben", 1410], ["Ben", 1420] // also qualifies, but later
]
console.log(badgedPerson(entries, 3));