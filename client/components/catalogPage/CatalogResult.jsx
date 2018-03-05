import React from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

import RecipeCatalogCard from '../common/RecipeCatalogCard';
import Spinner from '../common/Spinner';

const propTypes = {
  recipes: PropTypes.shape({
    recipes: PropTypes.arrayOf(PropTypes.shape()),
    hasMore: PropTypes.bool.isRequired,
  }).isRequired,
  retrieveMoreRecipes: PropTypes.func.isRequired,
};

/**
 * Function representing catalog result component
 *
 * @param {object} props - The properties passed to the component
 *
 * @returns {object} React element
 */
const CatalogResult = (props) => {
  const { recipes: { recipes, hasMore }, retrieveMoreRecipes } = props;

  return (
    <div className="row">
      <div className="catalog-page">
        <InfiniteScroll
          next={retrieveMoreRecipes}
          hasMore={hasMore}
          loader={<div className="col s12 center-align">
            <Spinner size="small" />
          </div>
          }
          endMessage={
            <div className="end-message center-align col s12">
              <b>Yay! You have seen it all</b>
            </div>
          }
        >
          {recipes && recipes.map((recipe, index) =>
            (<RecipeCatalogCard
              {...props}
              key={recipe.id}
              index={index}
              recipe={recipe}
            />))
          }
        </InfiniteScroll>
      </div>
    </div>
  );
};

CatalogResult.propTypes = propTypes;

export default CatalogResult;
