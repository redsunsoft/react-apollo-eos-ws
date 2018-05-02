import React from 'react';
import {shallow} from 'enzyme';
import BlockTable from './BlockTable';
import BlockItem from '../BlockItem/BlockItem';

const blocks = [{
    block_num: 777,
    timestamp: '2018-04-26T15:22:11.500',
    producer: 'eos',
    input_transactions: []
}];

it('renders a list of blocks', () => {
    const wrapper = shallow(<BlockTable blocks={blocks} isStreamPaused={false} />);
    expect(wrapper.find('BlockItem').length).toEqual(1);
});
