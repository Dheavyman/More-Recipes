import React from 'react';

import Navbar from '../../../components/common/Navbar';

describe('Navbar component', () => {
  it('should render component', () => {
    const props = {
      handleSubmitSignup: jest.fn(),
      handleSubmitSignin: jest.fn(),
      handleLogoutUser: jest.fn(),
      user: {
        isAuthenticated: false,
        userAuthentication: {},
        userProfile: {},
      },
    };
    const wrapper = shallow(<Navbar {...props} />);

    expect(wrapper).toBeDefined();
    expect(wrapper).toMatchSnapshot();
  });
  it('should simulate component did update', () => {
    const props = {
      handleSubmitSignup: jest.fn(),
      handleSubmitSignin: jest.fn(),
      handleLogoutUser: jest.fn(),
      user: {
        isAuthenticated: false,
        userAuthentication: {},
        userProfile: {},
      },
    };
    const nextProps = {
      user: {
        isAuthenticated: true,
        userAuthentication: {
          fullName: 'John Mark',
        },
        userProfile: {
          firstName: 'John',
          lastName: 'Mark',
        },
      },
    };
    const spy = jest.spyOn(Navbar.prototype, 'componentDidUpdate');
    const wrapper = shallow(<Navbar {...props} />);
    expect(wrapper).toBeDefined();
    wrapper.setProps(nextProps);
    expect(spy).toHaveBeenCalled();
    expect(wrapper).toMatchSnapshot();
  });
});
