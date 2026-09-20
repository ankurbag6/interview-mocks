double([1, 2, 3, 4]);   // → [2, 4, 6, 8]
double([]);  

console.log(nums.map(a => a*2))

onlyEvens([1, 2, 3, 4, 5, 6]);   // → [2, 4, 6]
onlyEvens([1, 3, 5]);             // → []

const onlyEvens = nums => nums.filter(n => n%2==0)


sum([1, 2, 3, 4]);   // → 10
sum([]);  

const sum = nums => nums.reduce((acc, n) => acc + n, 0);

const hasNegative = nums => nums.some(n => n<0);

const allPositive = (nums) => nums.every(n => n > 0);

const shout = (strs) => strs.map(s => s.toUpperCase());

const getNames = (records) => records.map(r => r.name);

const totalAge = records => records.reduce( (acc,{name,age}) => acc + age, 0)