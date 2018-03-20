import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import RecipeCatalogCard from '../common/RecipeCatalogCard';
import Spinner from '../common/Spinner';

const propTypes = {
  recipesCatalog: PropTypes.arrayOf(PropTypes.shape()),
  recipes: PropTypes.shape({
    isFetchingRecipes: PropTypes.bool,
  }).isRequired,
};

const defaultProps = {
  recipesCatalog: undefined,
};

/**
 * All recipes catalog component
 *
 * @param {object} props - The properties passed to the component
 *
 * @returns {object} React element
 */
const AllRecipeCatalog = (props) => {
  const { recipesCatalog, recipes: { isFetchingRecipes } } = props;

  return (
    <div className="row">
      <div className="col s12" >
        <div className="row valign-wrapper" >
          <h4 className="col s8 m10 l11">All Recipes</h4>
          <span id="view-catalog" className="col s4 m2 l1  right" >
            <Link to="/catalog">View All &gt;</Link>
          </span>
        </div>
      </div>
      {isFetchingRecipes
        ? <div className="center-align">
          <Spinner size="big" />
        </div>
        : <div>
          {recipesCatalog && recipesCatalog.slice(0, 4).map((recipe, index) =>
            (<RecipeCatalogCard
              {...props}
              key={recipe.id}
              index={index}
              recipe={recipe}
            />))}
        </div>
      }
    </div>
  );
};

AllRecipeCatalog.propTypes = propTypes;
AllRecipeCatalog.defaultProps = defaultProps;

export default AllRecipeCatalog;
