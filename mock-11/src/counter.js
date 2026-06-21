// A thread-safe counter with history tracking.

class Counter {
    constructor(initial = 0) {
        this.initial = initial; // Task 2
        this.value = initial;
        this.history = [];

    }

    increment(amount = 1) {
        console.log("initial", this.initial)
        this.value += amount;
        this.history.push({ op: 'increment', amount, value: this.value });
        return this.value;
    }

    decrement(amount = 1) {
        this.value -= amount;
        this.history.push({ op: 'decrement', amount, value: this.value });
        return this.value;
    }

    reset() {
        const prev = this.value;
        this.value = 0;
        this.history.push({ op: 'reset', prev, value: 0 });
        return this.value;
    }

    get count() {
        return this.value;
    }
    /**
      Q1: Add an undo() method that reverses the last operation. 
      If there's nothing to undo, return the current value unchanged.
     */
    undo() {
        if (this.history.length === 0) return this.value;
        const last = this.history.pop();
        if (last.op === 'increment') {
            this.value -= last.amount;
        } else if (last.op === 'decrement') {
            this.value += last.amount;
        } else if (last.op === 'reset') {
            this.value = (typeof last.prev !== 'undefined') ? last.prev : 0;
        }
        return this.value;
    }
    /*
      Q2: Add a summary() method returning { totalIncrements, totalDecrements, totalResets, netChange } — read-only, no modifications.
      */
    //  summary() {
    //     if(this.history.length != 0) {
    //         const incOp = this.history.filter(h => h.op === 'increment');
    //         const decOp = this.history.filter(h => h.op === 'decrement');
    //         const resetOp = this.history.filter(h => h.op === 'reset');
    //         return {
    //         totalIncrements: incOp.length,
    //         totalDecrements: decOp.length,
    //         totalResets: resetOp.length,
    //         netChange: this.value - this.initial
    //         }
    //     }
    //     return {
    //         totalIncrements: 0,
    //         totalDecrements: 0,
    //         totalResets: 0,
    //         netChange: this.value - this.initial
    //     }
    //  }
    /**
     * improved version
     */
    summary() {
        let totalIncrements = 0, totalDecrements = 0, totalResets = 0;
        this.history.forEach(h => {
            if (h.op === 'increment') totalIncrements++;
            else if (h.op === 'decrement') totalDecrements++;
            else if (h.op === 'reset') totalResets++;
        });
        return {
            totalIncrements,
            totalDecrements,
            totalResets,
            netChange: this.value - this.initial
        };
    }
}

module.exports = { Counter };