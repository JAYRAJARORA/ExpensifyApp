import { createStore } from 'redux';

const incrementCount = ({ incrementBy = 1} = {}) => {
    return {
        type: 'INCREMENT',
        // incrementBy: typeof payload.incrementBy === 'number' ? payload.incrementBy : 1
        incrementBy
    }
}

const decrementCount = ({ decrementBy = 1 } = {}) => ({
    type: 'DECREMENT',
    decrementBy
});

const setCount = ({ count = 10 }) => ({
    type: 'SET',
    count
});

const resetCount = () => ({
    type: 'RESET'
});

// reducer takes in action and state, pure func, doesnt change state or action
const countReducer = (state = { count: 0 }, action) => {
    console.log('running');
    switch(action.type) {
        case 'INCREMENT':
            // const incrementBy = typeof action.incrementBy === 'number' ? action.incrementBy : 1;
            return {
                count: state.count + action.incrementBy
            };
        case 'DECREMENT':
            return {
                count: state.count - action.decrementBy
            };
        case 'SET':
            return {
                count: action.count
            }
        case 'RESET':
            return {
                count: 0
            }
        default: 
            return state;
    }
};

// create a redux state container with a defualt state value and function is called first time store is created
const store = createStore(countReducer);

// get called everytime the state changes - used as a watcher
const unsubscribe = store.subscribe(() => {
    // gets the current state object
    console.log(store.getState());
}) 

// dispatch an action(getting things to the store) . Action is an object sent in the store
// store.dispatch({
//     type: 'INCREMENT',
//     incrementBy: 5
// });
store.dispatch(incrementCount({ incrementBy: 5}));

//unsubscribe();
store.dispatch(incrementCount());

// generic action
store.dispatch(resetCount());

store.dispatch(decrementCount());

// dynamic actions
store.dispatch(decrementCount({ decrementBy: 10 }));

store.dispatch(setCount({ count: 50 }));
