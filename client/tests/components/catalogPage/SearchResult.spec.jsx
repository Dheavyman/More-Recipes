import React from 'react';

import SearchResult from '../../../components/catalogPage/SearchResult';

describe('SearchResult component', () => {
  it('should render component', () => {
    const props = {
      recipes: {
        isFetchingRecipes: false,
        searchResult: [],
      },
    };
    const wrapper = shallow(<SearchResult {...props} />);

    expect(wrapper).toBeDefined();
    expect(wrapper.find('RecipeCatalogCard').exists()).toEqual(false);
    expect(wrapper.find('Spinner').exists()).toEqual(false);
    expect(wrapper).toMatchSnapshot();
  });
  it('should render component with spinner when searching for recipe', () => {
    const props = {
      recipes: {
        isFetchingRecipes: true,
        searchResult: [],
      },
    };
    const wrapper = shallow(<SearchResult {...props} />);

    expect(wrapper).toBeDefined();
    expect(wrapper.find('RecipeCatalogCard').exists()).toEqual(false);
    expect(wrapper.find('Spinner').exists()).toEqual(true);
    expect(wrapper).toMatchSnapshot();
  });
  it('should render component with search results', () => {
    const props = {
      recipes: {
        isFetchingRecipes: false,
        searchResult: [{
          title: 'Beans',
          category: 'Main',
          description: 'Tasty beans',
          preparationTime: 85,
          ingredients: 'Beans, onions, palm oil, salt',
          directions: 'Do this. Do that',
          views: 350,
          upvotes: 48,
          downVotes: 2,
          favorites: 58,
        }],
      },
    };
    const wrapper = shallow(<SearchResult {...props} />);

    expect(wrapper).toBeDefined();
    expect(wrapper.find('RecipeCatalogCard').exists()).toEqual(true);
    expect(wrapper.find('Spinner').exists()).toEqual(false);
    expect(wrapper).toMatchSnapshot();
  });
});
