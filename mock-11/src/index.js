const { Counter } = require('./counter');

const c = new Counter(5);
console.log(c.increment(5));
console.log(c.increment(6));
console.log(c.decrement(5));
console.log(c.reset());


//console.log(c.undo());
//console.log(c.undo());

console.log(c.summary());


