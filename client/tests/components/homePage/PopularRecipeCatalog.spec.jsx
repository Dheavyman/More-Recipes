import React from 'react';

import PopularRecipeCatalog from '../../../components/homepage/PopularRecipesCatalog'; // eslint-disable-line

describe('Popular recipe catalog component', () => {
  it('should render component', () => {
    const props = {
      recipes: {
        isFetchingPopularRecipes: false,
        popularRecipes: [],
      }
    };
    const wrapper = mount(<PopularRecipeCatalog {...props} />);

    expect(wrapper).toBeDefined();
    expect(wrapper).toMatchSnapshot();
  });
  it('should render component with spinner when fetching recipes', () => {
    const props = {
      recipes: {
        isFetchingPopularRecipes: true,
        popularRecipes: [],
      }
    };
    const wrapper = mount(<PopularRecipeCatalog {...props} />);

    expect(wrapper).toBeDefined();
    expect(wrapper.find('Spinner').length).toEqual(1);
    expect(wrapper).toMatchSnapshot();
  });
  it('should render component with child recipe catalog card', () => {
    const props = {
      recipes: {
        isFetchingPopularRecipes: false,
        popularRecipes: [{
          id: 1,
          title: 'Rice',
          category: 'Dinner',
          description: 'Tasty rice',
          preparationTime: 69,
          ingredients: 'Rice, tomatoes, salt',
          directions: 'Do this. Do this. Do that.',
          upvotes: 2,
          downvotes: 0,
          favorites: 5,
          votes: 3,
        }, {
          id: 2,
          title: 'Yam',
          category: 'Breakfast',
          description: 'Tasty yam',
          preparationTime: 50,
          ingredients: 'Yam, tomatoes, egg, salt',
          directions: 'Do this. Do this. Do that.',
          upvotes: 5,
          downvotes: 2,
          favorites: 4,
          votes: 5,
        }],
      },
    };
    const wrapper = shallow(<PopularRecipeCatalog {...props} />);

    expect(wrapper).toBeDefined();
    expect(wrapper.find('RecipeCatalogCard').length).toEqual(2);
    expect(wrapper).toMatchSnapshot();
  });
});
