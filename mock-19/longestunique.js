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

function longestUniqueStreak(actions) { //  ['click', 'view', 'click', 'scroll', 'ankur', 'view', 'click']

    let maxSize = 0;
    const windowSet = new Set();
    for(const action of actions) {
        // if the action is not in set, add , and update the maxSize'
        if(!windowSet.has(action)) {
            windowSet.add(action); // click view // view click scroll ankur //  click scroll ankur view
            maxSize = Math.max(windowSet.size, maxSize); // 1 // 2 // 3 // 4
        } else {
            // Delete the first element
            windowSet.delete(windowSet.values().next().value);
            windowSet.add(action);// view click // click scroll ankur  //  scroll ankur view click
        }
    }
    return maxSize;
}

 console.log(longestUniqueStreak(actions));
 longestUniqueStreak(['a','b','c','d','c','e','f'])
// correct answer: 4   (window d,c,e,f)
// your code returns: 5