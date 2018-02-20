import React from 'react';
import PropTypes from 'prop-types';

import SearchBar from '../common/SearchBar';
import SearchResult from './SearchResult';
import CatalogResult from './CatalogResult';

const propTypes = {
  recipes: PropTypes.shape({
    searchResult: PropTypes.arrayOf(PropTypes.shape()),
  }),
  location: PropTypes.shape({
    state: PropTypes.shape({
      search: PropTypes.string,
      searchTerm: PropTypes.string,
    }),
  }),
  searchedTerm: PropTypes.string,
  showText: PropTypes.bool.isRequired,
};

const defaultProps = {
  recipes: undefined,
  searchedTerm: undefined,
  location: undefined,
};

/**
 * Function representing main component
 *
 * @param {object} props - The properties passed to the component
 *
 * @returns {object} React element
 */
const Main = (props) => {
  const { recipes: { searchResult }, location: { state },
    searchedTerm, showText } = props;
  return (
    <div className="grey lighten-3">
      <SearchBar {...props} />
      <div className="row recipes-list">
        <div>
          {showText &&
            <h5><em>{searchResult.length === 0
              ? `No Search result found for ${
                searchedTerm || (state && state.searchTerm)}`
              : `Search results for ${
                searchedTerm || (state && state.searchTerm)}`
            }</em>
            </h5>
          }
        </div>
        <div>
          {showText
            ? <SearchResult {...props} />
            : <CatalogResult {...props} />}
        </div>

      </div>
    </div>
  );
};

Main.propTypes = propTypes;
Main.defaultProps = defaultProps;

export default Main;
