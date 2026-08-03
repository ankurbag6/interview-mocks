/*
Bank Account Transfers to Threshold — Medium — [Reported: Glassdoor, SDE, referral]. 
"Given a set of bank accounts with dollar amounts and a threshold, 
find the number of transfers needed to get all accounts to meet the threshold amount." 
Tests greedy/simulation + careful edge cases 
("if there isn't enough money" — some interviewers want an error thrown, others don't). 
Likely follow-ups: minimize number of transfers; what if transfers have fees; handle multiple currencies.

Input-
accounts = [120, 30, 75, 200, 10], and a threshold, say 50
Rq-
1. compliance requires every account to hold at least the threshold amount.
2. You can move money between accounts. 

Return the number of transfers needed to bring every account to at least the threshold.

Q-
1. What is the expectation? Can I code with bruteforce first?
2. Can there be negative balance ?
3. What if we are not able to manage to get to threshold? Will there be a situation 
? Do we need to worry about those cases?

Plan - 
- scan the array and find the surplus
   - [120, 30, 75, 200, 10] => deficitArray =  [+70 -20 +25 +150 -40]
   --> suplus > Deficit topup is possible
- scan the deficit array : store the idces of surplusIndices[0.2,3], and deficits [1,4]
- cntOfTransaction
then do the transfers till the deficitArray is all >=0 - arr[surplusIndices] + arr[deficitIndes]
cntOfTransaction++

*/

function countTransfers(accounts, threshold) {
    // 1. your infeasibility decision, as the first guard
    const deficitArray = [];
    const needs = [];
    const donor = [];
    let sumofdeficits = 0;
    for (let i = 0; i < accounts.length; i++) {
        deficitArray[i] = accounts[i] - threshold;
        if (deficitArray[i] < 0) needs.push(i);
        else donor.push(i);

    } // [+70 -20 +25 +150 -40]
    // 2. diffs
    const sum = deficitArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    console.log("deficitArray::", deficitArray);
    if (sum < 0)
        return -1; // transffers are not possible
    // 3. two pointers, the min() rule, the count
    let cnt = 0;
    let i=0, d=0;
    while (i < needs.length) {
        const give = Math.min(deficitArray[donor[d]], -deficitArray[needs[i]]);
        deficitArray[donor[d]] -= give;
        deficitArray[needs[i]] += give;
        cnt++;
        if(deficitArray[donor[d]] === 0) d++;
        if(deficitArray[needs[i]] === 0) i++;
    }
    return cnt;
}

 console.log(countTransfers([120, 30, 75, 200, 10], 50));
 console.log(countTransfers([150, 150, 10], 100));
 console.log(countTransfers([10, 60, 60], 110));
console.log(countTransfers([150, 150, 50], 100));


// Perfect solution 

// function countTransfers(accounts, threshold) {
//   const diffs = accounts.map(a => a - threshold);

//   // Guard: no exception — absence of a valid answer is data, not a fault
//   if (diffs.reduce((s, d) => s + d, 0) < 0) return -1;

//   const donors = [], needs = [];               // separate the two roles —
//   for (let i = 0; i < diffs.length; i++) {     // this is what your version was missing
//     if (diffs[i] > 0) donors.push(i);
//     else if (diffs[i] < 0) needs.push(i);
//   }

//   let d = 0, r = 0, count = 0;
//   while (r < needs.length) {
//     const give = Math.min(diffs[donors[d]], -diffs[needs[r]]);  // THE rule
//     diffs[donors[d]] -= give;                  // donor never goes below 0 —
//     diffs[needs[r]]  += give;                  // the spec violation is now impossible
//     count++;
//     if (diffs[donors[d]] === 0) d++;           // whoever exhausted, advances
//     if (diffs[needs[r]]  === 0) r++;           // both zero → both advance, ONE transfer
//   }
//   return count;
// }

