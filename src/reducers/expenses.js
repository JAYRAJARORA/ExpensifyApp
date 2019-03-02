// Expense reducer
const expensesReducerDefaultState = [];

export default (state = [], action) => {
    switch(action.type) {
        case 'ADD_EXPENSE': 
            // return state.concat(action.expense);
            return [
                ...state,
                action.expense
            ];
        case 'REMOVE_EXPENSE':
            return state.filter(({ id }) => id !== action.id); 
        case 'EDIT_EXPENSE': 
            return state.map((expense) => {
                if (expense.id === action.id) {
                    return {
                        // existing object
                        ...expense,
                        // set of updates which overides that
                        ...action.updates
                    };
                } else {
                    return expense;
                }
            });
        case 'SET_EXPENSES' :
            return action.expenses;
        default:
        return state;
    }
}