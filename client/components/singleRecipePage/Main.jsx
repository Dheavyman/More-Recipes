import React from 'react';
import PropTypes from 'prop-types';

import RecipeImage from '../common/RecipeImage';
import RecipeCard from './RecipeCard';
import RecipeDetails from './RecipeDetails';
import ReviewCollection from './ReviewCollection';
import AddReview from './AddReview';

const Main = (props) => {
  const { singleRecipe } = props,
    { data: { recipe } } = singleRecipe;
  console.log(props);
  return (
    <div>
      <div className="parallax-container">
        <div className="parallax">
          <RecipeImage />
        </div>
      </div>
      <div className="section white container">
        <div className="row">
          <div className="col s12">
            <h5 className="header">{recipe.title}</h5>
          </div>
        </div>
        <div className="row">
          <div className="col s12 m6 l5">
            <RecipeCard {...recipe} />
          </div>
          <div className="col s12 m6 l7">
            <RecipeDetails {...recipe} />
          </div>
        </div>
        <ReviewCollection />
        <AddReview />
      </div>
    </div>
  );
};

Main.propTypes = {
  singleRecipe: PropTypes.shape({
    data: PropTypes.shape({
      recipe: PropTypes.shape()
    })
  }).isRequired,
};

export default Main;
