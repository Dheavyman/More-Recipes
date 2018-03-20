import React from 'react';

import Review from '../../../components/singleRecipePage/Review';
import userMockData from '../../__mocks__/user';

describe('Review component', () => {
  beforeEach(() => {
    localStorage.setItem(
      'token',
      userMockData.signinSuccessResponse.data.user.token
    );
  });
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
  it('should handle delete review event', () => {
    const props = {
      review: {
        id: 2,
        recipeId: 3,
        userId: 2,
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
    wrapper.find('i#delete-review').simulate('click');
    expect(props.handleDeleteReview).toBeCalled();
    expect(wrapper).toMatchSnapshot();
  });
});
