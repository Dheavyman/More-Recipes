import React from 'react';

import CatalogResult from '../../../components/catalogPage/CatalogResult';

describe('CatalogResult component', () => {
  it('should render component', () => {
    const props = {
      recipes: {
        recipes: [{
          title: 'Beans',
          category: 'Main',
          description: 'Tasty beans',
          preparationTime: 85,
          ingredients: 'Beans, onions, palm oil, salt',
          directions: 'Do this. Do that',
        }],
        hasMore: false,
      },
      retrieveMoreRecipes: jest.fn(),
    };
    const wrapper = shallow(<CatalogResult {...props} />);

    expect(wrapper).toBeDefined();
    expect(wrapper.find('RecipeCatalogCard').length).toEqual(1);
    expect(wrapper).toMatchSnapshot();
  });
});
