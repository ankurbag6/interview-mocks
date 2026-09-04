/*

127. Word Ladder https://leetcode.com/problems/word-ladder/description/
A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence of words beginWord -> s1 -> s2 -> ... -> sk such that:

Every adjacent pair of words differs by a single letter.
Every si for 1 <= i <= k is in wordList. Note that beginWord does not need to be in wordList.
sk == endWord
Given two words, beginWord and endWord, and a dictionary wordList, return the number of words in the shortest transformation sequence from beginWord to endWord, or 0 if no such sequence exists.

 

Example 1:

Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
Output: 5
Explanation: One shortest transformation sequence is "hit" -> "hot" -> "dot" -> "dog" -> cog", which is 5 words long.
Example 2:

Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]
Output: 0
Explanation: The endWord "cog" is not in wordList, therefore there is no valid transformation sequence.
 

Constraints:

1 <= beginWord.length <= 10
endWord.length == beginWord.length
1 <= wordList.length <= 5000
wordList[i].length == beginWord.length
beginWord, endWord, and wordList[i] consist of lowercase English letters.
beginWord != endWord
All the words in wordList are unique.

*/

function ladderLength(beginWord, endWord, wordList) {
    const wordSet = new Set(wordList);
    if (!wordSet.has(endWord)) return 0; // unreachable, bail early

    let queue = [beginWord];
    let steps = 1; // sequence length counts words, so start at 1

    while (queue.length > 0) {
        const next = [];
        for (const word of queue) {
            if (word === endWord) return steps;

            // Generate all one-letter mutations
            for (let i = 0; i < word.length; i++) {
                for (let c = 97; c <= 122; c++) { // 'a'..'z'
                    const candidate =
                        word.slice(0, i) + String.fromCharCode(c) + word.slice(i + 1);
                        console.log(word.slice(0, i), candidate)
                    if (wordSet.has(candidate)) {
                        next.push(candidate);
                        wordSet.delete(candidate); // mark visited by removing
                    }
                }
            }
        }
        queue = next;
        steps++;
    }
    return 0; // exhausted all reachable words
}
ladderLength("hit", "cog", ["hot","dot","dog","lot","log","cog"]);

/*

Solution 1: Standard BFS
The naive way to find neighbors is comparing every word pair — O(N² × L). 
The better trick: for each word, try replacing each position with all 26 letters and check if the result is in the word set. That's 26 × L candidates per word, which beats N² when the list is large.

Two details worth internalizing:

Deleting from the set = marking visited. One structure does double duty, and it prevents both cycles and re-processing a word via a longer path.
Level-by-level BFS (swap queue for next each round) makes steps trivially correct — everything in one round is the same distance from beginWord.

Complexity:

Time: O(N × L² × 26) → effectively O(N × L²). For each of N words we generate 26L candidates, and each candidate costs O(L) to build/hash.
Space: O(N × L) for the set and queue.


Solution 2: Bidirectional BFS (the interview flex)

BFS frontiers grow roughly exponentially with depth. Searching from both ends and meeting in the middle turns one deep search into two shallow ones — often a 10–100x speedup in practice. Always expand the smaller frontier first.

javascript
function ladderLength(beginWord, endWord, wordList) {
    const wordSet = new Set(wordList);
    if (!wordSet.has(endWord)) return 0;

    let front = new Set([beginWord]);
    let back = new Set([endWord]);
    let steps = 1;

    while (front.size > 0 && back.size > 0) {
        // Always expand the smaller side
        if (front.size > back.size) [front, back] = [back, front];

        const next = new Set();
        for (const word of front) {
            for (let i = 0; i < word.length; i++) {
                for (let c = 97; c <= 122; c++) {
                    const candidate =
                        word.slice(0, i) + String.fromCharCode(c) + word.slice(i + 1);

                    if (back.has(candidate)) return steps + 1; // frontiers met
                    if (wordSet.has(candidate)) {
                        next.add(candidate);
                        wordSet.delete(candidate);
                    }
                }
            }
        }
        front = next;
        steps++;
    }
    return 0;
}

Same worst-case complexity, but the search space shrinks from O(b^d) to O(b^(d/2)) per side, where b is branching factor and d is path length.

Edge cases: endWord not in the list (return 0 immediately — the early check), beginWord === endWord isn't tested by LeetCode but the standard answer is 1, and no valid path (BFS exhausts, returns 0). Note beginWord itself doesn't need to be in wordList.

In an interview: lead with Solution 1 — clean BFS is the expected answer. Mention bidirectional as an optimization when asked "can you do better?" Naming it without being asked also scores signal.

*/
