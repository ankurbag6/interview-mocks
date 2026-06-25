function firstUniqChar(s) {
    // Solution 1 - O(n2)
    //   const charArr = [...s];
    //   for(let i=0; i<charArr.length; i++) {
    //     if(charArr.indexOf(charArr[i]) === charArr.lastIndexOf(charArr[i]))
    //         return i;
    //   }
    const map = new Map();
    for (const c of s) map.set(c, (map.get(c) ?? 0) + 1);

    for (let i = 0; i < s.length; i++) {
        if (map.get(i) === 1)
            return i;
    }

    return -1;
}

firstUniqChar("leetcode");    // → 0  ('l')
firstUniqChar("loveleetcode"); // → 2  ('v')
firstUniqChar("aabb");         // → -1
firstUniqChar("");  