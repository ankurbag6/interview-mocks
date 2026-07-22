function topKFrequent(nums, k) {
  // your code
  const map = new Map();
  const res = [];
  for (const n of nums) {
    map.set(n, (map.get(n) ?? 0) + 1);
  }
   return [...map.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, k)
    .map(([num]) => num);
}

topKFrequent([1,1,1,2,2,3], 2);   // → [1, 2]
topKFrequent([1], 1);              // → [1]
topKFrequent([4,4,1,2,2,3,3,3], 2); // → [3, 4]  (or [4, 3])