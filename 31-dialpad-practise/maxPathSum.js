/*124. Binary Tree Maximum Path Sum

A path in a binary tree is a sequence of nodes where each pair of adjacent nodes
in the sequence has an edge connecting them. A node can only appear in the
sequence at most once. Note that the path does not need to pass through the root.

The path sum of a path is the sum of the node's values in the path.

Given the root of a binary tree, return the maximum path sum of any non-empty path.


Example 1:

Input: root = [1,2,3]
Output: 6
Explanation: The optimal path is 2 -> 1 -> 3 with a path sum of 2 + 1 + 3 = 6.

Example 2:

Input: root = [-10,9,20,null,null,15,7]
Output: 42
Explanation: The optimal path is 15 -> 20 -> 7 with a path sum of 15 + 20 + 7 = 42.
             Note this path never touches the root.


Constraints:

The number of nodes in the tree is in the range [1, 3 * 10^4].
-1000 <= Node.val <= 1000


Hints to think about before coding:
  1. At each node, what is the best path that BENDS here (uses both children)?
  2. What can you hand back to your parent? A bent path can't be extended by the
     parent without forking - so the return value must be a STRAIGHT downward path.
  3. Node values can be negative. When is the right move to take neither child?
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
 * @return {number}
 */

var maxPathSum = function(root) {
    let max = -Infinity;
    // max path sum = left gain + root.val + right gain

    function helper(node) {
        if (node === null) return 0;

        let leftSum = Math.max(0, helper(node.left));
        let rightSum = Math.max(0, helper(node.right));
        max = Math.max(max, leftSum + rightSum + node.val);
        return Math.max(leftSum, rightSum) + node.val;
    }

    helper(root);
    return max;
};
