import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  recipe: PropTypes.shape({
    category: PropTypes.string,
    description: PropTypes.string,
    preparationTime: PropTypes.number,
    ingredients: PropTypes.string,
    directions: PropTypes.string,
  }).isRequired,
};

/**
 * Function to format display of comma seperated string values into lists
 *
 * @param {string} string - The string value to be formated
 *
 * @returns {object} - React element represent the list item
 */
const formatDisplay = string => string.split(',').map((ingredient, index) => (
  <li key={index.toString()}>{ingredient.trim()}</li>
));

/**
 * RecipeDetails component
 *
 * @param {object} props - The properties passed to the component
 *
 * @returns {object} React element
 */
const RecipeDetails = (props) => {
  const { recipe } = props;
  const { category, description, preparationTime, ingredients,
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
          {ingredients && formatDisplay(ingredients)}
        </p>
      </div>
      <div className="col s12">
        <h6><b><em>Directions:</em></b></h6>
        <ol id="directions" className="grey-text text-darken-3 lighten-3">
          {directions && formatDisplay(directions)}
        </ol>
      </div>
    </div>
  );
};

RecipeDetails.propTypes = propTypes;

export default RecipeDetails;
