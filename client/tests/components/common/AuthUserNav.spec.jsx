import React from 'react';

import AuthUserNav from '../../../components/common/AuthUserNav';

describe('Authenticated user navigation component', () => {
  const props = {
    handleLogoutUser: jest.fn(),
  };
  it('should render component', () => {
    const wrapper = shallow(<AuthUserNav {...props} />);
    expect(wrapper).toBeDefined();
    expect(wrapper).toMatchSnapshot();
  });
  it('should handle user logout onclick action', () => {
    const wrapper = shallow(<AuthUserNav {...props} />);
    wrapper.find('#logout').simulate('click');
    expect(props.handleLogoutUser).toBeCalled();
  });
});
