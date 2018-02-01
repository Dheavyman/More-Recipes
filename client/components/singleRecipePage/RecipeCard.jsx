import React from 'react';
import PropTypes from 'prop-types';

import RecipeImage from '../common/RecipeImage';
import { decodeToken } from '../../utils/authenticate';

const propTypes = {
  recipe: PropTypes.shape({
    title: PropTypes.string,
    recipeImage: PropTypes.string,
    upvotes: PropTypes.number,
    downvotes: PropTypes.number,
    favorites: PropTypes.number,
  }).isRequired,
  favoritedUsers: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  voters: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  voteMessage: PropTypes.string,
  favoriteMessage: PropTypes.string,
  handleUpvote: PropTypes.func.isRequired,
  handleDownvote: PropTypes.func.isRequired,
  handleFavorite: PropTypes.func.isRequired,
};

const defaultProps = {
  voteMessage: null,
  favoriteMessage: null,
};

const RecipeCard = (props) => {
  const { recipe, voters, favoritedUsers, voteMessage, favoriteMessage,
    handleUpvote, handleDownvote, handleFavorite } = props;
  const { title, recipeImage, upvotes, downvotes, favorites } = recipe;

  let userId;

  if (decodeToken() !== null) {
    const { user: { id } } = decodeToken();
    userId = id;
  }

  let isUserFavorite = favoritedUsers && favoritedUsers
    .some(user => user.userId === userId);
  let userUpvoted = voters && voters
    .some(user => user.userId === userId && user.hasVoted);
  let userDownvoted = voters && voters
    .some(user => user.userId === userId && !user.hasVoted);

  if (voteMessage && (voteMessage === 'Upvote recorded'
    || voteMessage === 'Upvote recorded and downvote removed')) {
    userUpvoted = true;
    userDownvoted = false;
  }
  if (voteMessage && (voteMessage === 'Downvote recorded'
    || voteMessage === 'Downvote recorded and upvote removed')) {
    userDownvoted = true;
    userUpvoted = false;
  }
  if (voteMessage && voteMessage === 'Upvote removed') {
    userUpvoted = false;
    userDownvoted = false;
  }
  if (voteMessage && voteMessage === 'Downvote removed') {
    userDownvoted = false;
    userUpvoted = false;
  }

  if (favoriteMessage && favoriteMessage === 'Recipe added to favorites') {
    isUserFavorite = true;
  }
  if (favoriteMessage && favoriteMessage === 'Recipe removed from favorites') {
    isUserFavorite = false;
  }

  return (
    <div className="card single-card">
      <div className="card-image">
        <RecipeImage title={title} recipeImage={recipeImage} />
      </div>
      <div className="card-action center-align">
        <a
          role="button"
          tabIndex="0"
          id="favorite"
          className={`chip waves-effect waves-red ${
            isUserFavorite ? 'red' : ''}`}
          onClick={handleFavorite}
        >
          <i className={`fa fa-heart ${
            isUserFavorite ? 'white-text' : 'black-text'}`}
          />
          <span className={`${isUserFavorite ? 'white-text' : 'black-text'}`}>
            {favorites}
          </span>
        </a>
        <a
          role="button"
          tabIndex="0"
          id="upvote"
          className={`chip waves-effect waves-red ${userUpvoted ? 'red' : ''}`}
          onClick={handleUpvote}
        >
          <i className={`fa fa-thumbs-up ${
            userUpvoted ? 'white-text' : 'black-text'}`}
          />
          <span className={`${userUpvoted ? 'white-text' : 'black-text'}`}>
            {upvotes}
          </span>
        </a>
        <a
          role="button"
          tabIndex="0"
          id="downvote"
          className={`chip waves-effect waves-red ${
            userDownvoted ? 'red' : ''}`}
          onClick={handleDownvote}
        >
          <i className={`fa fa-thumbs-down ${
            userDownvoted ? 'white-text' : 'black-text'}`}
          />
          <span className={`${userDownvoted ? 'white-text' : 'black-text'}`}>
            {downvotes}
          </span>
        </a>
      </div>
    </div>
  );
};

RecipeCard.propTypes = propTypes;
RecipeCard.defaultProps = defaultProps;

export default RecipeCard;
