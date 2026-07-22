const cal1 = [
    ["9:00", "10:30"],
    ["12:00", "13:00"],
    ["16:00", "18:00"]
];
const bounds1 = ["9:00", "20:00"];

const cal2 = [
    ["10:00", "11:30"],
    ["12:30", "14:30"],
    ["14:30", "15:00"],
    ["16:00", "17:00"]
];
const bounds2 = ["10:00", "18:30"];

const meetingDuration = 30;  // minutes

/**
 * 

  User - 1
  10.30 - 12.00
  13.00 - 1600
  1800-2000

  User - 2
  1130-1230
  1500-1600
  1700-1830
  
  
   Common times
   1130-1200
   1500-1600
   1800-1830
 */

//convert to minutes from midnight
const toMinutes = (time) => {
    // Split "10:00"
    const [hh, mm] = time.split(":").map(Number);
    return hh * 60 + mm;
}
const newCal1 = [], newCal2 = [];
let newBounds1 = [];
let newBounds2 = [];
const makeMinutes = () => {

    cal1.forEach((slot, index) => {
        newCal1[index] = slot.map((time) => toMinutes(time))
    });

    cal2.forEach((slot, index) => {
        newCal2[index] = slot.map((time) => toMinutes(time))
    });

    newBounds1 = bounds1.map(time => toMinutes(time));
    newBounds2 = bounds2.map(time => toMinutes(time));
}

// Step 1: find free time
// compare the start time of bounds array --> if bounds1[0] >  newCal1[0] [0]  
// freeTIme = [bounds1[0],newCal1[0] [0] 
// iterate newCal1
// if()
const freeCal1 = [], freeCal2 = [];
const findFreeTimes = () => {
    let idx1 = 0, idx2 = 0;
    makeMinutes();
    console.log(newCal1);
    console.log(newCal2);
    if (newBounds1[0] > newCal1[0][0]) {
        freeCal1[idx1] = [newBounds1[0], newCal1[0][0]];
        idx1++;
    }
    for (let i = 0; i < newCal1.length-1; i++) {
        console.log("i -- ", i, idx1)
        if (newCal1[i][1] !== newCal1[i + 1][0]) {
            freeCal1[idx1] = [newCal1[i][1], newCal1[i + 1][0]];
            idx1++;
        }
    }
    console.log(idx1, freeCal1[idx1 - 1]);
    if (newBounds1[1] > freeCal1[idx1 - 1][1]) {
        freeCal1[idx1] = [freeCal1[idx1 - 1][1], newBounds1[1]];

    }
    if (newBounds2[0] > newCal2[0][0]) {
        freeCal2[idx2] = [newBounds2[0], newCal2[0][0]];
        idx2++;
    }
    for (let i = 0; i < newCal2.length - 1; i++) {
        if (newCal2[i][1] !== newCal2[i + 1][0]) {
            freeCal2[idx2] = [newCal2[i][1], newCal2[i + 1][0]];
            idx2++;
        }
    }
    if (newBounds2[1] > freeCal2[idx2 - 1][1]) {
        freeCal2[idx2] = [freeCal2[idx2 - 1][1], newBounds2[1]];

    }


}

const findCommonTimes = () => {
    findFreeTimes();

    console.log(freeCal1, freeCal2)
    const res =[];
    let idx = 0;
    for(let i=0, j=0;i<freeCal1.length&& j<freeCal2.length;i++,j++) {
        res[idx] = [Math.max(freeCal1[i][0], freeCal2[j][0]), Math.min(freeCal1[i][1], freeCal2[j][1])];
        idx++;
    }
    console.log("------------------------------")
    console.log(res);
}

findCommonTimes();



