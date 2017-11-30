import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import isEmpty from 'lodash/isEmpty';

import Category from './Category';
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
      hover: true,
      belowOrigin: true,
    });
    // // Initialize materialize modal
    // $('.modal').modal();
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
  handleClose(errors) {
    if (isEmpty(errors)) {
      this.setState({
        openSignup: false,
        openSignin: false
      });
    }
  }

  /**
   * Form submission handler function
   *
   * @param {any} values The form values
   * @returns {any} Submit function
   * @memberof Navbar
   */
  handleSubmitSignup(values) {
    let errors = {};
    this.props.signupUser(values)
      .then((response) => {
        this.props.userSignupSuccess(response.data);
        this.handleClose(errors);
      })
      .catch((error) => {
        errors = error.response.data;
        this.props.userSignupFailure(error.response.data);
        this.handleClose(errors);
      });
  }

  /**
   * Form submission handler function
   *
   * @param {any} values The form values
   * @returns {any} Submit function
   * @memberof Navbar
   */
  handleSubmitSignin = (values) => {
    let errors = {};
    this.props.signinUser(values)
      .then((response) => {
        this.props.userSigninSuccess(response.data);
        this.handleClose(errors);
      })
      .catch((error) => {
        errors = error.response.data;
        this.props.userSigninFailure(error.response.data);
        this.handleClose(errors);
      });
  }

  /**
   * Render method
   *
   * @returns{object} React element
   * @memberof Navbar
   */
  render() {
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
                  Welcome
                  <i className="material-icons large left">account_circle</i>
                </a>
                <ul id="user-control" className="dropdown-content">
                  <li>
                    <a
                      role="button"
                      tabIndex="0"
                      className="black-text"
                      onClick={this.handleOpenSignin}
                    >
                      Sign in
                      <i className="material-icons left">person</i>
                    </a>
                  </li>
                  <li>
                    <a
                      role="button"
                      tabIndex="0"
                      className="black-text"
                      onClick={this.handleOpenSignup}
                    >
                      Register
                      <i className="material-icons left">folder</i>
                    </a>
                  </li>
                </ul>
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
          />
        </MuiThemeProvider>
        <MuiThemeProvider>
          <Signin
            open={this.state.openSignin}
            handleClose={this.handleClose}
            handleOpenSignup={this.handleOpenSignup}
            onSubmit={this.handleSubmitSignin}
          />
        </MuiThemeProvider>
      </div>
    );
  }
}

Navbar.propTypes = {
  signupUser: PropTypes.func.isRequired,
  signinUser: PropTypes.func.isRequired,
  userSignupSuccess: PropTypes.func.isRequired,
  userSignupFailure: PropTypes.func.isRequired,
  userSigninSuccess: PropTypes.func.isRequired,
  userSigninFailure: PropTypes.func.isRequired,
};

export default Navbar;
