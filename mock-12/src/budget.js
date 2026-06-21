// A simple budget tracker that monitors spending across categories.

class BudgetTracker {
  constructor(limit) {
    this.limit = limit;
    this.spent = 0;
    this.transactions = [];
  }

  spend(category, amount) {
    if (amount <= 0) throw new Error('Amount must be positive');
    this.spent += amount;
    this.transactions.push({ category, amount, ts: Date.now() });
    return this.spent;
  }

  get remaining() {
    return this.limit - this.spent;
  }

  get isOverBudget() {
    return this.spent > this.limit;
  }

  /**
   * Q1 — Add spendByCategory(category) method that returns the total amount spent in a given category. If the category has no transactions, return 0.
   * // totalSpentByCat = 0
   * // iterate over this.transactions
   * // filer / map --> t.category === category 
   *   // totalSpentByCat += t.amount
   * return totalSpentByCat
   */
  spendByCategory(category) {
    let totalSpentByCat = 0;
    this.transactions.map( (t) => {
      if(t.category === category) totalSpentByCat += t.amount;
    } 
    )
    return totalSpentByCat;
  }

  /**
   * Q2 — Add summary() method returning:
javascript{
  totalSpent,       // total across all categories
  remaining,        // budget remaining
  isOverBudget,     // boolean
  byCategory,       // object: { food: 300, transport: 150, ... }
  topCategory,      // category with highest spend (null if no transactions)
}
   * 
   */
  summary() {
    // map --> store <cat, totalspent>
    let tranMap = new Map();
    let totalSpent = 0;
    this.transactions.map( (t) => {
      totalSpent += t.amount;
      console.log("temp:dddd",t.category, t.amount, t.spent);
      if(tranMap.get(t.category) === undefined) {
        console.log("temp:xxx", t.category);
        tranMap.set(t.category,t.amount ) 
        
      } else {
          let temp = tranMap.get(t.category) +  t.amount;
          
          console.log("temp:", tranMap.get(t.category), t.category,t.amount , temp);
         tranMap.set(t.category, temp );
        }
      
    } );
    const [topCategory, highestValue] = [...tranMap].reduce(
      (max, current) => (current[1] > max[1] ? current : max)
    );
    //console.log(topCategory, highestValue);
    return {
      totalSpent: totalSpent,
      remaining: this.remaining,
      isOverBudget: this.isOverBudget,
      byCategory: tranMap,
      topCategory: topCategory
    }
  }
/*
  Add reset(category) method. If a category is provided, remove only transactions for that category and adjust this.spent accordingly. If no category is provided, reset everything (all transactions cleared, spent back to 0). Returns the amount that was removed.


  */

  reset(category = '') {
    let totalSpentByCat = 0;
    if(category != '') {
console.log("here2");
      const index = this.transactions.findIndex(item => item.category === category);

      if (index !== -1) {
        this.transactions.splice(index, 1);
      }
      
    } else {
      //reset all
      // delete all the transactions
      // spent = 0
      console.log("here");
      this.spent = 0;
      this.transactions = [];
    }
    return {
      transactions: this.transactions,
      spent: this.spent
    };
  }

}

module.exports = { BudgetTracker };