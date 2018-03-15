import React from 'react';

import DeleteRecipe from '../../../components/userRecipes/DeleteRecipe';

describe('DeleteRecipe component', () => {
  it('should render component', () => {
    const props = {
      recipeId: 5,
      open: true,
      handleClose: jest.fn(),
      handleDeleteRecipe: jest.fn(),
      deleteMessage: 'Are you sure you want to delete this recipe',
      actionTitle: 'Delete Recipe',
      action: 'Delete',
      userRecipes: {
        isLoading: false,
      },
    };
    const wrapper = shallow(<DeleteRecipe {...props} />);

    expect(wrapper).toBeDefined();
    expect(wrapper).toMatchSnapshot();
  });
});
