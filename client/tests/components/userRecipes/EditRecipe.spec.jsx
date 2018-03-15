import React from 'react';

import EditRecipe from '../../../components/userRecipes/EditRecipe';

describe('EditRecipe component', () => {
  it('should render component', () => {
    const props = {
      open: true,
      handleClose: jest.fn(),
      handleEditChange: jest.fn(),
      handleSelect: jest.fn(),
      handleEditRecipe: jest.fn(),
      handleDrop: jest.fn(),
      imagePreview: '',
      recipeToEdit: {
        title: 'Beans',
        category: 'Main',
        description: 'Tasty beans',
        preparationTime: 85,
        ingredients: 'Beans, onions, palm oil, salt',
        directions: 'Do this. Do that',
      },
      userRecipes: {
        isLoading: false,
        imageUploading: false,
        error: {},
      },
    };
    const wrapper = shallow(<EditRecipe {...props} />);

    expect(wrapper).toBeDefined();
    expect(wrapper).toMatchSnapshot();
  });
  it('should show spinner when updating recipe', () => {
    const props = {
      open: true,
      handleClose: jest.fn(),
      handleEditChange: jest.fn(),
      handleSelect: jest.fn(),
      handleEditRecipe: jest.fn(),
      handleDrop: jest.fn(),
      imagePreview: 'Recipe image',
      recipeToEdit: {
        title: 'Beans',
        category: 'Main',
        description: 'Tasty beans',
        preparationTime: 85,
        ingredients: 'Beans, onions, palm oil, salt',
        directions: 'Do this. Do that',
      },
      userRecipes: {
        isLoading: true,
        imageUploading: true,
        error: {},
      },
    };
    const wrapper = shallow(<EditRecipe {...props} />);

    expect(wrapper).toBeDefined();
    expect(wrapper.find('Spinner').length).toEqual(1);
    expect(wrapper).toMatchSnapshot();
  });
  it('should show error message if any', () => {
    const props = {
      open: true,
      handleClose: jest.fn(),
      handleEditChange: jest.fn(),
      handleSelect: jest.fn(),
      handleEditRecipe: jest.fn(),
      handleDrop: jest.fn(),
      imagePreview: 'Recipe image',
      recipeToEdit: {
        title: 'Beans',
        category: 'Main',
        description: 'Tasty beans',
        preparationTime: 85,
        ingredients: 'Beans, onions, palm oil, salt',
        directions: 'Do this. Do that',
      },
      userRecipes: {
        isLoading: false,
        imageUploading: false,
        error: {
          message: 'Error updating recipe',
        },
      },
    };
    const wrapper = shallow(<EditRecipe {...props} />);

    expect(wrapper).toBeDefined();
    expect(wrapper.find('ErrorMessage').dive().text())
      .toEqual('Error updating recipe');
    expect(wrapper).toMatchSnapshot();
  });
});
