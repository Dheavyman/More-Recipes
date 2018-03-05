import React from 'react';
import PropTypes from 'prop-types';

import RecipeCatalogCard from '../common/RecipeCatalogCard';
import Spinner from '../common/Spinner';

const propTypes = {
  recipes: PropTypes.shape({
    isFetchingRecipes: PropTypes.bool,
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
  const { recipes: { isFetchingRecipes, searchResult } } = props;

  return (
    <div>
      {isFetchingRecipes
        ? <div className="center-align">
          <Spinner size="big" />
        </div>
        : <div>
          {searchResult && searchResult.map((recipe, index) =>
            (<RecipeCatalogCard
              {...props}
              key={recipe.id}
              index={index}
              recipe={recipe}
            />))}
        </div>}
    </div>
  );
};

SearchResult.propTypes = propTypes;

export default SearchResult;
