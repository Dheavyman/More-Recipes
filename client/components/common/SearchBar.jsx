import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  id: PropTypes.string,
  search: PropTypes.string.isRequired,
  list: PropTypes.string,
  handleSearchChange: PropTypes.func.isRequired,
  handleSubmitSearch: PropTypes.func.isRequired,
};

const defaultProps = {
  id: null,
  list: undefined,
};

/**
 * Function representing search bar component
 *
 * @param {object} props - The properties passed to the component
 *
 * @returns {any} React element
 */
const SearchBar = (props) => {
  const { search, list, handleSearchChange, handleSubmitSearch } = props;

  return (
    <div id={props.id} className="row">
      <div className="col s12 m3 l3 push-m9 push-l9">
        <select
          name="searchBy"
          id="search-by"
          className="browser-default search-by z-depth-1"
          value={search}
          onChange={handleSearchChange}
        >
          <option value="title">Search By Title</option>
          <option value="ingredients">Search By Ingredients</option>
        </select>
      </div>
      <div
        className="col s12 m6 l6 offset-m3 offset-l3 pull-m3 pull-l3 search-bar"
      >
        <form onSubmit={handleSubmitSearch}>
          <div className="row">
            <div className="input-field white">
              <input
                id="search-input"
                type="search"
                placeholder="Search for recipes"
                value={list}
                onChange={handleSearchChange}
                required
              />
              <a
                role="button"
                tabIndex="0"
                className="label-icon"
                htmlFor="search"
                onClick={handleSubmitSearch}
              >
                <i className="material-icons">search</i>
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

SearchBar.propTypes = propTypes;
SearchBar.defaultProps = defaultProps;

export default SearchBar;
