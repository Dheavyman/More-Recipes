import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import UserRecipeCard from '../../../components/userRecipes/UserRecipeCard';

describe('UserRecipeCard component', () => {
  it('should render component', () => {
    const props = {
      recipe: {
        title: 'Rice and beans',
        description: 'Tasty rice and beans',
        recipeImage: 'Recipe image URL',
        views: 54,
        upvotes: 32,
        downvotes: 2,
        favorites: 45,
      },
      handleOpenEdit: jest.fn(),
      handleOpenDelete: jest.fn(),
      currentProfileUserId: 3,
      authenticatedUserId: 1,
    };
    const wrapper = mount(
      <BrowserRouter><UserRecipeCard {...props} /></BrowserRouter>
    );

    expect(wrapper).toBeDefined();
    expect(wrapper.find('a#edit-recipe-button').exists()).toEqual(false);
    expect(wrapper.find('a#delete-recipe-button').exists()).toEqual(false);
    expect(wrapper).toMatchSnapshot();
  });
  it('should simulate edit and delete recipe click events', () => {
    const props = {
      recipe: {
        title: 'Rice and beans',
        description: 'Tasty rice and beans',
        recipeImage: 'Recipe image URL',
        views: 54,
        upvotes: 32,
        downvotes: 2,
        favorites: 45,
      },
      handleOpenEdit: jest.fn(),
      handleOpenDelete: jest.fn(),
      currentProfileUserId: 1,
      authenticatedUserId: 1,
    };
    const wrapper = mount(
      <BrowserRouter><UserRecipeCard {...props} /></BrowserRouter>
    );

    expect(wrapper).toBeDefined();
    expect(wrapper.find('a#edit-recipe-button').exists()).toEqual(true);
    expect(wrapper.find('a#delete-recipe-button').exists()).toEqual(true);
    wrapper.find('a#edit-recipe-button').simulate('click');
    expect(props.handleOpenEdit).toBeCalled();
    wrapper.find('a#delete-recipe-button').simulate('click');
    expect(props.handleOpenDelete).toBeCalled();
    expect(wrapper).toMatchSnapshot();
  });
});
