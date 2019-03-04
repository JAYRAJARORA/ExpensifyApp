import { 
    addExpense, 
    removeExpense, 
    editExpense, 
    startAddExpense, 
    setExpenses, 
    startSetExpenses, 
    startRemoveExpense, 
    startEditExpense 
} from '../../actions/expenses';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

// config for mock store
const uid = 'testuserid';
const defaultAuthState = { auth : { uid }};
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
    const expenseData = {};
    expenses.forEach(({ id, description, amount, createdAt, note }) => {
        expenseData[id] = { description, amount, createdAt, note };
    });
    database.ref(`users/${uid}/expenses`).set(expenseData).then(() => done());
});


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
    const store = createMockStore(defaultAuthState);
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

        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
});

test('should add expense with defaults to database and store', (done) => {
    const store = createMockStore(defaultAuthState);
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

        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
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

test('should setup set expense action object with data', () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type:'SET_EXPENSES',
        expenses
    });
});

test('should fetch expenses from firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
        done();
    });
});

test('should remove expense from firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    const id = expenses[2].id;
    store.dispatch(startRemoveExpense({ id })).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id
        });
        return database.ref(`users/${uid}/expenses/${id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toBeFalsy();
        done(); 
    }).catch(e => {
        console.log('Error occurred', e);
        done();
    });
});

test('should edit expense from firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    const id = expenses[1].id;
    const updates = { note: 'this is addition to it', description: "Gummy"};
    store.dispatch(startEditExpense(id, updates)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'EDIT_EXPENSE',
            updates,
            id
        });
        return database.ref(`users/${uid}expenses/${id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val().description).toBe(updates.description);
        done(); 
    }).catch(e => {
        console.log('Error occurred', e);
        done();
    });
});