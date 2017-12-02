import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * User navigation when unathenticated
 *
 * @param {any} props 
 * @returns {object} React element
 */
const AuthUserNav = (props) => {
  const { handleLogoutUser } = props;
  return (
    <ul id="user-control" className="dropdown-content">
      <li>
        <a href="profile.html" className="black-text">
          Profile
          <i className="material-icons left">person</i>
        </a>
      </li>
      <li>
        <Link to="/user/recipes" className="black-text">
          My Recipes<i className="material-icons left">folder</i>
        </Link>
      </li>
      <li>
        <a
          href="recipes.html?#user-favorites"
          className="black-text"
        >
          My Favorites
          <i className="material-icons left">folder</i>
        </a>
      </li>
      <li className="divider" />
      <li>
        <a
          role="button"
          tabIndex="0"
          className="black-text"
          onClick={handleLogoutUser}
        >
          Logout
          <i className="material-icons left">lock</i>
        </a>
      </li>
    </ul>
  );
};

AuthUserNav.propTypes = {
  handleLogoutUser: PropTypes.func.isRequired,
};

export default AuthUserNav;
