import React from 'react';

import Main from '../../../components/catalogPage/Main';

describe('Main component', () => {
  it('should render component', () => {
    const props = {
      recipes: {
        searchResult: [],
      },
      location: {
        search: '',
      },
      searchedTerm: '',
      searchPerformed: false,
      scrollToTop: jest.fn(),
    };
    const wrapper = shallow(<Main {...props} />);

    expect(wrapper).toBeDefined();
    expect(wrapper.find('SearchResult').exists()).toEqual(false);
    expect(wrapper.find('CatalogResult').exists()).toEqual(true);
    expect(wrapper).toMatchSnapshot();
  });
  it('should render search results', () => {
    const props = {
      recipes: {
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
      location: {
        search: 'ingredients',
      },
      searchedTerm: 'beans',
      searchPerformed: true,
      scrollToTop: jest.fn(),
    };
    const wrapper = shallow(<Main {...props} />);

    expect(wrapper).toBeDefined();
    expect(wrapper.find('SearchResult').exists()).toEqual(true);
    expect(wrapper.find('CatalogResult').exists()).toEqual(false);
    expect(wrapper).toMatchSnapshot();
  });
  it('should render notification when no recipe is found after search', () => {
    const props = {
      recipes: {
        searchResult: [],
      },
      location: {
        search: 'ingredients',
      },
      searchedTerm: 'plantain porridge',
      searchPerformed: true,
      scrollToTop: jest.fn(),
    };
    const wrapper = shallow(<Main {...props} />);

    expect(wrapper).toBeDefined();
    expect(wrapper.find('SearchResult').exists()).toEqual(true);
    expect(wrapper.find('CatalogResult').exists()).toEqual(false);
    expect(wrapper).toMatchSnapshot();
  });
});
