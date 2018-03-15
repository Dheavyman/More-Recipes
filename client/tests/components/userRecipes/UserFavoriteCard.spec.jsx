import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import UserFavoriteCard from '../../../components/userRecipes/UserFavoriteCard';

describe('UserFavoriteCard component', () => {
  it('should render component', () => {
    const props = {
      handleOpenDelete: jest.fn(),
      recipe: {
        title: 'Beans',
        category: 'Main',
        description: 'Tasty beans',
        preparationTime: 85,
        ingredients: 'Beans, onions, palm oil, salt',
        directions: 'Do this. Do that',
      },
      owner: {
        fullName: 'John Mark',
      },
      currentProfileUserId: 1,
      authenticatedUserId: null,
    };
    const wrapper = mount(
      <BrowserRouter><UserFavoriteCard {...props} /></BrowserRouter>
    );

    expect(wrapper).toBeDefined();
    expect(wrapper).toMatchSnapshot();
  });
  it('should simulate click action', () => {
    const props = {
      handleOpenDelete: jest.fn(),
      recipe: {
        title: 'Beans',
        category: 'Main',
        description: 'Tasty beans',
        preparationTime: 85,
        ingredients: 'Beans, onions, palm oil, salt',
        directions: 'Do this. Do that',
      },
      owner: {
        fullName: 'John Mark',
      },
      currentProfileUserId: 1,
      authenticatedUserId: 1,
    };
    const wrapper = mount(
      <BrowserRouter><UserFavoriteCard {...props} /></BrowserRouter>
    );

    expect(wrapper).toBeDefined();
    wrapper.find('a#remove-favorite').simulate('click');
    expect(props.handleOpenDelete).toBeCalled();
    expect(wrapper).toMatchSnapshot();
  });
});
