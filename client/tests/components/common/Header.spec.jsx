import React from 'react';

import Header from '../../../components/common/Header';

describe('Header component', () => {
  let spy;

  afterEach(() => {
    spy.mockClear();
  });
  it('should render component', () => {
    spy = jest.spyOn(Header.prototype, 'componentDidMount');
    const props = {
      signupUser: jest.fn(() => Promise.resolve()),
      signinUser: jest.fn(() => Promise.resolve()),
      logoutUser: jest.fn(() => Promise.resolve()),
      user: {
        isAuthenticated: false,
        userAuthentication: {
          message: null
        },
        error: {},
      },
      history: {
        push: jest.fn(),
      },
      location: {
        state: {
          from: {
            pathname: 'URL'
          },
        },
      },
      handleSearchCategory: jest.fn(),
    };
    const wrapper = shallow(<Header {...props} />);

    expect(wrapper).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(wrapper).toMatchSnapshot();
  });
  it('should render component', () => {
    const props = {
      signupUser: jest.fn(() => Promise.resolve()),
      signinUser: jest.fn(() => Promise.resolve()),
      logoutUser: jest.fn(() => Promise.resolve()),
      user: {
        isAuthenticated: false,
        userAuthentication: {
          message: null
        },
        error: {},
      },
      history: {
        push: jest.fn(),
      },
      location: {
        state: {
          from: {
            pathname: 'URL'
          },
        },
      },
      handleSearchCategory: jest.fn(),
    };
    const wrapper = shallow(<Header {...props} />);

    expect(wrapper).toBeDefined();
    wrapper.instance().handleToggleSignupModal();
    expect(wrapper.instance().state.openSignup).toEqual(true);
    wrapper.instance().handleToggleSigninModal();
    expect(wrapper.instance().state.openSignin).toEqual(true);
    wrapper.instance().handleToggleModal();
    expect(wrapper.instance().state.openSignup).toEqual(false);
    expect(wrapper.instance().state.openSignup).toEqual(false);
    expect(wrapper).toMatchSnapshot();
  });
  it('should handle user signup event', () => {
    const props = {
      signupUser: jest.fn(() => Promise.resolve()),
      signinUser: jest.fn(() => Promise.resolve()),
      logoutUser: jest.fn(() => Promise.resolve()),
      user: {
        isAuthenticated: false,
        userAuthentication: {
          message: null
        },
        error: {},
      },
      history: {
        push: jest.fn(),
      },
      location: {
        state: {
          from: {
            pathname: 'URL'
          },
        },
      },
      handleSearchCategory: jest.fn(),
    };
    const wrapper = shallow(<Header {...props} />);
    spy = jest.spyOn(wrapper.instance(), 'handleSubmitSignup');

    expect(wrapper).toBeDefined();
    wrapper.instance().handleSubmitSignup();
    expect(spy).toBeCalled();
    expect(props.signupUser).toBeCalled();
    expect(wrapper).toMatchSnapshot();
  });
  it('should handle user signin event', () => {
    const props = {
      signupUser: jest.fn(() => Promise.resolve()),
      signinUser: jest.fn(() => Promise.resolve()),
      logoutUser: jest.fn(() => Promise.resolve()),
      user: {
        isAuthenticated: false,
        userAuthentication: {
          message: null
        },
        error: {},
      },
      history: {
        push: jest.fn(),
      },
      location: {
        state: {
          from: {
            pathname: 'URL'
          },
        },
      },
      handleSearchCategory: jest.fn(),
    };
    const wrapper = shallow(<Header {...props} />);
    spy = jest.spyOn(wrapper.instance(), 'handleSubmitSignin');

    expect(wrapper).toBeDefined();
    wrapper.instance().handleSubmitSignin();
    expect(spy).toBeCalled();
    expect(props.signinUser).toBeCalled();
    expect(wrapper).toMatchSnapshot();
  });
  it('should handle user signin and redirect user to former location', () => {
    const props = {
      signupUser: jest.fn(() => Promise.resolve()),
      signinUser: jest.fn(() => Promise.resolve()),
      logoutUser: jest.fn(() => Promise.resolve()),
      user: {
        isAuthenticated: false,
        userAuthentication: {
          message: null
        },
        error: {},
      },
      history: {
        push: jest.fn(),
      },
      location: {},
      handleSearchCategory: jest.fn(),
    };
    const wrapper = shallow(<Header {...props} />);
    spy = jest.spyOn(wrapper.instance(), 'handleSubmitSignin');

    expect(wrapper).toBeDefined();
    wrapper.instance().handleSubmitSignin();
    expect(spy).toBeCalled();
    expect(props.signinUser).toBeCalled();
    expect(wrapper).toMatchSnapshot();
  });
  it('should handle user logout event', () => {
    const props = {
      signupUser: jest.fn(() => Promise.resolve()),
      signinUser: jest.fn(() => Promise.resolve()),
      logoutUser: jest.fn(() => Promise.resolve()),
      user: {
        isAuthenticated: true,
        userAuthentication: {
          message: null
        },
        error: {},
      },
      history: {
        push: jest.fn(),
      },
      location: {
        state: {
          from: {
            pathname: 'URL'
          },
        },
      },
      handleSearchCategory: jest.fn(),
    };
    const wrapper = shallow(<Header {...props} />);
    spy = jest.spyOn(wrapper.instance(), 'handleLogoutUser');

    expect(wrapper).toBeDefined();
    wrapper.instance().handleLogoutUser();
    expect(spy).toBeCalled();
    expect(props.logoutUser).toBeCalled();
    expect(wrapper).toMatchSnapshot();
  });
});
