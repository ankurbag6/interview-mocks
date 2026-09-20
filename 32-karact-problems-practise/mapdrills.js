let arr = ["hi","hello"];
let map = new Map();
for(const a of arr) {
    map.set(a, a.length)
}
console.log(Object.fromEntries(map));

// "apple" → {vowels:2, consonants:3}
const vowels = ['a', 'e','i', 'o', 'u'];
let str = "apple", vowelscnt =0;
for(const l of str.toLowerCase()) {
    if(vowels.includes(l)) vowelscnt++;
}
map = new Map();
map.set("vowels", vowelscnt );
map.set("consonants", str.length - vowelscnt );
console.log(Object.fromEntries(map));

// [1,2,2,3,3] → 2
let set = new Set();
arr = [1,2,2,3,3]
for(const n of arr) {
    if(set.has(n)) {console.log(n); break;}
    set.add(n);
}

let invmap = new Map();
map = new Map([[a,1], [b,2]]);
for ( const [k,v] of map) {
    invmap.set(v, k);
}
console.log(Object.fromEntries(invmap));


// [1,2,2,3,3,3] → [2,3]
let nums = [1,2,2,3,3,3];
map = new Map();
let res = [];
for(const n of nums) {
    map.set(n, (map.get(n) ?? 0)+1);
    if(map.get(n) === 2) res.push(n);
}
console.log(res);

// "the cat and the dog" → "the"
str = "the cat and the dog";
map = new Map();
let maxW = "", maxCnt = -Infinity;
for(const w of str.split(" ")) {
    map.set(w, (map.get(w)?? 0)+1);
    if(map.get(w) > maxCnt) {
        maxW = w; maxCnt = map.get(w);
    }

}
console.log({maxW, maxCnt});

let a = [1,2,2], b = [2,1,2];
a.sort();
b.sort();
const equal = a.length === b.length && a.every((val, i) => val === b[i]);
console.log(equal);

//[{name:"A",dept:"eng"},{name:"B",dept:"ops"},{name:"C",dept:"eng"}]
// → {eng:["A","C"], ops:["B"]}
arr = [{name:"A",dept:"eng"},{name:"B",dept:"ops"},{name:"C",dept:"eng"}];
map = new Map();
for(const {name, dept} of arr) {
    if(!map.has(dept)) map.set(dept, []);
    map.get(dept).push(name);
}
console.log(map);