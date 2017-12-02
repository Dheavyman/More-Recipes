import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Category from './Category';
import IndexUserNav from './IndexUserNav';
import AuthUserNav from './AuthUserNav';
import Signup from '../homepage/Signup';
import Signin from '../homepage/Signin';

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
    this.state = {
      openSignup: false,
      openSignin: false
    };
    this.handleOpenSignup = this.handleOpenSignup.bind(this);
    this.handleOpenSignin = this.handleOpenSignin.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmitSignup = this.handleSubmitSignup.bind(this);
    this.handleSubmitSignin = this.handleSubmitSignin.bind(this);
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
   * Opens the signup modal
   *
   * @returns {object} Set open state to true
   * @memberof Navbar
   */
  handleOpenSignup() {
    this.setState({ openSignup: true });
  }

  /**
   * Opens the signin modal
   *
   * @returns {object} Set open state to true
   * @memberof Navbar
   */
  handleOpenSignin() {
    this.setState({ openSignin: true });
  }

  /**
   * Closes the modal
   *
   * @param {object} errors - The error object
   * @returns {object} Set open state to false
   * @memberof Navbar
   */
  handleClose() {
    this.setState({
      openSignup: false,
      openSignin: false
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
    this.props.signupUser(values, this.handleClose);
  }

  /**
   * Form submission handler function
   *
   * @param {any} values The form values
   * @returns {any} Submit function
   * @memberof Navbar
   */
  handleSubmitSignin = (values) => {
    this.props.signinUser(values, this.handleClose);
  }

  /**
   * Render method
   *
   * @returns{object} React element
   * @memberof Navbar
   */
  render() {
    const { user } = this.props;
    const { isAuthenticated, userSignin } = user;
    const { message } = userSignin;

    return (
      <div className="navbar-fixed">
        <nav className="deep-orange darken-4">
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
                  {isAuthenticated && message}
                  <i className="material-icons large left">account_circle</i>
                </a>
                {!isAuthenticated &&
                  <IndexUserNav
                    handleOpenSignup={this.handleOpenSignup}
                    handleOpenSignin={this.handleOpenSignin}
                  />
                }
                {isAuthenticated &&
                  <AuthUserNav />}
              </li>
            </ul>
          </div>
        </nav>
        <MuiThemeProvider>
          <Signup
            open={this.state.openSignup}
            handleClose={this.handleClose}
            handleOpenSignin={this.handleOpenSignin}
            onSubmit={this.handleSubmitSignup}
            {...this.props}
          />
        </MuiThemeProvider>
        <MuiThemeProvider>
          <Signin
            open={this.state.openSignin}
            handleClose={this.handleClose}
            handleOpenSignup={this.handleOpenSignup}
            onSubmit={this.handleSubmitSignin}
            {...this.props}
          />
        </MuiThemeProvider>
      </div>
    );
  }
}

Navbar.propTypes = {
  signupUser: PropTypes.func.isRequired,
  signinUser: PropTypes.func.isRequired,
  user: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
    userSignin: PropTypes.shape({
      message: PropTypes.string
    })
  }).isRequired,
};

export default Navbar;
