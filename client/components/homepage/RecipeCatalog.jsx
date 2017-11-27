import React from 'react';
import PropTypes from 'prop-types';

import RecipeCatalogCard from './RecipeCatalogCard';

const RecipeCatalog = (props) => {
  const recipes = props.recipesCatalog;
  return (
    <div className="row">
      {recipes ? recipes.map((recipe, index) =>
        (<RecipeCatalogCard
          {...props}
          key={recipe.id}
          index={index}
          recipe={recipe}
        />)) : ''}
    </div>
  );
};

RecipeCatalog.propTypes = {
  recipesCatalog: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    category: PropTypes.string,
    description: PropTypes.string,
    preparationTime: PropTypes.number,
    ingredients: PropTypes.string,
    directions: PropTypes.string,
  })),
};

RecipeCatalog.defaultProps = {
  recipesCatalog: undefined,
};

export default RecipeCatalog;
