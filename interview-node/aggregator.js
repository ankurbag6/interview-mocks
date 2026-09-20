/*
Device Event Aggregator — Medium
Events arrive as:
{ deviceId: "A12", timestamp: 100, type: "CLICK" }
Return the number of events for each device during the last 5 minutes.
Input::
[
  { deviceId: "A12", timestamp: 100, type: "CLICK" },
  { deviceId: "B20", timestamp: 150, type: "CLICK" },
  { deviceId: "A12", timestamp: 250, type: "VIEW" },
  { deviceId: "A12", timestamp: 410, type: "CLICK" }
]
Output::
{
  A12: 2,
  B20: 1
}

function that gives us list of <deviceid, frequency>
100
150
250
410

getFrequency(streamofEvents , inputtimestamp, counter=300) : 500
500 - 300 = 200 
get all the events greater > inputtimestamp - counter
 // iterate over the list of events, check the timestamp

*/
function getFrequency(streamofEvents , inputtimestamp, counter=300) {

    // Validation, edgecases
    if(streamofEvents.length === 0 || streamofEvents === undefined) return {};
    // Valid processing
    let res = new Map();
    let checker = inputtimestamp - counter; // 100
    for(let i=streamofEvents.length-1; i>=0; i--) { // 410 // 250 //150 // 100
        let deviceId = streamofEvents[i].deviceId; 
        let timestamp = streamofEvents[i].timestamp;

        if(timestamp && timestamp < inputtimestamp && timestamp >= checker) { 
            res.set(deviceId, (res.get(deviceId) ?? 0) + 1) //  a12:2, b20: 1,
        }
    }
    return res;
}
let streamofEvents = [
  { deviceId: "A12", timestamp: 100, type: "CLICK" },
  { deviceId: "B20", timestamp: 150, type: "CLICK" },
  { deviceId: "A12", timestamp: 250, type: "VIEW" },
  { deviceId: "A12", timestamp: 410, type: "CLICK" }
];

console.log(getFrequency(streamofEvents, 400));
console.log(getFrequency([], ''));

