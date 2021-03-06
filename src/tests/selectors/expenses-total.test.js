import getExpensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';

test('should return 0 if no expense', () => {
    const total = getExpensesTotal([]);
    expect(total).toBe(0);
});

test('should correctly add a single expense', () => {
    const total = getExpensesTotal([expenses[1]]);
    expect(total).toBe(expenses[1].amount);
});

test('should correctly add multiple expenses', () => {
    const total = getExpensesTotal(expenses);
    expect(total).toBe(114195);
});