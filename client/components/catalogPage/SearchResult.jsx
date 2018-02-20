import React from 'react';
import PropTypes from 'prop-types';

import RecipeCatalogCard from '../common/RecipeCatalogCard';

const propTypes = {
  recipes: PropTypes.shape({
    searchResult: PropTypes.arrayOf(PropTypes.shape()),
  }).isRequired,
};

/**
 * Function representing search result component
 *
 * @param {object} props - The properties passed to the component
 *
 * @returns {object} React element
 */
const SearchResult = (props) => {
  const { recipes: { searchResult } } = props;

  return (
    <div>
      {searchResult && searchResult.map((recipe, index) =>
        (<RecipeCatalogCard
          {...props}
          key={recipe.id}
          index={index}
          recipe={recipe}
        />))}
    </div>
  );
};

SearchResult.propTypes = propTypes;

export default SearchResult;
