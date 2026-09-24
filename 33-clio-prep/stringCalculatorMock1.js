/*

Questions : 
1. what if i pass undefined or null, can i return 0 ?
2. Are we accepting only Numbers or float or decimal numbers also allowed
2. I assume input is a single string with comma seprated ? 
  function add(input:string) 


implmentation plan:
add:
1. do validation
2. parse the string to array of numbers
2. return sum of all the nums in the array
if invalid
*/
function add(input) {
  if (!input) return 0;

  const nums = input.split(",").map((n) => Number(n));
  const sum = nums.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);
  return sum;
}

// console.log(add(""));
// console.log(add(undefined));
// console.log(add());
// console.log(add("1"));
// console.log(add("1,2"));
// console.log(add("1,2,3"));
// console.log(add("1,a,b"));
/*
output:
0
0
0
1
3
6
NaN
I am printing NaN for the invalid input. Hope thats ok
*/

/*
    Stage 2: Newlines can also act as delimiters, mixed with commas:

    add("1\n2,3") → 6
    add("4\n5\n6") → 15

    Implementation plan:
    1. Add new param - delims, which can accept regex string
    2. I will update the split(regex)
*/

function addStage2(input, delims = /[,\n]/) {
  if (!input) return 0;

  const nums = input.split(delims).map((n) => Number(n));
  const sum = nums.reduce((a, c) => a + c, 0);
  return sum;
}
console.log(addStage2(""));
console.log(addStage2(undefined));
console.log(addStage2());
console.log(addStage2("1"));
console.log(addStage2("1\n2,3"));
console.log(addStage2("4\n5\n6"));
console.log(addStage2("1,a,b"));
console.log(addStage2("1,3"));
/*

output

0
0
0
1
6
15
NaN
*/

/*
Stage 3 — final one: The input string can start with a custom delimiter header:

Format: //[delimiter]\n[numbers]
add("//;\n1;2") → 3
add("//#\n2#3#4") → 9
Strings without a header still work exactly as before: add("1\n2,3") → 6

implementation plan:
1. I will set default_delimiter = /[,\n]/ (Assumption from Stage 2)
2. I will split the input on "\n", part[0] -> custom delim, part[1] -> inputStr
 - if
3. I will apply the custom delim on inputStr

*/

function getBetween(str, startDelim, endDelim) {
  const startIndex = str.indexOf(startDelim);
  if (startIndex === -1) return ""; // Start delimiter not found

  // Adjust start index to look after the first delimiter
  const realStart = startIndex + startDelim.length;

  const endIndex = str.indexOf(endDelim, realStart);
  if (endIndex === -1) return ""; // End delimiter not found
  return str.slice(realStart, endIndex);
}

function addStage3(input) {
  if (!input) return 0;

  let defaultDelims = /[,\n]/;

  let customDelims = getBetween(input, "//", "\n");
  let nums = [];
  if (customDelims !== "") {
    if (["*", "+"].includes(customDelims)) {
      customDelims = new RegExp("\\" + customDelims, "g");
    } else {
      customDelims = new RegExp(customDelims);
    }
    nums = input
      .slice(input.indexOf("\n") + 1)
      .split(customDelims)
      .map((n) => Number(n));
  } else {
    nums = input.split(defaultDelims).map((n) => Number(n));
  }
  const sum = nums.reduce((a, c) => a + c, 0);
  return sum;
}
console.log("Stage3::")
console.log(addStage3(""));
console.log(addStage3(undefined));
console.log(addStage3());
console.log(addStage3("1"));
console.log(addStage3("1\n2,3"));
console.log(addStage3("4\n5\n6"));
console.log(addStage3("1,a,b"));
console.log(addStage3("//#\n2#3#4"));
console.log(addStage3("2#3#4"));
console.log(addStage3("2,3,4"));
console.log(addStage3("//-\n1-2-3"));
console.log(addStage3("//*\n1*2*3"));
