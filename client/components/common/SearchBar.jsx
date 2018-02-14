import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  id: PropTypes.string,
  searchTerm: PropTypes.string,
  handleSearchChange: PropTypes.func.isRequired,
  handleSubmitSearch: PropTypes.func.isRequired,
};

const defaultProps = {
  id: null,
  searchTerm: undefined,
};

/**
 * Function representing search bar component
 *
 * @param {object} props - The properties passed to the component
 * @returns {any} React element
 */
const SearchBar = (props) => {
  const { searchTerm, handleSearchChange, handleSubmitSearch } = props;

  return (
    <div className="row">
      <div id={props.id} className="col s12 m3 l3 push-m9 push-l9">
        <select
          name="search-by"
          id="search-by"
          className="browser-default search-by z-depth-1"
        >
          <option value="name">Search By Name</option>
          <option value="ingredients">Search By Ingredients</option>
        </select>
      </div>
      <div
        id={props.id}
        className="col s12 m6 l6 offset-m3 offset-l3 pull-m3 pull-l3 search-bar"
      >
        <form onSubmit={handleSubmitSearch}>
          <div className="row">
            <div className="input-field white">
              <input
                id="search-input"
                type="search"
                placeholder="Search for recipes"
                value={searchTerm}
                onChange={handleSearchChange}
                required
              />
              <label className="label-icon" htmlFor="search">
                <i className="material-icons">search</i>
              </label>
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
