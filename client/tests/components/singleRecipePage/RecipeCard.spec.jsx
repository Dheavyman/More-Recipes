import React from 'react';

import RecipeCard from '../../../components/singleRecipePage/RecipeCard';

describe('RecipeCard component', () => {
  it('should render component', () => {
    const props = {
      singleRecipe: {
        recipe: {
          title: 'Macaroni',
          recipeImage: 'Recipe image URL',
          upvotes: 4,
          downvotes: 0,
          favorites: 8,
          views: 25,
        },
        favoritedUsers: [],
        voters: [],
      },
      handleUpvote: jest.fn(),
      handleDownvote: jest.fn(),
      handleFavorite: jest.fn(),
    };
    const wrapper = shallow(<RecipeCard {...props} />);

    expect(wrapper).toBeDefined();
    expect(wrapper).toMatchSnapshot();
  });
  it('should render component with upvote', () => {
    const props = {
      singleRecipe: {
        recipe: {
          title: 'Macaroni',
          recipeImage: 'Recipe image URL',
          upvotes: 4,
          downvotes: 0,
          favorites: 8,
          views: 25,
        },
        favoritedUsers: [{
          userId: 1,
        }, {
          userId: 2,
        }],
        voters: [{
          userId: 1,
          hasVoted: true,
        }],
        voteMessage: 'Upvote recorded',
      },
      handleUpvote: jest.fn(),
      handleDownvote: jest.fn(),
      handleFavorite: jest.fn(),
    };
    const wrapper = shallow(<RecipeCard {...props} />);

    expect(wrapper).toBeDefined();
    wrapper.find('#upvote').simulate('click');
    expect(props.handleUpvote).toBeCalled();
    expect(wrapper).toMatchSnapshot();
  });
  it('should render component with upvote', () => {
    const props = {
      singleRecipe: {
        recipe: {
          title: 'Macaroni',
          recipeImage: 'Recipe image URL',
          upvotes: 4,
          downvotes: 0,
          favorites: 8,
          views: 25,
        },
        favoritedUsers: [{
          userId: 1,
        }, {
          userId: 2,
        }],
        voters: [{
          userId: 1,
          hasVoted: true,
        }],
        voteMessage: 'Upvote removed',
      },
      handleUpvote: jest.fn(),
      handleDownvote: jest.fn(),
      handleFavorite: jest.fn(),
    };
    const wrapper = shallow(<RecipeCard {...props} />);

    expect(wrapper).toBeDefined();
    expect(wrapper).toMatchSnapshot();
  });
  it('should render component with downvote', () => {
    const props = {
      singleRecipe: {
        recipe: {
          title: 'Macaroni',
          recipeImage: 'Recipe image URL',
          upvotes: 4,
          downvotes: 0,
          favorites: 8,
          views: 25,
        },
        favoritedUsers: [{
          userId: 1,
        }],
        voters: [{
          userId: 2,
          hasVoted: false,
        }, {
          userId: 3,
          hasVoted: true,
        }],
        voteMessage: 'Downvote recorded',
      },
      handleUpvote: jest.fn(),
      handleDownvote: jest.fn(),
      handleFavorite: jest.fn(),
    };
    const wrapper = shallow(<RecipeCard {...props} />);

    expect(wrapper).toBeDefined();
    wrapper.find('#downvote').simulate('click');
    expect(props.handleDownvote).toBeCalled();
    expect(wrapper).toMatchSnapshot();
  });
  it('should render component with downvote', () => {
    const props = {
      singleRecipe: {
        recipe: {
          title: 'Macaroni',
          recipeImage: 'Recipe image URL',
          upvotes: 4,
          downvotes: 0,
          favorites: 8,
          views: 25,
        },
        favoritedUsers: [{
          userId: 1,
        }],
        voters: [{
          userId: 2,
          hasVoted: false,
        }, {
          userId: 3,
          hasVoted: true,
        }],
        voteMessage: 'Downvote removed',
      },
      handleUpvote: jest.fn(),
      handleDownvote: jest.fn(),
      handleFavorite: jest.fn(),
    };
    const wrapper = shallow(<RecipeCard {...props} />);

    expect(wrapper).toBeDefined();
    expect(wrapper).toMatchSnapshot();
  });
  it('should render component with favorite', () => {
    const props = {
      singleRecipe: {
        recipe: {
          title: 'Macaroni',
          recipeImage: 'Recipe image URL',
          upvotes: 4,
          downvotes: 0,
          favorites: 8,
          views: 25,
        },
        favoritedUsers: [],
        voters: [],
        favoriteMessage: 'Recipe added to favorites',
      },
      handleUpvote: jest.fn(),
      handleDownvote: jest.fn(),
      handleFavorite: jest.fn(),
    };
    const wrapper = shallow(<RecipeCard {...props} />);

    expect(wrapper).toBeDefined();
    wrapper.find('#favorite').simulate('click');
    expect(props.handleFavorite).toBeCalled();
    expect(wrapper).toMatchSnapshot();
  });
  it('should render component with favorite', () => {
    const props = {
      singleRecipe: {
        recipe: {
          title: 'Macaroni',
          recipeImage: 'Recipe image URL',
          upvotes: 4,
          downvotes: 0,
          favorites: 8,
          views: 25,
        },
        favoritedUsers: [],
        voters: [],
        favoriteMessage: 'Recipe removed from favorites',
      },
      handleUpvote: jest.fn(),
      handleDownvote: jest.fn(),
      handleFavorite: jest.fn(),
    };
    const wrapper = shallow(<RecipeCard {...props} />);

    expect(wrapper).toBeDefined();
    wrapper.find('#favorite').simulate('click');
    expect(props.handleFavorite).toBeCalled();
    expect(wrapper).toMatchSnapshot();
  });
});
