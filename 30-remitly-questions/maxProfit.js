/**
 * @param {number[]} prices
 * @return {number}

prices = [7,1,5,3,6,4]
Output: 5

- lowest : MIn(lowest, arr[i]) // 7 // 1 // 1
- best: Max(best, arr[i+1] - lowest) // -6 // 4

Input: prices = [7,6,4,3,1]
Output: 0

[1,2,4]

 */
var maxProfit = function(prices) {
    let i = 0;
    let lowest = prices[i]; // 1 
    let best = prices[1] - prices[0]; // 1
    for(i =1; i<prices.length-1; i++) {
        lowest = Math.min(prices[i], lowest); // 1
        best = Math.max(best, prices[i+1] - lowest); // 3
    }
    return best > 0 ? best : 0;
};

console.log(maxProfit([7,1,5,3,6,4]));

console.log(maxProfit([7,6,4,3,1]));

console.log(maxProfit([1,2,4]));