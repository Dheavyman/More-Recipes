import React from 'react';
import PropTypes from 'prop-types';

import SearchBar from '../common/SearchBar';
import RecipeCatalogCard from '../common/RecipeCatalogCard';

const propTypes = {
  recipes: PropTypes.shape({
    recipes: PropTypes.arrayOf(PropTypes.shape()),
  }),
  location: PropTypes.shape({
    state: PropTypes.string,
  }).isRequired,
  searchTerm: PropTypes.string,
};

const defaultProps = {
  recipes: undefined,
  searchTerm: undefined,
};

const Main = (props) => {
  console.log('the props', props);
  const { recipes: { recipes }, location: { state }, searchTerm } = props;
  return (
    <div className="grey lighten-3">
      <SearchBar {...props} />
      <div className="row recipes-list">
        <div>
          <h4>Search results for: {searchTerm || state} </h4>
        </div>
        {recipes && recipes.map((recipe, index) =>
          (<RecipeCatalogCard
            {...props}
            key={recipe.id}
            index={index}
            recipe={recipe}
          />))}
      </div>
    </div>
  );
};

Main.propTypes = propTypes;
Main.defaultProps = defaultProps;

export default Main;
