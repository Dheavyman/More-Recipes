import React from 'react';

import Header from '../../../components/userRecipes/Header';

describe('Header component', () => {
  let spy;

  afterEach(() => {
    spy.mockClear();
  });
  it('should render component', () => {
    spy = jest.spyOn(Header.prototype, 'componentDidMount');
    const props = {
      logoutUser: jest.fn(),
      history: {
        push: jest.fn(),
      },
      handleLogoutUser: jest.fn(),
      user: {
        isAuthenticated: true,
      },
    };
    const wrapper = shallow(<Header {...props} />);

    expect(wrapper).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(wrapper).toMatchSnapshot();
  });
});
