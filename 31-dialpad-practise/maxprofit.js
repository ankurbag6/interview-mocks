// Online Javascript Editor for free
// Write, Edit and Run your Javascript code using JS Online Compiler
// [7,1,5,3,6,4]
// Output - 5
function maxprofit(prices) {

  if(prices === undefined || prices.length === 0) return 0;
  let min = prices[0];
  let bestprice = 0;
  for(let i=1; i<prices.length; i++) {
    //  [7,1,5,3,6,4]
    min = Math.min(prices[i], min); // 1
    bestprice = Math.max(prices[i] - min, bestprice); // 0 4 4 5 5
  }
  return bestprice;
  
}
console.log(maxprofit([7,1,5,3,6,4]));
console.log(maxprofit([7,6,4,3,1]));
console.log(maxprofit());
// Time complexity - O(n)