const enrollments = [
    ["58", "Software Design"],
    ["58", "Linear Algebra"],
    ["94", "Art History"],
    ["94", "Operating Systems"],
    ["17", "Software Design"],
    ["58", "Mechanics"],
    ["58", "Economics"],
    ["17", "Linear Algebra"],
    ["17", "Political Science"],
    ["94", "Economics"],
    ["25", "Economics"],
    ["58", "Software Design"]
];

// Attempt 2 on June 29
// Step 1 - make map of courses to set of students
const courseToStudents = new Map();
enrollments.forEach((elem) => {
    const [id, course] = elem;
    console.log([id, course]);
    if(!courseToStudents.has(course)) courseToStudents.set(course, new Set());
    courseToStudents.set(course, courseToStudents.get(course).add(id));
});
console.log("courseToStudents::", courseToStudents);

// step 2 - make a new map [s1,s2] ==> [course] 
const studentsPairMap = new Map();
courseToStudents.forEach((students, course) => {
    // iterate over students
    // pair them and add to the studentsPairMap ([a,b] => [courses])
    const studentsarr = [...students];
    for(let j = 0; j<studentsarr.length; j++) {
        for(let k = 1; k<studentsarr.length; k++) {
            const [a, b] = [studentsarr[j],studentsarr[k]].sort();
            if(a != b) {
                if(!studentsPairMap.has(`${a}-${b}`)) studentsPairMap.set(`${a}-${b}`, new Set());
                studentsPairMap.set(`${a}-${b}`, studentsPairMap.get(`${a}-${b}`).add(course));
            }
        }
    }
});

console.log("studentsPairMap::", studentsPairMap);


/**
 * Student Course Overlaps — Part 1
You're given a list of (student_id, course_name) pairs representing course enrollments. 
Find all pairs of students who share at least one course, and return the list of courses they share.
 */

// Group by name of he courses
// iterate over the array, pick the second element
// group by second element --> store the element 1

const map = new Map();

enrollments.forEach((arr) => {
    const courseName = arr[1];
    const students = map.get(courseName) ?? new Set();
    if (students.size === 0) {
        students.add(arr[0]);
        map.set(courseName, students);
    } else {
        students.add(arr[0]);
        map.set(courseName, students);
    }
});

/**
 * Iterate over the map
pick pairs from the set
make keys out of the each pari, and new value would the key of the map
 */
const res = new Map();
map.forEach((value, key) => {
    // val --> { '58', '94', '25' }
    // generate pairs from the set
    const uniquePairs = [...value].flatMap(
        (v, i, a) => a.slice(i + 1).map(w => `${v},${w}`)
    )
    console.log(uniquePairs);
    uniquePairs.forEach( (pair) => {

    const courses = res.get(pair) ?? new Set();
    console.log(courses, pair);
    if (courses.size === 0) {
        courses.add(key);
        res.set(pair, courses);
    } else {
         courses.add(key);
        res.set(pair, courses);
    }
    });
    
})

console.log(res);
console.log([] === [])


/***
 * 
 * 
 * 
 * **[Stepping out of character — coach mode]**

Real talk before I show you anything: in an actual Karat screen, asking the interviewer for the solution would be a hard signal hit. The expectation is you push through. So I want you to feel that friction now, in the mock, where it's safe.

That said — you're here to learn, so let me give you the diagnosis and the fix.

---

### The two bugs in your output

**Bug 1 — Array keys in Maps use reference equality.**

```javascript
res.set(["58", "17"], ...)  // call 1: creates array #1, uses as key
res.set(["58", "17"], ...)  // call 2: creates array #2 — DIFFERENT key!
```

Two arrays with the same contents are still two different objects. So the Map sees them as distinct keys. You need a **stable string key** like `"58,17"`.

**Bug 2 — `set` overwrites, doesn't accumulate.**

You want a list of courses per pair. You're storing a single string. You needed: get the existing array (or create one), push, set back.

---

### Clean fix

```javascript
// Part 1: build pair -> shared courses
const res = new Map();

courseToStudents.forEach((studentSet, course) => {
  const students = [...studentSet];

  for (let i = 0; i < students.length; i++) {
    for (let j = i + 1; j < students.length; j++) {
      // Sort the pair so [58,17] and [17,58] hash to the same key
      const [a, b] = [students[i], students[j]].sort();
      const pairKey = `${a},${b}`;

      if (!res.has(pairKey)) res.set(pairKey, []);
      res.get(pairKey).push(course);
    }
  }
});
```

I renamed your first map to `courseToStudents` for clarity — naming matters for the Coding rubric.

---

### Rubric scoring for Part 1

| Line | Score | Why |
|---|---|---|
| **Communication** | 2/5 | You skipped clarifying questions entirely. No discussion of input shape, duplicate enrollments, output format, or pair ordering before coding. When I asked you to trace, you described intent instead of execution multiple times. |
| **Problem-Solving** | 2/5 | First plan ("check set equality") was fundamentally wrong and you only caught it because I pushed. You did self-correct, which counts — but the path was indirect. |
| **Coding** | 2/5 | The `students.push()` bug, the `students === []` dead branch, and the array-as-Map-key bug are all JS fundamentals. Naming was weak (`arr`, `value`, `key`). |
| **Verification** | 1/5 | This is the big one. Three separate times I had to ask you to dry-run, and even after running, you didn't catch obvious issues (duplicate `'58'` in Software Design, two identical-looking keys in res). |
| **Debugging** | 2/5 | When the `push is not a function` error fired, you patched the line without diagnosing *why*. You never answered "what does `.push()` return?" — that's the kind of question that, if you'd actually engaged with it, would have unlocked the fix instantly. |

**Overall: this would be a No Hire on a real Karat screen — but you knew that going in, and the whole point of the mock is to surface these patterns.**

---

### The real signal: your three failure patterns this rep

1. **No clarifying questions before coding.** You read the problem and started typing. Karat scores this hard.
2. **Pattern-matching fixes instead of diagnosing.** `push` broke → you swapped to `new Array()` without understanding the return-value issue. The bug repeated in different form (`set` overwriting) because the root cause wasn't internalized.
3. **Describing intent when asked for execution.** When I said "trace through," you said "I'm grouping by course name." Those aren't the same thing. The Verification rubric exists exactly to test this.

---

Want to keep going?
 */