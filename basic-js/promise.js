// const myPromise = new Promise((_, reject) => {
//     setTimeout(() => reject(new Error("TimeoutError")), 1000);
 
// });
// myPromise.then(() => console.log("Hello")).catch(e => console.log(e) )

//fetch('https://pokeapi.co/api/v2/pokemon/ditto').then(res => res.json()).then(data => console.log(data))
// usecase search autocomplete
function debounce(fn, ms) {
    // returns a closure
    let timer = null;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), ms);
    };
}

// usecase : rage button clicks
function debounce(fn, ms, leading = false) {
  let timer = null;

  return function(...args) {
    // if leading and no active timer → fire immediately
    if (leading && !timer) {
      fn(...args);
    }

    // always clear and reset the timer
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null; // reset so next burst can fire again
      if (!leading) fn(...args); // trailing fires here
    }, ms);
  };
}
const debouncedLogs = debounce(() => console.log("hello"), 0);
debouncedLogs();
debouncedLogs();
debouncedLogs();



function throttle(fn, ms) {
  let lastCalled = 0;

  return function(...args) {
    const now = Date.now();
    
    if (lastCalled == 0 || (now - lastCalled > ms)) {
      // fire
      lastCalled = Date.now();
      fn(...args);
    }
    // else ignore
  };
}

function throttle(fn, ms) {
  let lastCalled = 0;
  let trailingTimer = null;
  let lastArgs = null;

  return function(...args) {
    const now = Date.now();
    
    if (now - lastCalled > ms) {
      // fire immediately
      lastCalled = Date.now();
    } else {
      // schedule trailing call
      ???
    }
  };
}

const throttleLogs = throttle(() => console.log("Call the API"), 100);
throttleLogs();
throttleLogs();
throttleLogs();
throttleLogs();
throttleLogs();
throttleLogs();
throttleLogs();


