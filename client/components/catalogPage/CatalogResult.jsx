import React from 'react';
import PropTypes from 'prop-types';

import RecipeCatalogCard from '../common/RecipeCatalogCard';

const propTypes = {
  recipes: PropTypes.shape({
    recipes: PropTypes.arrayOf(PropTypes.shape()),
  }).isRequired,
};

/**
 * Function representing catalog result component
 *
 * @param {object} props - The properties passed to the component
 *
 * @returns {object} React element
 */
const CatalogResult = (props) => {
  const { recipes: { recipes } } = props;
  return (
    <div>
      {recipes && recipes.map((recipe, index) =>
        (<RecipeCatalogCard
          {...props}
          key={recipe.id}
          index={index}
          recipe={recipe}
        />))}
    </div>
  );
};

CatalogResult.propTypes = propTypes;

export default CatalogResult;
