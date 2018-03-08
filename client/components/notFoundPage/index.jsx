import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Page not found component
 *
 * @returns {object} React element
 */
const NotFoundPage = () => (
  <div className="row">
    <nav>
      <div className="nav-wrapper deep-orange darken-4">
        <Link
          to="/"
          id="logo"
          className="brand-logo hide-on-small-only"
        >
          More-Recipes
        </Link>
      </div>
    </nav>
    <div className="row center-align">
      <div className="not-found">
        <p className="status-number">404</p>
        <p className="page-data">PAGE NOT FOUND</p>
        <i className="material-icons large">error</i>
      </div>
      <Link to="/">Go home</Link>
    </div>
  </div>

);

export default NotFoundPage;
