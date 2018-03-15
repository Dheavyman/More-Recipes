import React from 'react';

import Main from '../../../components/singleRecipePage/Main';

describe('Main component', () => {
  let spy;

  afterEach(() => {
    spy.mockClear();
  });
  it('should render component', () => {
    spy = jest.spyOn(Main.prototype, 'componentDidMount');
    const props = {
      singleRecipe: {
        recipe: {},
        reviews: [],
        favoritedUsers: [],
        voters: [],
        voteMessage: 'Upvote recorded',
        favoriteMessage: 'Recipe added to favorites',
        hasMoreReviews: false,
        isLoadingReviews: false,
      },
      reviewContent: 'Review for a recipe',
      handleViewMoreReviews: jest.fn(),
      handleUpvote: jest.fn(),
      handleDownvote: jest.fn(),
      handleFavorite: jest.fn(),
    };
    const wrapper = shallow(<Main {...props} />);

    expect(wrapper).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(wrapper).toMatchSnapshot();
  });
  it('should render component with spinner', () => {
    const props = {
      singleRecipe: {
        recipe: {},
        reviews: [],
        favoritedUsers: [],
        voters: [],
        voteMessage: 'Upvote recorded',
        favoriteMessage: 'Recipe added to favorites',
        hasMoreReviews: false,
        isLoadingReviews: true,
      },
      reviewContent: 'Review for a recipe',
      handleViewMoreReviews: jest.fn(),
      handleUpvote: jest.fn(),
      handleDownvote: jest.fn(),
      handleFavorite: jest.fn(),
    };
    const wrapper = shallow(<Main {...props} />);

    expect(wrapper).toBeDefined();
    expect(wrapper.find('Spinner').length).toEqual(1);
    expect(wrapper).toMatchSnapshot();
  });
});
