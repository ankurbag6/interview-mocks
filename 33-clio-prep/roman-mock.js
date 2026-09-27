/*
Alright — but since it's a tired day, we do the *light* kata, not a heavy one: Roman numerals. It's on your list as the TDD-rhythm warm-up, it escalates cleanly, and it won't burn tomorrow's unseen problems (Bowling and CSV stay fresh for Days 4–5). Short session, ~25 minutes, full discipline, in character.

If you're in the CoderPad pad right now, do it there — doubles as the environment rep.

---

🎤

"Hi Ankur — quick one today.

**Stage 1:** Write `toRoman(n)` that converts an integer to a Roman numeral. Start with just these:

- `toRoman(1)` → `"I"`
- `toRoman(3)` → `"III"`
- `toRoman(6)` → `"VI"` (V = 5)
- `toRoman(8)` → `"VIII"`

Assume n is between 1 and 10 for now. Don't worry about subtractive forms yet — no IV/IX — I'll rule on those when we get there.

Your questions and plan, then code. Show me the runs for all four examples."

Plan
------------------------
1. Create a Map
I will hardcode:
1-> I
5 -> V
10 -> X


2.
 -> Val is <5 and > 1
  Append "I" for (2 ... Val)
 -> Val is >5  and <10:: 
  Append "I" after "V" n (1 ... 4)
 Set all the value in Map

3. Get the vlau from the map

I want to maintain a map, as We can scale it to future numbers

*/
function toRoman(n) {
    if(!n || n < 0) return "";

    
    const unitMap = new Map();
    unitMap.set(1, "I");
    unitMap.set(5, "V");
    unitMap.set(10, "X");
    unitMap.set(50, "L");
    unitMap.set(100, "C");

    if(n === 10) return unitMap.get(n);


    let res = "";
        if(n <= 4) {
            res = "I"
            for(let i=2; i<=n; i++) {
                res += "I";
            }
        } else {
            res = "V";
            for(let i=6; i<=n; i++) {
                res += "I";
            }
        }
    
    return res;
}

console.log(toRoman()); // ""
console.log(toRoman(0)); // ""
console.log(toRoman(1)); // `"I"`
console.log(toRoman(3)); // `"III"`
console.log(toRoman(4)); // `"IIII"`
console.log(toRoman(6)); // `"VI"` (V = 5)
console.log(toRoman(8)); // `"VIII"`
console.log(toRoman(9)); // `"VIIII"`
console.log(toRoman(10)); // `"X"`
console.log(toRoman(1)); // `"I"`
console.log(toRoman(5)); // `"V"`
console.log(toRoman(-3)); // `""`

/*
Stage 2: Extend toRoman(n) to handle 1 through 100. New symbols: L = 50, C = 100. Examples:

toRoman(20) → "XX"
toRoman(37) → "XXXVII"
toRoman(60) → "LX"
toRoman(99) → "LXXXXVIIII" — still no subtractive forms; same clock-face style as Stage 1
toRoman(100) → "C"

> 10 && <49
n = 37
--> t = n / 10 -> 3 -> XXX
--> u = n % 10 -> getfor(7) -> VII

n= 53

*/