const { BudgetTracker } = require('./budget');

const budget = new BudgetTracker(1000);

budget.spend('food', 200);
budget.spend('transport', 150);
budget.spend('food', 100);

console.log(budget.remaining);    // 550
console.log(budget.isOverBudget); // false

console.log(budget.spendByCategory('food'));
console.log(budget.spendByCategory('aasdasdsa'));
console.log(budget.summary());

console.log(budget.reset());