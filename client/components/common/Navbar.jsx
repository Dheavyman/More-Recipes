import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Category from './Category';
import IndexUserNav from './IndexUserNav';
import AuthUserNav from './AuthUserNav';
import Signup from './Signup';
import Signin from './Signin';

const propTypes = {
  handleSubmitSignup: PropTypes.func.isRequired,
  handleSubmitSignin: PropTypes.func.isRequired,
  handleLogoutUser: PropTypes.func.isRequired,
  user: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
    userAuthentication: PropTypes.shape({
      fullName: PropTypes.string
    }),
    userProfile: PropTypes.shape({
      fullName: PropTypes.string,
    }),
  }).isRequired,
};


/**
 * Class representing navbar component
 *
 * @class Navbar
 *
 * @extends {React.Component}
 */
class Navbar extends React.Component {
  /**
   * Component did update life cycle method
   *
   * @returns {any} Initialize materialize component
   *
   * @memberof Navbar
   */
  componentDidUpdate() {
    // Initialize materialize dropdown class
    $('.dropdown-button').dropdown({
      belowOrigin: true,
    });
  }

  /**
   * Render method
   *
   * @returns{object} React element
   *
   * @memberof Navbar
   */
  render() {
    const {
      user: { isAuthenticated, userAuthentication }
    } = this.props;
    const { fullName } = userAuthentication;

    return (
      <div className="nav-wrapper">
        <Link
          to="/"
          id="logo"
          className="brand-logo hide-on-small-only"
        >
          More-Recipes
        </Link>
        <a
          data-activates="slide_out"
          className="button-collapse"
        >
          <i className="material-icons">menu</i>
        </a>
        <ul className="right hide-on-med-and-down">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/catalog">Catalog</Link></li>
          <li>
            <a
              className="dropdown-button dropdown-category"
              data-activates="category"
            >
              Category
            </a>
          </li>
          <Category {...this.props} />
          <li>
            <a
              className="dropdown-button dropdown-user"
              data-activates="user-control"
            >
              {!isAuthenticated
                ? 'Welcome Guest'
                : fullName || localStorage.getItem('fullName')
              }
              <i className="material-icons large left">account_circle</i>
            </a>
            {!isAuthenticated &&
              <IndexUserNav {...this.props} />
            }
            {isAuthenticated &&
              <AuthUserNav {...this.props} />}
          </li>
        </ul>
        <MuiThemeProvider>
          <Signup
            {...this.props}
          />
        </MuiThemeProvider>
        <MuiThemeProvider>
          <Signin
            {...this.props}
          />
        </MuiThemeProvider>
      </div>
    );
  }
}

Navbar.propTypes = propTypes;

export default Navbar;
