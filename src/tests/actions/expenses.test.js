import {addExpense, removeExpense, editExpense } from '../../actions/expenses';

test('should create remove expense action object', () => {
    const action = removeExpense({id: 'abc123'});
    expect(action).toEqual({
        type: "REMOVE_EXPENSE",
        id: "abc123"
    });
});

test('should create edit expense action object', () => {
    const action = editExpense('abc123', { note: 'This is a difficult time'});
    expect(action).toEqual({
        type: "EDIT_EXPENSE",
        id: "abc123",
        updates: { note: 'This is a difficult time'}
    });
});

test('should setup add expense action object with provided values', () => {
    const expenseData = {
        description: 'rent',
        note: 'diff',
        createdAt: 1000,
        amount: 5400
    };
    const action = addExpense(expenseData);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expenseData,
            // see the type of value
            id: expect.any(String)
        }
    });
});

test('should setup add expense action object with default values', () => {
    const action = addExpense();
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            description: '',
            note: '',
            createdAt: 0,
            amount: 0,
            id: expect.any(String)
        }
    });
});