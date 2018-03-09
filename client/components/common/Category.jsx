import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  handleSearchCategory: PropTypes.func.isRequired,
};

/**
 * Category options component
 *
 * @param {object} props - The properties passed to the component
 *
 * @returns {object} React element
 */
const Category = (props) => {
  const { handleSearchCategory } = props;

  return (
    <ul id="category" className="dropdown-content">
      <li>
        <a
          role="button"
          tabIndex="0"
          name="breakfast"
          className="collection-item black-text"
          onClick={handleSearchCategory}
        >
          Breakfast
        </a>
      </li>
      <li>
        <a
          role="button"
          tabIndex="0"
          name="lunch"
          className="collection-item black-text"
          onClick={handleSearchCategory}
        >
          Lunch
        </a>
      </li>
      <li>
        <a
          role="button"
          tabIndex="0"
          name="dinner"
          className="collection-item black-text"
          onClick={handleSearchCategory}
        >
          Dinner
        </a>
      </li>
      <li>
        <a
          role="button"
          tabIndex="0"
          name="appetizer"
          className="collection-item black-text"
          onClick={handleSearchCategory}
        >
          Appetizer
        </a>
      </li>
      <li>
        <a
          role="button"
          tabIndex="0"
          name="main"
          className="collection-item black-text"
          onClick={handleSearchCategory}
        >
          Main
        </a>
      </li>
      <li>
        <a
          role="button"
          tabIndex="0"
          name="dessert"
          className="collection-item black-text"
          onClick={handleSearchCategory}
        >
          Dessert
        </a>
      </li>
    </ul>
  );
};

Category.propTypes = propTypes;

export default Category;
