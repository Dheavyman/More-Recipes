import React from 'react';

import ReviewCollection from '../../../components/singleRecipePage/ReviewCollection';

describe('ReviewCollection component', () => {
  it('should render component', () => {
    const props = {
      reviews: [],
      singleRecipe: {
        isLoadingReviews: false,
      }
    };
    const wrapper = shallow(<ReviewCollection {...props} />);

    expect(wrapper).toBeDefined();
    expect(wrapper).toMatchSnapshot();
  });
  it('should render spinner when loading reviews', () => {
    const props = {
      reviews: [],
      singleRecipe: {
        isLoadingReviews: true,
      }
    };
    const wrapper = shallow(<ReviewCollection {...props} />);

    expect(wrapper).toBeDefined();
    expect(wrapper.find('Spinner').length).toEqual(1);
    expect(wrapper).toMatchSnapshot();
  });
  it('should render component with reviews', () => {
    const props = {
      reviews: [{
        id: 1,
        content: 'A review for the recipe',
      }, {
        id: 2,
        content: 'Another review for the recipe',
      }],
      singleRecipe: {
        isLoadingReviews: false,
      },
      handleDeleteReview: jest.fn(),
    };
    const wrapper = shallow(<ReviewCollection {...props} />);

    expect(wrapper).toBeDefined();
    expect(wrapper.find('Review').length).toEqual(2);
    expect(wrapper).toMatchSnapshot();
  });
});
