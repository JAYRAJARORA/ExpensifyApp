import selectExpenses from '../../selectors/expenses';
import moment from 'moment';
import expenses from '../fixtures/expenses';

test('should filter by text value', () => {
    const filters = {
        startDate: undefined,
        endDate: undefined,
        text: 'e',
        sortBy: 'date'
    };
    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([expenses[2], expenses[1]]);
});

test('filter by start date', () => {
    const filters = {
        startDate: moment(0),
        endDate: undefined,
        text: '',
        sortBy: 'date'
    };
    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([expenses[2], expenses[0]]);
});

test('filter by end date', () => {
    const filters = {
        startDate: undefined,
        endDate: moment(0),
        text: '',
        sortBy: 'date'
    };
    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([expenses[0], expenses[1]]);
});

test('sort by date', () => {
    const filters = {
        startDate: undefined,
        endDate: undefined,
        text: '',
        sortBy: 'date'
    };
    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([expenses[2], expenses[0], expenses[1]]);
});

test('sort by amount', () => {
    const filters = {
        startDate: undefined,
        endDate: undefined,
        text: '',
        sortBy: 'amount'
    };
    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([expenses[1], expenses[2], expenses[0]]);
});
