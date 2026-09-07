/*

958. Check Completeness of a Binary Tree
Medium
Topics
premium lock icon
Companies
Given the root of a binary tree, determine if it is a complete binary tree.

In a complete binary tree, every level, except possibly the last, is completely filled, and all nodes in the last level are as far left as possible. It can have between 1 and 2h nodes inclusive at the last level h.

 

Example 1:


Input: root = [1,2,3,4,5,6]
Output: true
Explanation: Every level before the last is full (ie. levels with node-values {1} and {2, 3}), and all nodes in the last level ({4, 5, 6}) are as far left as possible.
Example 2:


Input: root = [1,2,3,4,5,null,7]
Output: false
Explanation: The node with value 7 isn't as far left as possible.
 

Constraints:

The number of nodes in the tree is in the range [1, 100].
1 <= Node.val <= 1000
*/

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isCompleteTree = function(root) {
    if (root === null) return true;

    const queue = [root];
    let seenNull = false;

    // Enqueue nulls as well. In a complete tree, level-order gives every real
    // node in one unbroken run, followed by nothing but nulls. So once a null
    // comes out of the queue, a real node after it means there was a gap.
    for (let i = 0; i < queue.length; i++) {
        const node = queue[i];

        if (node === null) {
            seenNull = true;
        } else {
            if (seenNull) return false;   // real node after a gap -> not complete
            queue.push(node.left);
            queue.push(node.right);
        }
    }

    return true;
};


/*

The key idea. Most tree BFS skips null children. Here you deliberately enqueue them, because the nulls are the signal. Level-order over a complete tree produces every real node consecutively, then only nulls — so a single boolean flag is enough. Once seenNull is true, any real node you dequeue proves there was a hole to its left.

Note the loop uses an index walking a growing array rather than queue.shift(). shift() is O(n) in JS, which would make the whole thing O(n²); at n ≤ 100 it wouldn't matter, but the index form is free and worth having as a habit. O(n) time, O(n) space.

Two alternatives worth knowing, in case an interviewer pushes:

Index numbering — give the root index 1, and each node's children indices 2i and 2i+1. The tree is complete iff the largest index equals the node count. Elegant, but the indices overflow on a deep skewed tree, so you'd need BigInt or an early bail.

Recursive — compute height and node count, then check count === 2^h - 1 for the perfect case and recurse on the structure. More code, easier to get wrong, no advantage. The BFS is the answer to give.
*/