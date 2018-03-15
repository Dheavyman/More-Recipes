import React from 'react';

import RecipeImage from '../../../components/common/RecipeImage';

describe('Recipe Image component', () => {
  const props = {
    title: 'Rice',
    recipeImage: 'recipe image URL',
  };
  it('should render the component', () => {
    const wrapper = shallow(<RecipeImage {...props} />);

    expect(wrapper).toBeDefined();
    expect(wrapper.contains(<img src="recipe image URL" alt="Rice" />))
      .toBe(true);
    expect(wrapper).toMatchSnapshot();
  });
});
