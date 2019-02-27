import { 
    setStartDate, 
    setEndDate, 
    sortByAmount, 
    sortByDate, 
    setTextFilter 
} from '../../actions/filters';
import moment from 'moment';

test('should generate set start date action object', () => {
    const action = setStartDate(moment(0));
    expect(action).toEqual({
        type: 'SET_START_DATE',
        startDate: moment(0)
    });
});

test('should generate set end date action object', () => {
    const action = setEndDate(moment(0));
    expect(action).toEqual({
        type: 'SET_END_DATE',
        endDate: moment(0)
    });
});

test('set up sort By amount action object', () => {
    expect(sortByAmount()).toEqual({
        type: 'SORT_BY_AMOUNT'
    });
});

test('set up sort By date action object', () => {
    expect(sortByDate()).toEqual({
        type: 'SORT_BY_DATE'
    });
});

test('set up text action object with provided value', () => {
    const action = setTextFilter('rented');
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: 'rented'
    });
});

test('set up text action object with default value', () => {
    const action = setTextFilter();
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: ''
    });
});