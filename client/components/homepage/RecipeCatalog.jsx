import React from 'react';
import PropTypes from 'prop-types';

import RecipeCatalogCard from './RecipeCatalogCard';

const RecipeCatalog = props => (
  <div className="row">
    {props.recipes.map((recipe, index) =>
      (<RecipeCatalogCard
        {...props}
        key={recipe.id}
        index={index}
        recipe={recipe}
      />))}
  </div>
);

RecipeCatalog.propTypes = {
  recipes: PropTypes.array,
};

RecipeCatalog.defaultProps = {
  recipes: undefined,
};

export default RecipeCatalog;
