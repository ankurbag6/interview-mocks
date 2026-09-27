// digit: 0–9, oneSym/fiveSym: symbols for this scale
// This is Stage 1's entire logic, parameterized.
function digitToRoman(digit, oneSym, fiveSym) {
    if (digit === 0) return "";
    if (digit <= 4) return oneSym.repeat(digit);
    return fiveSym + oneSym.repeat(digit - 5);
}

function toRoman(n) {
    if (typeof n !== "number" || n < 1 || n > 100) return "";

    if (n === 100) return "C";

    const tens = Math.floor(n / 10);
    const ones = n % 10;

    return digitToRoman(tens, "X", "L") + digitToRoman(ones, "I", "V");
}

// Stage 2 examples
console.log('[' + toRoman(20)  + '] expect XX');
console.log('[' + toRoman(37)  + '] expect XXXVII');
console.log('[' + toRoman(60)  + '] expect LX');
console.log('[' + toRoman(99)  + '] expect LXXXXVIIII');
console.log('[' + toRoman(100) + '] expect C');
// Stage 1 regression
console.log('[' + toRoman(1)   + '] expect I');
console.log('[' + toRoman(4)   + '] expect IIII');
console.log('[' + toRoman(9)   + '] expect VIIII');
console.log('[' + toRoman(10)  + '] expect X');
// invalid
console.log('[' + toRoman(-3)  + '] expect empty');
console.log('[' + toRoman("abc") + '] expect empty');