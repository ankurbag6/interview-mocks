const { BudgetTracker } = require('../src/budget');

describe('BudgetTracker', () => {
  test('tracks spending correctly', () => {
    const b = new BudgetTracker(1000);
    b.spend('food', 200);
    expect(b.spent).toBe(200);
    expect(b.remaining).toBe(800);
  });

  test('detects over budget', () => {
    const b = new BudgetTracker(100);
    b.spend('food', 150);
    expect(b.isOverBudget).toBe(true);
  });

  test('throws on invalid amount', () => {
    const b = new BudgetTracker(1000);
    expect(() => b.spend('food', -50)).toThrow();
  });
});