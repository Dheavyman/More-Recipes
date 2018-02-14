import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import RecipeCatalogCard from '../common/RecipeCatalogCard';

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
 *
 * @returns {object} React element
 */
const AllRecipeCatalog = (props) => {
  const { recipesCatalog } = props;

  return (
    <div className="row">
      <div className="col s12" >
        <div className="row valign-wrapper" >
          <h4 className="col s11">All Recipes</h4>
          <span className="col s1 right" >
            <Link to="/catalog">View All &gt;</Link>
          </span>
        </div>
      </div>
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
