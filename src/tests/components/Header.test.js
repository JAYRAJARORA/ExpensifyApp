import React from 'react';
import { shallow } from 'enzyme';
// import ReactShallowRenderer from 'react-test-renderer/shallow';
import Header from '../../components/Header';
// import toJSON from 'enzyme-to-json';

test('should render Header correctly', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper).toMatchSnapshot();
});