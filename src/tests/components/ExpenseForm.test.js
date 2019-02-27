import React from 'react';
import { shallow} from 'enzyme';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';
import moment from 'moment';

test('render expense form correctly', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
});

test('render expense form correctly with data', () => {
    const wrapper = shallow(<ExpenseForm expense={expenses[0]}/>); 
    expect(wrapper).toMatchSnapshot();
});

test('render error on invalid submission', () => {
    const wrapper = shallow(<ExpenseForm />); 
    expect(wrapper).toMatchSnapshot();
    wrapper.find('form').simulate('submit', {
        preventDefault: () => { }
    });
    expect(wrapper.state('error').length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot();
});

test('should set description on input', () => {
    const value = 'New description';
    const wrapper = shallow(<ExpenseForm />); 
    wrapper.find('input').at(0).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('description')).toBe(value);
});

test('should set note on textarea', () => {
    const value = 'this is a new note';
    const wrapper = shallow(<ExpenseForm />); 
    wrapper.find('textarea').simulate('change', {
        target: { value }
    });
    expect(wrapper.state('note')).toBe(value);
    
});

test('should set amount on valid input', () => {
    const value = '23.3';
    const wrapper = shallow(<ExpenseForm />); 
    wrapper.find('input').at(1).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('amount')).toBe(value);
});

test('should not set amount on invalid input', () => {
    const value = '23.333';
    const wrapper = shallow(<ExpenseForm />); 
    wrapper.find('input').at(1).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('amount')).toBe('');
});

test('should call onSubmit prop for valid form submission', () => {
    const onSubmitSpy = jest.fn();
    // onSubmitSpy('Andrew');
    // expect(onSubmitSpy).toHaveBeenCalledWith('Andrew');

    // render the expense form
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy}/>);
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    });
    expect(wrapper.state('error')).toBe('');
    expect(onSubmitSpy).toBeCalledWith({
        description: expenses[0].description,
        amount: expenses[0].amount,
        note: expenses[0].note,
        createdAt: expenses[0].createdAt
    });
});

test('should set new date on date change', () => {
    const now = moment();
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('SingleDatePicker').prop('onDateChange')(now);
    expect(wrapper.state('createdAt')).toEqual(now);
});

test('should set calendar focused value on focus change', () => {
    const focused = true;
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('SingleDatePicker').prop('onFocusChange')({ focused });
    expect(wrapper.state('calenderFocused')).toBe(focused);
});