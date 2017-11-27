import React from 'react';

const SearchBar = () => (
  <div className="row">
    <div id="search-bar" className="col s12 m6 l6 offset-m3 offset-l3">
      <form className="container">
        <div className="input-field white">
          <input
            id="search-input"
            type="search"
            placeholder="Search for recipes"
            required
          />
          <label className="label-icon" htmlFor="search">
            <i className="material-icons">search</i>
          </label>
        </div>
      </form>
    </div>
  </div>
);

export default SearchBar;
