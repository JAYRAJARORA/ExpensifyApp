import { login, logout } from '../../actions/auth';

test('test login action working', () => {
    const action = login('a');
    expect(action).toEqual({
        type: 'LOGIN',
        uid: 'a'
    });
});

test('test logout action working', () => {
    const action = logout();
    expect(action).toEqual({
        type: 'LOGOUT'
    });
});