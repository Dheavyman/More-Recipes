import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import RecipeCatalogCard from '../../../components/common/RecipeCatalogCard';

describe('RecipeCatalogCard component', () => {
  it('should render component', () => {
    const props = {
      user: {
        isAuthenticated: true,
      },
      recipe: {
        id: 1,
        title: 'Beans',
        category: 'Main',
        description: 'Tasty beans',
        preparationTime: 85,
        ingredients: 'Beans, onions, palm oil, salt',
        directions: 'Do this. Do that',
        views: 34,
        upvotes: 20,
        downvotes: 48,
        favorites: 5,
        User: {
          id: 1,
          fullName: 'John Mark',
        },
      },
    };
    const wrapper = mount(
      <BrowserRouter><RecipeCatalogCard {...props} /></BrowserRouter>
    );
    expect(wrapper).toBeDefined();
    expect(wrapper).toMatchSnapshot();
  });
  it('should notify users to signin before viewing other users profile', () => {
    const props = {
      user: {
        isAuthenticated: false,
      },
      recipe: {
        id: 1,
        title: 'Beans',
        category: 'Main',
        description: 'Tasty beans',
        preparationTime: 85,
        ingredients: 'Beans, onions, palm oil, salt',
        directions: 'Do this. Do that',
        views: 34,
        upvotes: 20,
        downvotes: 48,
        favorites: 5,
        User: {
          id: 1,
          fullName: 'John Mark',
        },
      },
    };
    const wrapper = mount(
      <BrowserRouter><RecipeCatalogCard {...props} /></BrowserRouter>
    );

    expect(wrapper).toBeDefined();
    wrapper.find('a#view-user-profile').simulate('click', {
      preventDefault: jest.fn(),
    });
    expect(wrapper).toMatchSnapshot();
  });
});
