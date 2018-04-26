import React from 'react';
import {shallow} from 'enzyme';
import BlockItem from './BlockItem';

const block = {
    block_num: 777,
    timestamp: '2018-04-26T15:22:11.500',
    producer: 'eos',
    input_transactions: []
};


it('renders blank if a valid block is not passed', () => {
    const wrapper = shallow(<BlockItem block={{}} showDetail={false} />);
    expect(wrapper.isEmptyRender()).toEqual(true);
});

it('renders block item with valid data', () => {
    const wrapper = shallow(<BlockItem block={block} showDetail={false} />);
    expect(wrapper.contains(block.block_num)).toEqual(true);
    expect(wrapper.contains(block.timestamp)).toEqual(true);
    expect(wrapper.contains(block.producer)).toEqual(true);
});

it('renders block item with without details showing', () => {
    const wrapper = shallow(<BlockItem block={block} showDetail={false} />);
    expect(wrapper.contains("input_transactions")).toEqual(false);
});

it('renders block item with with details showing', () => {
    const wrapper = shallow(<BlockItem block={block} showDetail={true} />);
    expect(wrapper.text().includes("input_transactions")).toEqual(true);
});
