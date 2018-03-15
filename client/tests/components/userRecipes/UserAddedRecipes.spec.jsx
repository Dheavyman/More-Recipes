import React from 'react';

import UserAddedRecipes from '../../../components/userRecipes/UserAddedRecipes';

describe('UserAddedRecipes component', () => {
  it('should render component', () => {
    const props = {
      fetchUserRecipes: jest.fn(),
      currentProfileUserId: 1,
      userRecipes: {
        isFetchingUserRecipes: false,
        userAddedRecipes: [],
      },
    };
    const wrapper = shallow(<UserAddedRecipes {...props} />);

    expect(wrapper).toBeDefined();
    expect(wrapper).toMatchSnapshot();
  });
  it('should render spinner', () => {
    const props = {
      fetchUserRecipes: jest.fn(),
      currentProfileUserId: 1,
      userRecipes: {
        isFetchingUserRecipes: true,
        userAddedRecipes: [],
      },
    };
    const wrapper = shallow(<UserAddedRecipes {...props} />);

    expect(wrapper).toBeDefined();
    expect(wrapper.find('Spinner').length).toEqual(1);
    expect(wrapper).toMatchSnapshot();
  });
  it('should render recipes fetched', () => {
    const props = {
      fetchUserRecipes: jest.fn(),
      currentProfileUserId: 1,
      userRecipes: {
        isFetchingUserRecipes: false,
        userAddedRecipes: [{
          title: 'Beans',
          category: 'Main',
          description: 'Tasty beans',
          preparationTime: 85,
          ingredients: 'Beans, onions, palm oil, salt',
          directions: 'Do this. Do that',
        }, {
          title: 'Beans and rice',
          category: 'Dinner',
          description: 'Tasty beans and rice',
          preparationTime: 95,
          ingredients: 'Beans, rice, onions, palm oil, salt',
          directions: 'Do this. Do this. Do that',
        }],
      },
    };
    const wrapper = shallow(<UserAddedRecipes {...props} />);

    expect(wrapper).toBeDefined();
    expect(wrapper.find('UserRecipeCard').length).toEqual(2);
    expect(wrapper).toMatchSnapshot();
  });
});
