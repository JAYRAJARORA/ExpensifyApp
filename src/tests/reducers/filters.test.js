import filterReducers from '../../reducers/filters';
import moment from 'moment';

test('should setup defualt values', () => {
    const state = filterReducers(undefined, { type: '@@INIT' });
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month'),
    });
});

test('should set sort By amount', () => {
    const state = filterReducers(undefined, { type: 'SORT_BY_AMOUNT' });
    expect(state.sortBy).toBe('amount');
});

test('should set sort By date', () => {
    const action = {
        type: "SORT_BY_DATE"
    };
    const currentState = {
        text: '',
        startDate: undefined,
        endDate: undefined,
        sortBy: 'amount'
    };
    const state = filterReducers(currentState, action);
    expect(state.sortBy).toBe('date');
});

test('should set text filter', () => {
    const text = 'hola';
    const action = {
        type: 'SET_TEXT_FILTER',
        text
    };
    const state = filterReducers(undefined, action);
    expect(state.text).toBe(text);
});

test('should set startDate', () => {
    const startDate = moment();
    const action = {
        type: 'SET_START_DATE',
        startDate
    };
    const state = filterReducers(undefined, action);
    expect(state.startDate).toEqual(startDate);
});

test('should set end Date', () => {
    const endDate = moment();
    const action = {
        type: 'SET_END_DATE',
        endDate
    };
    const state = filterReducers(undefined, action);
    expect(state.endDate).toEqual(endDate);
});