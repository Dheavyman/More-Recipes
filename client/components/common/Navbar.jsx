import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import isEmpty from 'lodash/isEmpty';

import Category from './Category';
import IndexUserNav from './IndexUserNav';
import AuthUserNav from './AuthUserNav';
import Signup from './Signup';
import Signin from './Signin';

const propTypes = {
  openSignup: PropTypes.bool.isRequired,
  openSignin: PropTypes.bool.isRequired,
  handleOpenSignup: PropTypes.func.isRequired,
  handleOpenSignin: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmitSignup: PropTypes.func.isRequired,
  handleSubmitSignin: PropTypes.func.isRequired,
  handleLogoutUser: PropTypes.func.isRequired,
  user: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
    userSignin: PropTypes.shape({
      message: PropTypes.string
    })
  }).isRequired,
};


/**
 * Class representing navbar
 *
 * @class Navbar
 * @extends {React.Component}
 */
class Navbar extends React.Component {
  /**
   * Component did mount method
   *
   * @returns {any} Initialize materialize components
   * @memberof Navbar
   */
  componentDidMount() {
    // Initialize materialize css side nav menu activator
    $('.button-collapse').sideNav({
      draggable: true,
    });
    // Initialize materialize dropdown class
    $('.dropdown-button').dropdown({
      belowOrigin: true,
    });
  }

  /**
   * Component did update lifecycle mehtod
   *
   * @returns {any} Initialize materialize component
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
   * @memberof Navbar
   */
  render() {
    const {
      openSignup, openSignin, handleOpenSignup, handleOpenSignin,
      handleClose, handleSubmitSignup, handleSubmitSignin, handleLogoutUser,
      user: { isAuthenticated, userSignin }
    } = this.props;
    const { user } = userSignin;

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
          <li>
            <a
              className="dropdown-button dropdown-category"
              data-activates="category"
            >
              Category
            </a>
          </li>
          <Category />
          <li>
            <a
              className="dropdown-button dropdown-user"
              data-activates="user-control"
            >
              {!isAuthenticated || isEmpty(user)
                ? 'Welcome Guest'
                : user.fullName}
              <i className="material-icons large left">account_circle</i>
            </a>
            {!isAuthenticated &&
              <IndexUserNav
                handleOpenSignup={handleOpenSignup}
                handleOpenSignin={handleOpenSignin}
              />
            }
            {isAuthenticated &&
              <AuthUserNav handleLogoutUser={handleLogoutUser} />}
          </li>
        </ul>
        <MuiThemeProvider>
          <Signup
            open={openSignup}
            handleClose={handleClose}
            handleOpenSignin={handleOpenSignin}
            onSubmit={handleSubmitSignup}
            {...this.props}
          />
        </MuiThemeProvider>
        <MuiThemeProvider>
          <Signin
            open={openSignin}
            handleClose={handleClose}
            handleOpenSignup={handleOpenSignup}
            onSubmit={handleSubmitSignin}
            {...this.props}
          />
        </MuiThemeProvider>
      </div>
    );
  }
}

Navbar.propTypes = propTypes;

export default Navbar;
