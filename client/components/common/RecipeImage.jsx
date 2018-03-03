import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  title: PropTypes.string,
  recipeImage: PropTypes.string,
};

const defaultProps = {
  title: null,
  recipeImage: null,
};

/**
 * Recipe image component
 *
 * @param {object} props - The properties passed to the function
 *
 * @returns {object} React element
 */
const RecipeImage = (props) => {
  const { title, recipeImage } = props;

  return (
    <img
      src={recipeImage}
      alt={title}
    />
  );
};

RecipeImage.propTypes = propTypes;

RecipeImage.defaultProps = defaultProps;

export default RecipeImage;
