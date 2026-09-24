/*Rep 1: "the quick brown fox" → reverse each word (not the sentence) → "eht kciuq nworb xof". One line using split/map/join.
*/
let str = "the quick brown fox";
let res = str.split(" ").map(w => [...w].reverse().join("")).join(" ");
console.log(res);
/*
Rep 2: For s = "hello!" — print the last char, and the string without the last char. Two lines, no s.length - 1 arithmetic inside slice (there's a shorter way).
*/
let s = "hello!";
console.log(s.at(-1));
console.log(s.slice(0, -1));
/*
Rep 3: "vancouver" → "Vancouver". One line, works for any word.
*/
s = "vancouver";
console.log(s.at(0).toUpperCase()+s.slice(1));
/*
Rep 4: Write the bug from today and its fix, side by side:

javascript
// broken: why does words stay unchanged?
// fixed:  the map version
Both versions, run both, print both results, and one comment line in your own words on why the first fails.
*/
// Rep 4a — BROKEN: reproduce your mock bug
const words1 = ["hello", "world"];
for (let word of words1) {
    word = word.toUpperCase();   // stand-in for convertToPigLatin
}
console.log(words1);   // what prints — and why?

// Rep 4b — FIXED: the map version
const words2 = ["hello", "world"];
const result = words2.map(word => word.toUpperCase());
console.log(result);

// Why 4a fails: The mechanism: for...of creates a fresh variable word each iteration holding the element's value — reassigning word points that variable at a new string; the array slot never sees it.