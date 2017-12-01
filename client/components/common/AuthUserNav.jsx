import React from 'react';
import { Link } from 'react-router-dom';

/**
 * User navigation when unathenticated
 *
 * @param {any} props 
 * @returns {object} React element
 */
const AuthUserNav = () => (
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
        href="index.html"
        className="black-text"
      >
          Logout
        <i className="material-icons left">lock</i>
      </a>
    </li>
  </ul>
);

export default AuthUserNav;
