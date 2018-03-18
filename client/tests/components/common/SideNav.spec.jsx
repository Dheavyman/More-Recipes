import React from 'react';

import SideNav from '../../../components/common/SideNav';
import userMockData from '../../__mocks__/user';

describe('SideNav component', () => {
  let spy;

  beforeEach(() => {
    localStorage.setItem(
      'token',
      userMockData.signinSuccessResponse.data.user.token
    );
  });
  afterEach(() => {
    spy.mockClear();
  });
  it('should render component for unauthenticated user', () => {
    const props = {
      handleToggleSignupModal: jest.fn(),
      handleToggleSigninModal: jest.fn(),
      handleLogoutUser: jest.fn(),
      handleSearchCategory: jest.fn(),
      user: {
        isAuthenticated: false,
        userProfile: {
          notifications: false,
        },
      },
      location: {
        pathname: 'path URL',
      },
      userRecipes: {
        userAddedRecipesCount: 0,
        userFavoritesCount: 0,
      },
      editUserProfile: jest.fn(),
      currentProfileUserId: 1,
      authenticatedUserId: 1,
    };
    spy = jest.spyOn(SideNav.prototype, 'componentDidMount');
    const wrapper = shallow(<SideNav {...props} />);

    expect(wrapper).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(wrapper).toMatchSnapshot();
  });
  it('should render component for authenticated user', () => {
    const props = {
      handleToggleSignupModal: jest.fn(),
      handleToggleSigninModal: jest.fn(),
      handleLogoutUser: jest.fn(),
      handleSearchCategory: jest.fn(),
      user: {
        isAuthenticated: true,
        userProfile: {
          notifications: false,
        },
      },
      location: {
        pathname: 'users/1/dashboard',
      },
      userRecipes: {
        userAddedRecipesCount: 0,
        userFavoritesCount: 0,
      },
      editUserProfile: jest.fn(),
      currentProfileUserId: 1,
      authenticatedUserId: 1,
    };
    const wrapper = shallow(<SideNav {...props} />);
    spy = jest.spyOn(wrapper.instance(), 'handleTabChange');

    expect(wrapper).toBeDefined();
    wrapper.find('a[name="user-recipes"]').simulate('click', {
      preventDefault: jest.fn(),
      target: {
        name: 'user-recipes'
      }
    });
    expect(wrapper).toMatchSnapshot();
  });
});
