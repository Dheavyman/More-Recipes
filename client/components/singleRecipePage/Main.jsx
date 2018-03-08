import React from 'react';
import PropTypes from 'prop-types';

import RecipeImage from '../common/RecipeImage';
import RecipeCard from './RecipeCard';
import RecipeDetails from './RecipeDetails';
import ReviewCollection from './ReviewCollection';
import AddReview from './AddReview';

const propTypes = {
  singleRecipe: PropTypes.shape({
    recipe: PropTypes.shape(),
    reviews: PropTypes.arrayOf(PropTypes.shape()),
    favoritedUsers: PropTypes.arrayOf(PropTypes.shape()),
    voters: PropTypes.arrayOf(PropTypes.shape()),
    voteMessage: PropTypes.string,
    favoriteMessage: PropTypes.string,
    hasMoreReviews: PropTypes.bool,
  }).isRequired,
  handleViewMoreReviews: PropTypes.func.isRequired,
};

/**
 * Main component
 *
 * @param {object} props - The properties passed to the component
 *
 * @returns {object} - React element
 */
const Main = (props) => {
  const { singleRecipe, handleViewMoreReviews } = props;
  const {
    recipe, reviews, favoritedUsers, voters, voteMessage,
    favoriteMessage, hasMoreReviews
  } = singleRecipe;
  const { title, recipeImage } = recipe;

  return (
    <div>
      <div className="parallax-container">
        <div className="parallax">
          <RecipeImage title={title} recipeImage={recipeImage} />
        </div>
      </div>
      <div className="section white container">
        <div className="row">
          <div className="col s12">
            <h4 className="title-header">{title}</h4>
          </div>
        </div>
        <div className="row">
          <div className="col s12 m6 l5">
            <RecipeCard
              recipe={recipe}
              favoritedUsers={favoritedUsers}
              voters={voters}
              voteMessage={voteMessage}
              favoriteMessage={favoriteMessage}
              {...props}
            />
          </div>
          <div className="col s12 m6 l6 offset-l1">
            <RecipeDetails recipe={recipe} />
          </div>
        </div>
        <AddReview {...props} />
        <ReviewCollection reviews={reviews} {...props} />
        <div className="row center-align">
          <button
            className={`btn waves-effect waves-light indigo accent-2
              white-text`}
            onClick={handleViewMoreReviews}
            disabled={!hasMoreReviews}
          >
            View More
          </button>
        </div>
      </div>
    </div>
  );
};

Main.propTypes = propTypes;

export default Main;
