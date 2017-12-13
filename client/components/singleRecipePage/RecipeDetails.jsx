import React from 'react';
import PropTypes from 'prop-types';

const formatDisplay = string => string.split(',').map((ingredient, index) => (
  <li key={index.toString()}>{ingredient.trim()}</li>
));

const RecipeDetails = (props) => {
  const { recipe } = props,
    { category, description, preparationTime, ingredients,
      directions } = recipe;
  return (
    <div className="row">
      <div className="col s12">
        <h6><b><em>Category:</em></b></h6>
        <p id="description" className="grey-text text-darken-3 lighten-3">
          {category}
        </p>
      </div>
      <div className="col s12">
        <h6><b><em>Description:</em></b></h6>
        <p id="description" className="grey-text text-darken-3 lighten-3">
          {description}
        </p>
      </div>
      <div className="col s12">
        <h6><b><em>Preparation Time (Minutes):</em></b></h6>
        <p id="prep-time" className="grey-text text-darken-3 lighten-3">
          {preparationTime}
        </p>
      </div>
      <div className="col s12">
        <h6><b><em>Ingredients:</em></b></h6>
        <p id="ingredients" className="grey-text text-darken-3 lighten-3">
          {formatDisplay(ingredients)}
        </p>
      </div>
      <div className="col s12">
        <h6><b><em>Directions:</em></b></h6>
        <ol id="directions" className="grey-text text-darken-3 lighten-3">
          {formatDisplay(directions)}
        </ol>
      </div>
    </div>
  );
};

RecipeDetails.propTypes = {
  recipe: PropTypes.shape({
    category: PropTypes.string,
    description: PropTypes.string.isRequired,
    preparationTime: PropTypes.number.isRequired,
    ingredients: PropTypes.string.isRequired,
    directions: PropTypes.string.isRequired,
  }).isRequired,
};

export default RecipeDetails;
