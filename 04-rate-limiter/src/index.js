const { RateLimiter } = require('./rateLimiter');

const limiter = new RateLimiter(4, 1000); // 3 requests per second

console.log(limiter.isAllowed('user:1')); // true
console.log(limiter.isAllowed('user:1')); // true
console.log(limiter.isAllowed('user:1')); // true
console.log(limiter.isAllowed('user:1')); // false — limit reached
console.log(limiter.remaining('user:1')); // false — limit reached


console.log(limiter.isAllowed('user:2')); // true
console.log(limiter.isAllowed('user:2')); // true


//console.log(limiter.reset('user:3')); // true
//console.log(limiter.resetAll()); // true


console.log( limiter.stats());

console.log(limiter.prune());
