function groupAnagrams(strs) {
  // map [ ]
  const groups = new Map();
  // for all the strs, check if both of them are anagrams
  for (const word of strs) {
    const key = word.split('').sort().join('');   // canonical form
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(word);
  }
}

groupAnagrams(["eat","tea","tan","ate","nat","bat"]);
// → [["eat","tea","ate"], ["tan","nat"], ["bat"]]

groupAnagrams([""]);       // → [[""]]
groupAnagrams(["a"]);      // → [["a"]]