import { addExpense, removeExpense, editExpense, startAddExpense } from '../../actions/expenses';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

// config for mock store
const createMockStore = configureMockStore([thunk]);

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
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
        // expense: {
        //     ...expenseData,
        //     // see the type of value
        //     id: expect.any(String)
        // }
    });
});


test('should add expense to database and store', (done) => {
    const store = createMockStore({});
    const expenseData = { description: 'elect bill', note: 'good', amount: '34.4', createdAt: 3000 };
    // check if the action was correctly dispatched
    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });

        return database.ref(`expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
});

test('should add expense with defaults to database and store', () => {
    const store = createMockStore({});
    const expenseData = { description: '' , note: '', amount: 0, createdAt: 0 };
    // check if the action was correctly dispatched
    store.dispatch(startAddExpense({})).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });

        return database.ref(`expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
});

// test('should setup add expense action object with default values', () => {
//     const action = addExpense();
//     expect(action).toEqual({
//         type: 'ADD_EXPENSE',
//         expense: {
//             description: '',
//             note: '',
//             createdAt: 0,
//             amount: 0,
//             id: expect.any(String)
//         }
//     });
// });