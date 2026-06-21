
const fruits = [];
fruits.push("apple", "banana", "chikoo");
console.log(fruits.length);

console.log(Object.keys(fruits));
console.log(fruits);

const colors = ["red", "yellow", "blue"];
colors[5] = "purple";

// iteration
console.log("***ITeration**");
for(let i=0; i<colors.length; i++) {
    console.log(colors[i]);
}

colors.forEach((c) => console.log(c));

for(const c of colors)
    console.log(c);

colors.forEach((v, k) => console.log(`${k}:${v}`))
// join 2 arrays
console.log(colors.concat(fruits));

const arr = [5, 12, 8, 130, 44];
console.log(arr.at(6));
console.log(arr.copyWithin(0, 2, 4));
console.log(arr.entries().next().value);

for(const k of arr.entries()) {
    console.log(k)
}


console.log(arr.filter( k => k>130));
console.log(arr.find( k => k>0));

console.log(arr.map(a => a*2));
console.log(arr);
console.log(arr.pop());
console.log(arr);
console.log(arr.push());
console.log(arr);

const sum = arr.reduce( (a, c) => a + c )
console.log(sum)

const map = new Map();

map.set("a", 1);
map.set("b", 2);
map.set("c", 3);

console.log(map);

const map1 = new Map([["a", 1], ["b", 2], ["c", 3], ["d", 4], ["a", 3], ["b", 2], ["c", 3], ["d", 5]]);
console.log(map1);

// Group by key
const newMap = new Map();
map1.forEach((value, key) => {
    console.log(`${key} :: ${value}`);
    newMap.set( key, newMap.get(key) ? newMap.get(key) + value : value);
})

console.log("New Map");
console.log(newMap);

console.log(map.delete("a"));

const entries = map1.entries();
console.log(entries);
for(const val of entries) {
    console.log(val);
}