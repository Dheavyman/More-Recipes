import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Page not found component
 *
 * @returns {object} React element
 */
const NotFoundPage = () => (
  <div className="row center-align">
    <div className="not-found">
      <p className="status-number">404</p>
      <p className="page-data">PAGE NOT FOUND</p>
      <i className="material-icons large">error</i>
    </div>
    <Link to="/">Go home</Link>
  </div>
);

export default NotFoundPage;
