import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import Immutable from 'immutable';
import { DashboardPage } from './DashboardPage';

describe('DashboardPage', () => {
  const mockStore = configureStore();
  let store;
  const initialState = {
    'calendar-page': {},
  };
  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('renders panels if shift present', async () => {
    const props = {
      isFetchingShift: false,
      hasActiveShift: true,
      shift: Immutable.fromJS({
        shiftid: 'shiftid',
      }),
    };

    const wrapper = shallow(<DashboardPage
      store={store}
      {...props}
    />);

    expect(wrapper.find('DashboardTitle')).toBeDefined();
    expect(wrapper.find('DashboardPanel')).toBeDefined();
  });
});
