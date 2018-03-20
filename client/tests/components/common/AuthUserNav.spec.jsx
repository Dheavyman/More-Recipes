import React from 'react';

import AuthUserNav from '../../../components/common/AuthUserNav';
import userMockData from '../../__mocks__/user';

describe('Authenticated user navigation component', () => {
  beforeEach(() => {
    localStorage.setItem(
      'token',
      userMockData.signinSuccessResponse.data.user.token
    );
  });
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
