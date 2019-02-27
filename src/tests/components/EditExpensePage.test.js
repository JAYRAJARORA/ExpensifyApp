import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let editExpense, removeExpense, history, wrapper;

beforeEach(() => {
    editExpense = jest.fn();
    history = { push: jest.fn()};
    removeExpense = jest.fn();
    wrapper = shallow(
        <EditExpensePage 
            editExpense={editExpense} 
            history={history} 
            removeExpense={removeExpense}
            expense={expenses[2]}
        />
    );
});

test('should render edit expense page correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should handle edit expense page correctly', () => {
   wrapper.find('ExpenseForm').prop('onSubmit')(expenses[2]);
   expect(history.push).toHaveBeenLastCalledWith('/');
   expect(editExpense).toHaveBeenLastCalledWith(expenses[2].id, expenses[2]);
});

test('should handle remove expense page correctly', () => {
    wrapper.find('button').simulate('click');
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(removeExpense).toHaveBeenLastCalledWith({
        id: expenses[2].id
    });
 });