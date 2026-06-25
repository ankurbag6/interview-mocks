const events = [
    { timestamp: 100, eventType: "page_view" },
    { timestamp: 200, eventType: "click" },
    { timestamp: 400, eventType: "page_view" },
    { timestamp: 600, eventType: "click" },
    { timestamp: 2200, eventType: "page_view" },   // 2000s gap → new session
    { timestamp: 2300, eventType: "scroll" },
    { timestamp: 5000, eventType: "click" }        // 2700s gap → new session
];
const gapThreshold = 1800;   // 30 min

function sessionize(events, gapThreshold) {

    // declare result array
    if (events.length === 0 || events.length === 1) return events;
    let sessioncnt = 0;
    const result = [[events[0]]];   
    for (let i = 1; i < events.length1; i++) {
        let curr = result[sessioncnt];
        //console.log("curr, result[sessioncnt], sessioncnt ",curr);
        // iterate over the events
        
        if (events[i].timestamp - events[i-1].timestamp > gapThreshold) {
            result.push([events[i]]); 
            console.log("Greater Sessoin cnt, res", i, result);
            
        } else {
            result[result.length - 1].push(events[i]);
            console.log("Less Sessoin cnt, res", i, result);
        }
        
    }
    //console.log(result);
    return result;
}

function sessionize(events, gapThreshold) {
  if (events.length === 0) return [];
  const result = [[events[0]]];        // first event always opens session 1
  for (let i = 1; i < events.length; i++) {
    const gap = events[i].timestamp - events[i - 1].timestamp;
    if (gap > gapThreshold) {
      result.push([events[i]]);        // start a new session
    } else {
      result[result.length - 1].push(events[i]);   // continue current
    }
  }
  return result;
}

console.log(sessionize(events, gapThreshold));
// → [
//     [{ timestamp: 100, ... }, { timestamp: 200, ... }],
//     [{ timestamp: 2200, ... }, { timestamp: 2300, ... }],
//     [{ timestamp: 5000, ... }]
//   ]
