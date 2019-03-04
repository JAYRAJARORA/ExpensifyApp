import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history} from './Router/AppRouter.js';
import 'normalize.css/normalize.css';
import createStore from './store/configureStore';
import {startSetExpenses} from './actions/expenses';
import { login, logout } from './actions/auth';
import getVisibleExpenses from './selectors/expenses'
import './styles/styles.scss';
// react-dates is a calendar picker tool requires moment
import 'react-dates/lib/css/_datepicker.css';
// import './playground/promises';
import LoadingPage from './components/LoadingPage';
import { firebase } from './firebase/firebase';

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

let hasRendered = false;
const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRendered = true;
    }
};


ReactDOM.render(<LoadingPage />, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
    if(user) {
        console.log('uid', user.uid);
        store.dispatch(login(user.uid));
        store.dispatch(startSetExpenses()).then(() => {
            renderApp();
            if (history.location.pathname === '/') {
                history.push('/dashboard');
            }
        });
    } else {
        console.log('HERE');
        store.dispatch(logout());
        renderApp();
        history.push('/');
    }
});