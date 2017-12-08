import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Category from './Category';
import IndexUserNav from './IndexUserNav';
import AuthUserNav from './AuthUserNav';
import Signup from './Signup';
import Signin from './Signin';

/**
 * Class representing navbar
 *
 * @class Navbar
 * @extends {React.Component}
 */
class Navbar extends React.Component {
  /**
   * Creates an instance of Navbar.
   *
   * @memberof Navbar
   */
  constructor() {
    super();
    this.handleSubmitSignup = this.handleSubmitSignup.bind(this);
    this.handleSubmitSignin = this.handleSubmitSignin.bind(this);
    this.handleLogoutUser = this.handleLogoutUser.bind(this);
  }
  /**
   * Component did mount method
   *
   * @returns{any} Initialize materialize components
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
   * Form submission handler function
   *
   * @param {any} values The form values
   * @returns {any} Submit function
   * @memberof Navbar
   */
  handleSubmitSignup(values) {
    this.props.signupUser(values, this.props.handleClose);
  }

  /**
   * Form submission handler function
   *
   * @param {any} values The form values
   * @returns {any} Submit function
   * @memberof Navbar
   */
  handleSubmitSignin(values) {
    this.props.signinUser(values, this.props.handleClose);
  }

  /**
   * Logout user from the application
   *
   * @returns {any} Logout user
   * @memberof Navbar
   */
  handleLogoutUser() {
    this.props.logoutUser();
  }

  /**
   * Render method
   *
   * @returns{object} React element
   * @memberof Navbar
   */
  render() {
    const { openSignup, openSignin, handleOpenSignup, handleOpenSignin,
      handleClose, user: { isAuthenticated } } = this.props;

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
              {!isAuthenticated && 'Welcome'}
              {isAuthenticated && 'User fullname'}
              <i className="material-icons large left">account_circle</i>
            </a>
            {!isAuthenticated &&
              <IndexUserNav
                handleOpenSignup={handleOpenSignup}
                handleOpenSignin={handleOpenSignin}
              />
            }
            {isAuthenticated &&
              <AuthUserNav handleLogoutUser={this.handleLogoutUser} />}
          </li>
        </ul>
        <MuiThemeProvider>
          <Signup
            open={openSignup}
            handleClose={handleClose}
            handleOpenSignin={handleOpenSignin}
            onSubmit={this.handleSubmitSignup}
            {...this.props}
          />
        </MuiThemeProvider>
        <MuiThemeProvider>
          <Signin
            open={openSignin}
            handleClose={handleClose}
            handleOpenSignup={handleOpenSignup}
            onSubmit={this.handleSubmitSignin}
            {...this.props}
          />
        </MuiThemeProvider>
      </div>
    );
  }
}

Navbar.propTypes = {
  openSignup: PropTypes.bool.isRequired,
  openSignin: PropTypes.bool.isRequired,
  handleOpenSignup: PropTypes.func.isRequired,
  handleOpenSignin: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  signupUser: PropTypes.func.isRequired,
  signinUser: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  user: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
    userSignin: PropTypes.shape({
      message: PropTypes.string
    })
  }).isRequired,
};

export default Navbar;
