import React from 'react';
import { shallow } from 'enzyme';
import BlockItem from './BlockItem';

const block = {
  block_num: 777,
  input_transactions: []
};


it('renders welcome message', () => {
  const wrapper = shallow(<BlockItem block={block} showDetail={false} />);
  expect(wrapper.contains(block.block_num)).toEqual(true);
});