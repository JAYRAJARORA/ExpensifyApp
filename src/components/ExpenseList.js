import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';

export const ExpenseList = (props) => (
    <div>
        {
            props.expenses.length === 0 ? (
                <p>No expenses</p>
            ) : (
                props.expenses.map((expense) => (
                    <ExpenseListItem key={expense.id} {...expense}/>
                ))
            )
        }
    </div>
);

// mapping redux store state to react component props
// when store changes this is automatically going to rerun bringing in fresh values
const mapStateToProps = (state) => {
    return {
        expenses: selectExpenses(state.expenses, state.filters),
    };
};

// an HOC
export default connect(mapStateToProps)(ExpenseList); 