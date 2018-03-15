import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func,
  }).isRequired,
};

/**
 * Page not found component
 *
 * @param {object} props - Properties passed to the component
 *
 * @returns {object} React element
 */
const NotFoundPage = (props) => {
  const { history } = props;

  return (
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
        <span>
          <a href="#!" onClick={history.goBack}>Go back </a>
          <span>|</span>
          <Link to="/"> Go home</Link>
        </span>
      </div>
    </div>
  );
};

NotFoundPage.propTypes = propTypes;

export default NotFoundPage;
