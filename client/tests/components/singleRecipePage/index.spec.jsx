import React from 'react';

import { Recipe } from '../../../components/singleRecipePage';
import userMockData from '../../__mocks__/user';

describe('Recipe component', () => {
  let spy;

  beforeEach(() => {
    localStorage.setItem(
      'token',
      userMockData.signinSuccessResponse.data.user.token
    );
  });
  afterEach(() => {
    spy.mockClear();
  });
  it('should render component', () => {
    const props = {
      singleRecipe: {
        isFetching: false,
        recipe: {},
        reviews: [],
      },
      user: {
        isAuthenticated: false,
      },
      fetchRecipe: jest.fn(),
      history: {
        push: jest.fn(),
      },
      match: {
        params: {
          recipeId: 2,
        },
      },
      postReview: jest.fn(),
      upvoteRecipe: jest.fn(),
      downvoteRecipe: jest.fn(),
      setFavorite: jest.fn(),
      fetchReviews: jest.fn(),
      clearReviews: jest.fn(),
      deleteReview: jest.fn(),
    };
    spy = jest.spyOn(Recipe.prototype, 'componentDidMount');
    const wrapper = shallow(<Recipe {...props} />);

    expect(wrapper).toBeDefined();
    expect(wrapper).toMatchSnapshot();
    expect(spy).toHaveBeenCalled();
    expect(props.fetchRecipe).toHaveBeenCalled();
    expect(props.fetchReviews).toHaveBeenCalled();
    wrapper.setProps({ singleRecipe: { isFetching: true } });
    expect(wrapper.find('Spinner').exists()).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
    wrapper.setProps({
      singleRecipe: {
        isFetching: false,
        hasMoreReviews: true,
        recipe: {
          id: 2,
          title: 'Beans',
          category: 'Main',
          description: 'Tasty beans',
          preparationTime: 85,
          ingredients: 'Beans, onions, palm oil, salt',
          directions: 'Do this. Do that',
          upvotes: 4,
          downvotes: 0,
          favorites: 8,
          views: 25,
        },
        reviews: [{
          content: 'Nice recipe',
        }],
      },
    });
    expect(wrapper.instance().state.offset).toEqual(1);
    expect(wrapper.find('Spinner').exists()).toBe(false);
    expect(wrapper.find('Main').exists()).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });
  it('should simulate instance methods call', () => {
    const props = {
      singleRecipe: {
        isFetching: false,
        recipe: {
          id: 2,
        },
        reviews: [],
      },
      user: {
        isAuthenticated: true,
      },
      fetchRecipe: jest.fn(),
      history: {
        push: jest.fn(),
      },
      match: {
        params: {
          recipeId: 2,
        },
      },
      postReview: jest.fn(() => Promise.resolve()),
      upvoteRecipe: jest.fn(),
      downvoteRecipe: jest.fn(),
      setFavorite: jest.fn(),
      fetchReviews: jest.fn(),
      clearReviews: jest.fn(),
      deleteReview: jest.fn(),
    };
    const event = {
      preventDefault: jest.fn(),
      target: {
        value: 'Change in input field',
      },
    };
    const wrapper = shallow(<Recipe {...props} />);
    spy = jest.spyOn(wrapper.instance(), 'handleChange');

    expect(wrapper).toBeDefined();
    wrapper.instance().handleChange(event);
    expect(spy).toBeCalled();
    wrapper.instance().handleAddReview(event);
    wrapper.instance().handleDeleteReview(2, 1);
    wrapper.instance().handleUpvote();
    wrapper.instance().handleDownvote();
    wrapper.instance().handleFavorite();
    wrapper.instance().handleViewMoreReviews();
    wrapper.instance().handleSearchCategory(event);
    expect(props.deleteReview).toBeCalled();
    expect(wrapper).toMatchSnapshot();
  });
  it('should clear review when component is been unmounted', () => {
    const props = {
      singleRecipe: {
        isFetching: false,
        recipe: {
          id: 2,
        },
        reviews: [],
      },
      user: {
        isAuthenticated: true,
      },
      fetchRecipe: jest.fn(),
      history: {
        push: jest.fn(),
      },
      match: {
        params: {
          recipeId: 2,
        },
      },
      postReview: jest.fn(),
      upvoteRecipe: jest.fn(),
      downvoteRecipe: jest.fn(),
      setFavorite: jest.fn(),
      fetchReviews: jest.fn(),
      clearReviews: jest.fn(),
      deleteReview: jest.fn(),
    };
    spy = jest.spyOn(Recipe.prototype, 'componentWillUnmount');
    const wrapper = shallow(<Recipe {...props} />);

    expect(wrapper).toBeDefined();
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
    expect(spy).toBeCalled();
    expect(props.clearReviews).toBeCalled();
    expect(wrapper).toMatchSnapshot();
  });
});
