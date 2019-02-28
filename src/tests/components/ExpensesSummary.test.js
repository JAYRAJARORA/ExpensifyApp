import React from 'react';
import {ExpensesSummary} from '../../components/ExpensesSummary';
import { shallow} from 'enzyme';

test('should render expenses summary correctly fro 1 expense', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={1} expensesTotal={5.34}/>)
    expect(wrapper).toMatchSnapshot();
});

test('should render expenses summary correctly for 2 expenses', () => {
    const wrapper = shallow(<ExpensesSummary  expenseCount={4} expensesTotal={5455.55}/>)
    expect(wrapper).toMatchSnapshot();
});