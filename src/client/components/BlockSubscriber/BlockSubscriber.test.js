import React from 'react';
import {shallow} from 'enzyme';
import {BlockSubscriber} from './BlockSubscriber';

const blocks = [{
    block_num: 777,
    timestamp: '2018-04-26T15:22:11.500',
    producer: 'eos',
    input_transactions: []
}];

it('does nothing with invalid data', () => {
    const spy = jest.fn(() => null);
    const data = {
          subscribeToMore: () => {},
          blocks: blocks
      };

    shallow(<BlockSubscriber data={data}>{spy}</BlockSubscriber>);

    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[0][0].blocks).toEqual(blocks);

    // need to test
        // subscribeToMore and updating data
        // state manipulation
});
