/*
Rep 2 cleaned up correctly — chained one-liner, positional arg, output verified. Warmup fully closed.

Now the mock is live. Timer's running.

---

🎤

"The data's on the board, Ankur:

```javascript
const records = [
  { id: 1, name: "Alice",  email: "alice@clio.com" },
  { id: 2, name: "Bob",    email: "bob@clio.com" },
  { id: 3, name: "Alicia", email: "alice@clio.com" },
  { id: 4, name: "Dana",   email: "dana@clio.com" },
  { id: 5, name: "Bob",    email: "bob.w@clio.com" }
];
```

**Stage 1:** Return the records whose email appears exactly once in the list.

Three things I want from you, in order:

1. Yesterday I claimed the answer is Dana (id 4) and Bob (id 5). Check my claim against the data — am I right?
Only Dana(id 4) is  right, Bob appears twice

2. Your clarifying questions.
- What about null data / undefined data, what should I return ?
- Will all the records have email, what if email data not there (both key and value)

3. Your plan, in 2–3 sentences.
- create a freqmap, email -> count
- filter the records arrar where count in freqmap for email = 1

Then code."
*/
function getRecordsByEmailCount(records) {
    if(!records) return [];

    const freqMap = new Map();
    for(const {email} of records) {
        freqMap.set(email, (freqMap.get(email) ?? 0 )+1)
    }

    return records.filter(record => freqMap.get(record.email) === 1)

}
const records = [
  { id: 1, name: "Alice",  email: "alice@clio.com" },
  { id: 2, name: "Bob",    email: "bob@clio.com" },
  { id: 3, name: "Alicia", email: "alice@clio.com" },
  { id: 4, name: "Dana",   email: "dana@clio.com" },
  { id: 5, name: "Bob",    email: "bob.w@clio.com" }
];
console.log(getRecordsByEmailCount(records))
/*
Output - 
[
  { id: 2, name: 'Bob', email: 'bob@clio.com' },
  { id: 4, name: 'Dana', email: 'dana@clio.com' },
  { id: 5, name: 'Bob', email: 'bob.w@clio.com' }
]
  */
console.log(getRecordsByEmailCount()) // []


/*

🎤

"Verified against the board — ids 2, 4, 5, null case safe. Stage 1 done in one clean pass, first try, output attached. That's the pace.

**Stage 2:** New requirement. Instead of dropping everyone with a duplicated email, we now want a **deduplicated list**: every email appears exactly once in the output, and when an email has multiple records, keep the **first** one that appears. Everyone's order preserved.

For our data: Alice (id 1) stays, Alicia (id 3) is dropped, everyone else passes through → ids 1, 2, 4, 5.

Two things before you code:

1. Is this a change to `getRecordsByEmailCount`, or a new function? Say which and why.
2. Your plan — and think about whether you even need a count this time, or whether a different structure fits 'have I seen this email before?' better."
*/

function getDedupList(records) {
    if(!records) return [];

    const seen = new Set(),res = [];
    /*
    check if seen has email
        if not add to set, and add to result array record
    This will add the first record only
    */
    for(const record of records) {
        if(!seen.has(record.email)) {
            seen.add(record.email);
            res.push(record)
        }
    }
    return res;
}

console.log(getDedupList()); // []
console.log(getDedupList(records));

/*
[
  { id: 1, name: 'Alice', email: 'alice@clio.com' },
  { id: 2, name: 'Bob', email: 'bob@clio.com' },
  { id: 4, name: 'Dana', email: 'dana@clio.com' },
  { id: 5, name: 'Bob', email: 'bob.w@clio.com' }
]
*/



/*
🎤

"Good — and note what you did there: you dropped `filter` for a plain loop with `push` the moment the logic needed a side effect. That's the right call, not a step backward; `filter` callbacks that mutate external state are a smell. You matched the tool to the job twice in one stage.

**Stage 3 — last one, and it ties the week together.** The records don't really arrive as objects — they come from a file. Here's the raw content:

```javascript
const fileContent = `id,name,email
1,Alice,alice@clio.com
2,Bob,bob@clio.com
3,Alicia,alice@clio.com
4,Dana,dana@clio.com
5,Bob,bob.w@clio.com`;
```

First line is the header. **Requirement: produce the same deduplicated output as Stage 2, starting from this string.**

Before you code:

1. Which of your existing functions need to change? Think hard before answering — the answer says a lot about your design.
2. Your plan for the parser. The header line is `id,name,email` — do you hardcode those keys, or read them from the header? Say which and defend it in one sentence.
3. One trap to name out loud: what type is `id` after parsing, and does it matter for our output?"
1.
I would create a new function that would accept raw input, and parse into records array
then I would pass the array to getDedupList. This way I maintain separation of Concern, in line with SOLID principles
2.
I would start simple :
I would hardcode those keys, as our functions are tightly coupled with keys - id, name, email. 

If given more time, I can check the first lines against the accpted keys, So I would not read from the file 

3. At this time parsing is not mandatory. But I would keep id as Number, as it is more standard

*/
function parseRecords(fileContent) {
    const rawcontent = fileContent.split("\n");
    // I am assuming 0th row is header and trusting it to be
    // 'id,name,email' for version 1
    const record = []
    for(let i=1;i<rawcontent.length; i++) {
        let rawrecord = rawcontent[i].split(",");
        // rawrecord , rawrecord[2] which is email is present, then only push
        if(rawrecord && rawrecord[2]) {
            record.push({ id: Number(rawrecord[0]), name: rawrecord[1], email: rawrecord[2]});
        }
    }

    return record;
}

function getDedupListFromFile(fileContent) {
    if(!fileContent) return [];

    const records = parseRecords(fileContent);
    return getDedupList(records);
}

const fileContent = `id,name,email
1,Alice,alice@clio.com
2,Bob,bob@clio.com
3,Alicia,alice@clio.com
4,Dana,dana@clio.com
5,Bob,bob.w@clio.com`;

console.log(getDedupListFromFile()); // []

console.log(getDedupListFromFile(fileContent));
/*
[
  { id: 1, name: 'Alice', email: 'alice@clio.com' },
  { id: 2, name: 'Bob', email: 'bob@clio.com' },
  { id: 4, name: 'Dana', email: 'dana@clio.com' },
  { id: 5, name: 'Bob', email: 'bob.w@clio.com' }
]
  */

