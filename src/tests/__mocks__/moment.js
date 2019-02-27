// import moment from 'moment';
// for mocking libraries use this
const moment = require.requireActual('moment');

export default (timestamp = 0) => {
    return moment(timestamp);
}
