import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import ReactTooltip from 'react-tooltip';

import SearchBar from '../common/SearchBar';
import SearchResult from './SearchResult';
import CatalogResult from './CatalogResult';

const propTypes = {
  recipes: PropTypes.shape({
    searchResult: PropTypes.arrayOf(PropTypes.shape()),
  }),
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
  searchedTerm: PropTypes.string,
  searchPerformed: PropTypes.bool.isRequired,
  scrollToTop: PropTypes.func.isRequired,
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
  const { recipes: { searchResult }, location: { search },
    searchPerformed, scrollToTop } = props;
  let { searchedTerm } = props;

  if (search !== '') {
    const parsed = queryString.parse(search);
    searchedTerm = parsed.list;
  }
  return (
    <div>
      <SearchBar {...props} />
      <div className="row recipes-list">
        <span
          role="button"
          tabIndex="0"
          id="scroll-to-top"
          data-tip="Back To Top"
          onClick={scrollToTop}
        >
          <i className="fa fa-arrow-circle-up fa-3x" />
        </span>
        <ReactTooltip />
        <div className="center-align">
          {search !== '' &&
            searchPerformed &&
            <h5>
              <em>
                {searchResult.length === 0
                  ? `No Search result found for ${searchedTerm}`
                  : `Search results for ${searchedTerm}`
                }
              </em>
            </h5>
          }
        </div>
        <div>
          {search !== '' &&
            searchPerformed
            ? <SearchResult {...props} />
            : <CatalogResult {...props} />
          }
        </div>

      </div>
    </div>
  );
};

Main.propTypes = propTypes;
Main.defaultProps = defaultProps;

export default Main;
