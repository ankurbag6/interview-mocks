// Tier 1 — Warm-up (10–15 min each)
//1. Reverse a string — with a twist
// javascript
// 
function reverseWords(str) {
  return str.split(' ').reverse().join(' ');
}
// Drill: walk through what this does. What edge cases does it miss?
// (multiple spaces, leading/trailing whitespace, empty string, null)
//2. A buggy sum function
// javascript
function sumArray(arr) {
  let total = 0;
  for (let i = 0; i < arr.length; i++) {
    total += arr[i];
  }
  return total;
}
// Drill: find the bug by tracing through with [1, 2, 3]. Narrate the trace.
//3. A debounce skeleton
// javascript
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}
// Drill: explain to a junior engineer what this does and why you'd use it.

const myFun = debounce(()=>console.log("Hello"), 1000);
myFun();
