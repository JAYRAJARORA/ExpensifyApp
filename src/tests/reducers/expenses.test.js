import expensesReducers from '../../reducers/expenses';
import expenses from '../fixtures/expenses';
import moment from 'moment';

test('should set up default values', () => {
    const state = expensesReducers(undefined, { type: "@@INIT" });
    expect(state).toEqual([]);
});

test('should remove expense by id', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id
    };

    const state = expensesReducers(expenses, action);
    expect(state).toEqual([
        expenses[0], expenses[2]
    ])
});

test('should not remove expense if id not found', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: -1
    };

    const state = expensesReducers(expenses, action);
    expect(state).toEqual(expenses);
});

test('should add an expense', () => {
    const expense = {
        'id': 4,
        description: 'Rum',
        note: '',
        amount: 45000,
        createdAt: moment(0).add(5, 'days').valueOf()
    };
    const action = {
        type: 'ADD_EXPENSE',
        expense
    };
    const state = expensesReducers(expenses, action);
    expect(state).toEqual([
        ...expenses,
        expense
    ]);
});

test('should edit an expense', () => {
    const updates = {
        description: 'Rum',
        note: 'Regularly used medicine'
    };
    const action = {
        type: 'EDIT_EXPENSE',
        id: expenses[0].id,
        updates
    };
    const state = expensesReducers(expenses, action);
    expect(state[0].description).toBe(updates.description);
    expect(state[0].note).toBe(updates.note);
});

test('should not edit an expense if id is not existing', () => {
    const updates = {
        description: 'Rum',
        note: 'Regularly used medicine'
    };
    const action = {
        type: 'EDIT_EXPENSE',
        id: '-1',
        updates
    };
    const state = expensesReducers(expenses, action);
    expect(state).toEqual(expenses);
});
