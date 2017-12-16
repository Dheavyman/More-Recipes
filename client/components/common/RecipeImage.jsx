import React from 'react';
import PropTypes from 'prop-types';

const RecipeImage = (props) => {
  const { title, recipeImage } = props;
  return (
    <img
      src={recipeImage}
      alt={title}
    />
  );
};

RecipeImage.propTypes = {
  title: PropTypes.string,
  recipeImage: PropTypes.string,
};

RecipeImage.defaultProps = {
  title: null,
  recipeImage: null,
};

export default RecipeImage;
