/*
155. Min Stack
Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.

Implement the MinStack class:

MinStack() initializes the stack object.
void push(int value) pushes the element value onto the stack.
void pop() removes the element on the top of the stack.
int top() gets the top element of the stack.
int getMin() retrieves the minimum element in the stack.
You must implement a solution with O(1) time complexity for each function.

Example 1: 

Input
["MinStack","push","push","push","getMin","pop","top","getMin"]
[[],[-2],[0],[-3],[],[],[],[]]

Output
[null,null,null,null,-3,null,0,-2]

Explanation
MinStack minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin(); // return -3
minStack.pop();
minStack.top();    // return 0
minStack.getMin(); // return -2
 

Constraints:

-231 <= val <= 231 - 1
Methods pop, top and getMin operations will always be called on non-empty stacks.
At most 3 * 104 calls will be made to push, pop, top, and getMin.
*/
// class MinStack {
//     constructor() {
//         this.stack = [];
//         this.mins = [];
//     }
//     push(value) {
//         this.stack.push(value);
//         this.mins.push( this.mins.length === 0 ? value : Math.min(this.getMin(), value));
//     }
//     pop() {
//         this.mins.pop();
//         return this.stack.pop();
//     }
//     top() {
//         return this.stack[this.stack.length-1];
//     }
//     getMin() {
//         return this.mins[this.mins.length - 1];
//     }
// }
// const minStack = new MinStack();
// // minStack.push(-2);
// // minStack.push(0);
// // minStack.push(-3);
// // console.log(minStack.stack);
// // console.log(minStack.mins);
// // console.log(minStack.getMin()); // return -3
// // minStack.pop();
// // console.log(minStack.top());    // return 0
// // console.log(minStack.getMin()); // return -2

// minStack.push(3);
// minStack.push(2);
// minStack.push(1);
// minStack.push(5);
// minStack.push(-4);
// minStack.push(2);
// console.log(minStack.stack);
// console.log(minStack.mins);
// console.log(minStack.getMin()); // return 1
// minStack.pop();
// console.log(minStack.stack);
// console.log(minStack.mins);
// console.log(minStack.top());    // return 0
// minStack.pop();
// console.log(minStack.getMin()); // return -2

// O(1) space 

// var MinStack = function() { this.s = []; this.minEle = null; };
// MinStack.prototype.push = function(val) {
//     if (!this.s.length) { this.s.push(val); this.minEle = val; }
//     else if (val < this.minEle) { this.s.push(2*val - this.minEle); this.minEle = val; }
//     else this.s.push(val);
// };
// MinStack.prototype.pop = function() {
//     let t = this.s.pop();
//     if (t < this.minEle) this.minEle = 2*this.minEle - t;
// };
// MinStack.prototype.top = function() {
//     let t = this.s[this.s.length-1];
//     return t < this.minEle ? this.minEle : t;
// };
// MinStack.prototype.getMin = function() { return this.minEle; };

class MinStack {
    constructor() {
        this.stack = []; // [[curr, currMin]]
        this.min = Infinity;
    }
    push(value) {
        this.min =  Math.min(this.min, value);
        this.stack.push([value,this.min]);
    }
    pop() {
        return this.stack.pop();
    }
    top() {
        let tupple = this.stack[this.stack.length-1];
        return tupple[0];
    }
    getMin() {
        let tupple = this.stack[this.stack.length-1];
        this.min = tupple[1];
        return tupple[1];
    }
}
const minStack = new MinStack();
minStack.push(3); // [[3, 3]]
minStack.push(2); // [[3, 3],[2, 2]]
minStack.push(1); // [[3, 3],[2, 2],[1,1]]
minStack.push(5); // [[3, 3],[2, 2],[1,1],[5,1]]
minStack.push(-4);// [[3, 3],[2, 2],[1,1],[5,1],[-4,-4]]
minStack.push(2);// [[3, 3],[2, 2],[1,1],[5,1],[-4,-4], [2, -4]]
console.log(minStack.stack);
console.log(minStack.getMin()); // return -4
minStack.pop(); // [[3, 3],[2, 2],[1,1],[5,1],[-4,-4]]
console.log(minStack.stack);
console.log(minStack.top());    // return -4
minStack.pop(); // [[3, 3],[2, 2],[1,1],[5,1]]
console.log(minStack.stack);
console.log(minStack.getMin()); // return 1
minStack.push(9);
console.log(minStack.stack);

console.log(minStack.getMin()); // return 1


