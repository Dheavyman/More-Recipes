import React from 'react';

import UserFavorites from '../../../components/userRecipes/UserFavorites';

describe('UserFavorites  component', () => {
  let spy;

  afterEach(() => {
    spy.mockClear();
  });
  it('should render component', () => {
    spy = jest.spyOn(UserFavorites.prototype, 'componentDidMount');
    const props = {
      fetchUserFavorites: jest.fn(),
      currentProfileUserId: 1,
      userRecipes: {
        isFetchingUserFavorites: false,
        userFavorites: [],
      },
    };
    const wrapper = shallow(<UserFavorites {...props} />);

    expect(wrapper).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(wrapper.find('h5').text()).toEqual('No favorite recipes yet');
    expect(wrapper).toMatchSnapshot();
  });
  it('should show spinner', () => {
    const props = {
      fetchUserFavorites: jest.fn(),
      currentProfileUserId: 1,
      userRecipes: {
        isFetchingUserFavorites: true,
        userFavorites: [],
      },
    };
    const wrapper = shallow(<UserFavorites {...props} />);

    expect(wrapper).toBeDefined();
    expect(wrapper.find('Spinner').length).toEqual(1);
    expect(wrapper).toMatchSnapshot();
  });
  it('should show user favorite recipes', () => {
    const props = {
      fetchUserFavorites: jest.fn(),
      currentProfileUserId: 1,
      userRecipes: {
        isFetchingUserFavorites: false,
        userFavorites: [{
          Recipe: {
            id: 2,
            title: 'Beans',
            category: 'Main',
            description: 'Tasty beans',
            preparationTime: 85,
            ingredients: 'Beans, onions, palm oil, salt',
            directions: 'Do this. Do that',
          },
        }],
      },
    };
    const wrapper = shallow(<UserFavorites {...props} />);

    expect(wrapper).toBeDefined();
    expect(wrapper.find('UserFavoriteCard').length).toEqual(1);
    expect(wrapper).toMatchSnapshot();
  });
});
