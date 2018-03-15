import React from 'react';

import RecipeDetails from '../../../components/singleRecipePage/RecipeDetails';

describe('RecipeDetails component', () => {
  it('should render component', () => {
    const props = {
      recipe: {
        category: 'Lunch',
        description: 'Tasty dish',
        preparationTime: 55,
        ingredients: 'Rice, beans, tomatoes, salt',
        directions: 'Do this. Do this. Do that',
      }
    };
    const wrapper = shallow(<RecipeDetails {...props} />);

    expect(wrapper).toBeDefined();
    expect(wrapper).toMatchSnapshot();
  });
});
