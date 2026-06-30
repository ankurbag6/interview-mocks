//const actions = ['click', 'view', 'click', 'scroll', 'view', 'click']

const actions = ['click', 'view', 'click', 'scroll', 'ankur', 'view', 'click']
//→ 3   // ['click','scroll','view']


// function longestUniqueStreak(actions) {

//     if(!actions) return -1;
//     // Sliding window prob
//     // maxSize
//     let maxSize = -1;
//     let p=0, q=1;
//     let windowsize = 0;
//     while(p<q && q<actions.length) {

//         // actions[p] != actions[q] --> windowsize++ q++

//         if(actions[p] !== actions[q]) {
//              console.log("nE ::p, q,actions[p,q]", p, q, actions[p], actions[q], windowsize, maxSize)

//             windowsize+=1;
//             maxSize = Math.max(maxSize, windowsize);
//             q++;
//             console.log("Af nE ::p, q,actions[p,q]", p, q, actions[p], actions[q], windowsize, maxSize)


//         }
//         // actions[p] == actions[q] 
//         // //--> maxSize = Math.max(maxSize, windowsize) reset windowsize p++, q++ 
//         else if(actions[p] === actions[q]) {
//             console.log("EQ ::p, q,actions[p,q]", p, q, actions[p], actions[q], windowsize, maxSize)

//              maxSize = Math.max(maxSize, windowsize);
//             windowsize=1;
//             p++;
//             q=p+1;
//             console.log("Af EQ ::p, q,actions[p,q]", p, q, actions[p], actions[q], windowsize, maxSize)


//         }
//     }
//     return maxSize
//  }

function longestUniqueStreak(actions) { //  ['a','b','c','d','c','e','f']
                                                          //l           r
                                         // [a b c d] // [d c e f]

                                         // max: 4
    const seen = new Set();

    let left = 0, max =0;
    for(let right =0; right<actions.length; right++) {
        while(seen.has(actions[right])) {
            seen.delete(actions[left]);
            left++;
        }
        seen.add(actions[right]);
        max = Math.max(max, right-left+1);
    }
    return max;
}

console.log(longestUniqueStreak(actions));
console.log(longestUniqueStreak(['a', 'b', 'c', 'd', 'c', 'e', 'f']));
// correct answer: 4   (window d,c,e,f)
// your code returns: 5