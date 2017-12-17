import React from 'react';
import PropTypes from 'prop-types';

import RecipeImage from '../common/RecipeImage';
import RecipeCard from './RecipeCard';
import RecipeDetails from './RecipeDetails';
import ReviewCollection from './ReviewCollection';
import AddReview from './AddReview';

const Main = (props) => {
  const { singleRecipe } = props,
    { recipe, reviews } = singleRecipe,
    { title, recipeImage } = recipe;
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
            <h5 className="header">{title}</h5>
          </div>
        </div>
        <div className="row">
          <div className="col s12 m6 l5">
            <RecipeCard recipe={recipe} />
          </div>
          <div className="col s12 m6 l7">
            <RecipeDetails recipe={recipe} />
          </div>
        </div>
        <ReviewCollection reviews={reviews} />
        <AddReview {...props} />
      </div>
    </div>
  );
};

Main.propTypes = {
  singleRecipe: PropTypes.shape({
    data: PropTypes.shape({
      recipe: PropTypes.shape(),
      reviews: PropTypes.arrayOf(PropTypes.shape()),
    })
  }).isRequired,
};

export default Main;
