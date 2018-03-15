import React from 'react';

import Review from '../../../components/singleRecipePage/Review';

describe('Review component', () => {
  it('should render component', () => {
    const props = {
      review: {
        id: 2,
        recipeId: 3,
        userId: 1,
        User: {
          fullName: 'John Cane',
          userImage: 'User image url',
        },
        content: 'Wonderful recipe idea',
        createdAt: 'createdAt',
      },
      handleDeleteReview: jest.fn(),
    };
    const wrapper = shallow(<Review {...props} />);

    expect(wrapper).toBeDefined();
    expect(wrapper).toMatchSnapshot();
  });
});
