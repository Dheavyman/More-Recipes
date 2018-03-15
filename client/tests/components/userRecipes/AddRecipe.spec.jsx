import React from 'react';

import AddRecipe from '../../../components/userRecipes/AddRecipe';

describe('AddRecipe component', () => {
  it('should render component', () => {
    const props = {
      category: 'Breakfast',
      open: true,
      handleClose: jest.fn(),
      handleChange: jest.fn(),
      handleSelect: jest.fn(),
      handleAddRecipe: jest.fn(),
      handleDrop: jest.fn(),
      imagePreview: '',
      userRecipes: {
        isLoading: false,
        imageUploading: false,
        error: {},
      },
    };
    const wrapper = shallow(<AddRecipe {...props} />);

    expect(wrapper).toBeDefined();
    expect(wrapper).toMatchSnapshot();
  });
  it('should show spinner when adding recipe', () => {
    const props = {
      category: 'Breakfast',
      open: true,
      handleClose: jest.fn(),
      handleChange: jest.fn(),
      handleSelect: jest.fn(),
      handleAddRecipe: jest.fn(),
      handleDrop: jest.fn(),
      imagePreview: 'Image file local url',
      userRecipes: {
        isLoading: true,
        imageUploading: true,
        error: {},
      },
    };
    const wrapper = shallow(<AddRecipe {...props} />);

    expect(wrapper).toBeDefined();
    expect(wrapper.find('Spinner').length).toEqual(1);
    expect(wrapper).toMatchSnapshot();
  });
  it('should show error message if any', () => {
    const props = {
      category: 'Breakfast',
      open: true,
      handleClose: jest.fn(),
      handleChange: jest.fn(),
      handleSelect: jest.fn(),
      handleAddRecipe: jest.fn(),
      handleDrop: jest.fn(),
      imagePreview: 'Image file local url',
      userRecipes: {
        isLoading: false,
        imageUploading: false,
        error: {
          message: 'Error adding recipe',
        },
      },
    };
    const wrapper = shallow(<AddRecipe {...props} />);

    expect(wrapper).toBeDefined();
    expect(wrapper.find('Spinner').length).toEqual(0);
    expect(wrapper.find('ErrorMessage').length).toEqual(1);
    expect(wrapper.find('ErrorMessage').dive().text())
      .toEqual('Error adding recipe');
    expect(wrapper).toMatchSnapshot();
  });
});
