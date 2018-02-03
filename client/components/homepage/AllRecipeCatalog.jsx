import React from 'react';
import PropTypes from 'prop-types';

import RecipeCatalogCard from './RecipeCatalogCard';

const propTypes = {
  recipesCatalog: PropTypes.arrayOf(PropTypes.shape()),
};

const defaultProps = {
  recipesCatalog: undefined,
};

/**
 * All recipes catalog component
 *
 * @param {object} props - The properties passsed to the component
 * @returns {object} React element
 */
const AllRecipeCatalog = (props) => {
  const { recipesCatalog } = props;
  return (
    <div className="row">
      <h4>All Recipes</h4>
      {recipesCatalog && recipesCatalog.map((recipe, index) =>
        (<RecipeCatalogCard
          {...props}
          key={recipe.id}
          index={index}
          recipe={recipe}
        />))}
    </div>
  );
};

AllRecipeCatalog.propTypes = propTypes;
AllRecipeCatalog.defaultProps = defaultProps;

export default AllRecipeCatalog;
