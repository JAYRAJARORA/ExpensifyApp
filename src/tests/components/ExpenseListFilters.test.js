import React from 'react';
import {shallow} from 'enzyme';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { filters, altFilters } from '../fixtures/filters';
import moment from 'moment';

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
    setTextFilter = jest.fn();
    sortByAmount = jest.fn();
    sortByDate = jest.fn();
    setStartDate = jest.fn();
    setEndDate = jest.fn();
    wrapper = shallow(
        <ExpenseListFilters 
            filters={filters}
            sortByAmount={sortByAmount}
            sortByDate={sortByDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            setTextFilter={setTextFilter}
        />
    );
});

test('should render expense list filters correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should render expense list filters with alt data correctly', () => {
    wrapper.setProps({
        filters: altFilters
    });
    expect(wrapper).toMatchSnapshot();
});

test('should handle text chnage', () => {
    const value = 'rent';
    wrapper.find('input').simulate('change', {
        target: { value }
    });
    expect(setTextFilter).toHaveBeenLastCalledWith(value);
});

test('should sortBy Date', () => {
    wrapper.setProps({
        filters: altFilters
    });
    const value = 'date';
    wrapper.find('select').simulate('change', {
        target: { value }
    });
    expect(sortByDate).toHaveBeenCalled();
});

test('should sortBy amount', () => {
    const value = 'amount';
    wrapper.find('select').simulate('change', {
        target: { value }
    });
    expect(sortByAmount).toHaveBeenCalled();
});

test('should handle dates change', () => {
    const startDate = moment(0).add(4, 'years');
    const endDate = moment(0).add(8, 'years');
    wrapper.find('DateRangePicker').prop('onDatesChange')({ startDate, endDate});
    expect(setStartDate).toHaveBeenCalledWith(startDate);
    expect(setEndDate).toHaveBeenCalledWith(endDate);
});

test('should handle focus change', () => {
    const calendarFocused = 'endDate';
    wrapper.find('DateRangePicker').prop('onFocusChange')(calendarFocused);
    expect(wrapper.state('calendarFocused')).toBe(calendarFocused);
});
