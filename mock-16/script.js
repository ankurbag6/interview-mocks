/**
 * 
 * 
 * 
Q3 of 5 — Logger Rate Limiter
Design a logger that receives a stream of messages with timestamps. 
Each unique message should only be printed at most every 10 seconds 
— i.e., a message printed at timestamp t blocks identical messages until t + 10.
javascript

class Logger {
  shouldPrintMessage(timestamp, message)   // returns true if it should print, false to block
}
Example:
javascriptconst log = new Logger();
log.shouldPrintMessage(1,  "foo");    // → true   (first time)
log.shouldPrintMessage(2,  "bar");    // → true
log.shouldPrintMessage(3,  "foo");    // → false  (within 10s of t=1)
log.shouldPrintMessage(8,  "bar");    // → false
log.shouldPrintMessage(10, "foo");    // → false  (10 - 1 = 9, still < 10)
log.shouldPrintMessage(11, "foo");    // → true   (11 - 1 = 10, allowed)
Timestamps arrive in non-decreasing order. State approach + complexity, then code.
 */

class Logger {
  map;
  constructor() {
    this.map = new Map();
    
  }
  shouldPrintMessage(timestamp, message) {
    const storedTs = this.map.get(message);
        if((storedTs === undefined) || (timestamp - storedTs >= 10)) {
            this.map.set(message, timestamp);
            return true;
        } else {
            return false;
        }
        
  }   // returns true if it should print, false to block
}

const log = new Logger();
console.log(log.shouldPrintMessage(1,  "foo"));    // → true   (first time)
console.log(log.shouldPrintMessage(2,  "bar"));    // → true
console.log(log.shouldPrintMessage(3,  "foo"));    // → false  (within 10s of t=1)
console.log(log.shouldPrintMessage(8,  "bar"));    // → false
console.log(log.shouldPrintMessage(10, "foo"));    // → false  (10 - 1 = 9, still < 10)
console.log(log.shouldPrintMessage(11, "foo"));    // → true   (11 - 1 = 10, allowed)