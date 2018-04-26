import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

it('renders welcome message', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.contains(<h1 className="App-title">EOS Blocks</h1>)).toEqual(true);
});