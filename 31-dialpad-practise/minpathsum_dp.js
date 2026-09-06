// https://leetcode.com/problems/minimum-path-sum/solutions/3345656/pythonjava-csimple-solutioneasy-to-under-occy/
/*
64. Minimum Path Sum


Given a m x n grid filled with non-negative numbers, find a path from top left to bottom right, which minimizes the sum of all numbers along its path.

Note: You can only move either down or right at any point in time.

 

Example 1:


Input: grid = [[1,3,1],[1,5,1],[4,2,1]]
Output: 7
Explanation: Because the path 1 → 3 → 1 → 1 → 1 minimizes the sum.
Example 2:

Input: grid = [[1,2,3],[4,5,6]]
Output: 12
 

Constraints:

m == grid.length
n == grid[i].length
1 <= m, n <= 200
0 <= grid[i][j] <= 200
*/
// grid = [[1,3,1],[1,5,1],[4,2,1]]
function minPathSum(grid) {
    const m = grid.length;
    const n = grid[0].length;
    // Step 1: Fill 0th row, Fill the 0th column
    for(let i=1; i<m; i++) {
        grid[i][0] += grid[i-1][0];
    }
    for(let j=1; j<n; j++) {
        grid[0][j] += grid[0][j-1];
    }
    // Step 2: Update the value of the positions
    for(let r=1; r<m; r++){
        for(let c=1; c<n; c++){
            grid[r][c] += Math.min(grid[r-1][c], grid[r][c-1]);
        }
    }
    return grid[m-1][n-1];
};
// O(n) space, no mutation


function minPathSum_better(grid) {
    const m = grid.length, n = grid[0].length;
    const dp = new Array(n);

    dp[0] = grid[0][0];
    for (let c = 1; c < n; c++) dp[c] = dp[c - 1] + grid[0][c];   // first row

    for (let r = 1; r < m; r++) {
        dp[0] += grid[r][0];                                      // first column
        for (let c = 1; c < n; c++) {
            dp[c] = grid[r][c] + Math.min(dp[c], dp[c - 1]);
        }
    }
    return dp[n - 1];
}

console.log(minPathSum([[1,3,1],[1,5,1],[4,2,1]]));
console.log(minPathSum([[1,2,3],[4,5,6]]));
