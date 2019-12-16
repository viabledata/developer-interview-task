import React from 'react';
import { shallow } from 'enzyme';
import DataSpinner from './DataSpinner';

describe('DataSpinner component', () => {
  it('renders loading text', async () => {
    const wrapper = shallow(<DataSpinner message="Loading content" />);
    expect(wrapper.find('#dataSpinner').exists()).toEqual(true);
    expect(wrapper.find('.loader-message').text()).toEqual('Loading content');
  });
});
