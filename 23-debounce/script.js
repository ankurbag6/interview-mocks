// function debounce(fn, wait) {
//     // your implementation
//     let timer = null;
//     return function(...args) {
//         clearTimeout(timer);
//         timer = setTimeout(() => {
//             fn();
//         }, wait);
//     }
// }

// function debounce(fn, wait) {
//   let timer = null;
//   return function(...args) {
//     console.log([...args], this)
//     const context = this;
//     clearTimeout(timer);
//     timer = setTimeout(() => {
//         fn.apply(context, args);
//     }, wait);
//   }
// }



// // quick check
// const log = debounce((msg) => console.log('fired:', msg), 100);
// log('a');
// log('b');
// log('c');
// // after 100ms, should print: fired: c

// const obj = {
//   name: 'Ankur',
//   greet: debounce(function() { console.log(this.name); }, 100)
// };
// obj.greet();



function throttle(fn, wait) {
  // your implementation

  let lastCalled = 0;
  return function(...args) {
    const now = Date.now();
    const context = this;
    if(lastCalled === 0 || (now - lastCalled > wait)) {
        // fire
        lastCalled = now;
        //fn(...args);
        fn.apply(context, args);
        
    }
  }
}

// quick check
const log = throttle((msg) => console.log('fired:', msg), 100);
log('a');  // fires immediately: 'fired: a'
log('b');  // ignored (within 100ms window)
log('c');  // ignored
// 150ms later:
log('d');  // fires: 'fired: d'