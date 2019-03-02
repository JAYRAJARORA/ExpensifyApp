import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './Router/AppRouter.js';
import 'normalize.css/normalize.css';
import createStore from './store/configureStore';
import {addExpense} from './actions/expenses';
import {setTextFilter} from './actions/filters';
import getVisibleExpenses from './selectors/expenses'
import './styles/styles.scss';
// react-dates is a calendar picker tool requires moment
import 'react-dates/lib/css/_datepicker.css';
// import './playground/promises';

const store = createStore();

// store.dispatch(addExpense({ description: 'Water Bill', amount: 4500 }));
// store.dispatch(addExpense({ description: 'Phone Bill', createdAt: 1000}));
// store.dispatch(addExpense({ description: 'Rent', amount: 1020303 }));

// store.dispatch(setTextFilter('water'));

// setTimeout(() => {
//     store.dispatch(setTextFilter('bill'));
// }, 3000);


// const state = store.getState(); 
// console.log(getVisibleExpenses(state.expenses, state.filters));

// provider provide a store to all the components that want it.
const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));
