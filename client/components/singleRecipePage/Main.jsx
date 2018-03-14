import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RecipeImage from '../common/RecipeImage';
import RecipeCard from './RecipeCard';
import RecipeDetails from './RecipeDetails';
import ReviewCollection from './ReviewCollection';
import AddReview from './AddReview';
import Spinner from '../common/Spinner';

const propTypes = {
  singleRecipe: PropTypes.shape({
    recipe: PropTypes.shape(),
    reviews: PropTypes.arrayOf(PropTypes.shape()),
    favoritedUsers: PropTypes.arrayOf(PropTypes.shape()),
    voters: PropTypes.arrayOf(PropTypes.shape()),
    voteMessage: PropTypes.string,
    favoriteMessage: PropTypes.string,
    hasMoreReviews: PropTypes.bool,
    isLoadingReviews: PropTypes.bool,
  }).isRequired,
  handleViewMoreReviews: PropTypes.func.isRequired,
};

/**
 * Class representing main component
 *
 * @class Main
 *
 * @extends {Component}
 */
class Main extends Component {
  /**
   * Component did mount life cycle method
   *
   * @returns {any} Initialize materialize class
   *
   * @memberof Main
   */
  componentDidMount() {
    $('.parallax').parallax();
  }

  /**
   * Render method
   *
   * @returns {object} React element
   *
   * @memberof Main
   */
  render() {
    const { singleRecipe, handleViewMoreReviews } = this.props;
    const {
      recipe, reviews, hasMoreReviews, isLoadingReviews
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
              <RecipeCard {...this.props} />
            </div>
            <div className="col s12 m6 l6 offset-l1">
              <RecipeDetails recipe={recipe} />
            </div>
          </div>
          <AddReview {...this.props} />
          <ReviewCollection reviews={reviews} {...this.props} />
          <div className="row center-align">
            <div>
              {isLoadingReviews && <Spinner size="small" />}
            </div>
            <div>
              <button
                className={`btn waves-effect waves-light indigo accent-2
                white-text`}
                onClick={handleViewMoreReviews}
                disabled={isLoadingReviews || !hasMoreReviews}
              >
              View More
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Main.propTypes = propTypes;

export default Main;
