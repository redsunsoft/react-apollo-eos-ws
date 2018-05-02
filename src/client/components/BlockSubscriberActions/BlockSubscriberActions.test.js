import React from 'react';
import {shallow} from 'enzyme';
import BlockSubscriberActions from './BlockSubscriberActions';

it('renders the correct pause button state when not paused', () => {
    const wrapper = shallow(<BlockSubscriberActions isStreamPaused={false} />);
    expect(wrapper.find('.pauseButton').text().includes('Pause')).toEqual(true);
});

it('renders the correct pause button state when paused', () => {
    const wrapper = shallow(<BlockSubscriberActions isStreamPaused={true} />);
    expect(wrapper.find('.pauseButton').text().includes('Unpause')).toEqual(true);
});
