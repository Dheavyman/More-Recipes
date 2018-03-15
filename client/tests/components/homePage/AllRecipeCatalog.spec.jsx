import React from 'react';

import AllRecipeCatalog from '../../../components/homepage/AllRecipeCatalog';

describe('AllRecipeCatalog component', () => {
  it('should render the component', () => {
    const props = {
      recipesCatalog: [],
      recipes: {
        isFetchingRecipes: false,
      },
    };
    const wrapper = shallow(<AllRecipeCatalog {...props} />);

    expect(wrapper).toBeDefined();
    expect(wrapper).toMatchSnapshot();
  });
  it('should render component with spinner when fetching recipe', () => {
    const props = {
      recipesCatalog: [],
      recipes: {
        isFetchingRecipes: true,
      },
    };
    const wrapper = shallow(<AllRecipeCatalog {...props} />);

    expect(wrapper).toBeDefined();
    expect(wrapper.find('Spinner').length).toEqual(1);
    expect(wrapper).toMatchSnapshot();
  });
  it('should render component with recipes card', () => {
    const props = {
      recipesCatalog: [{
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
      recipes: {
        isFetchingRecipes: false,
      },
    };
    const wrapper = shallow(<AllRecipeCatalog {...props} />);

    expect(wrapper).toBeDefined();
    expect(wrapper.find('RecipeCatalogCard').length).toEqual(2);
    expect(wrapper).toMatchSnapshot();
  });
});
