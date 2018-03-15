import React from 'react';

import ErrorMessage from '../../../components/common/ErrorMessage';

describe('Error message component', () => {
  it('should render component and display error message', () => {
    const props = {
      message: 'Username already exist',
    };
    const wrapper = shallow(<ErrorMessage {...props} />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find('div').length).toEqual(1);
    expect(wrapper.find('div').text()).toEqual('Username already exist');
    expect(wrapper).toMatchSnapshot();
  });
  it('should display custom error message for unauthenticated user', () => {
    const props = {
      message: 'jwt expired',
    };
    const wrapper = shallow(<ErrorMessage {...props} />);
    expect(wrapper.find('div').text()).toEqual('Please login to continue');
    expect(wrapper).toMatchSnapshot();
  });
});
