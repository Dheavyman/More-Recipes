import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// import Modal from '../homepage/Modal';
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
    this.props.signupUser(values);
    this.handleClose();
  }

  /**
   * Form submission handler function
   *
   * @param {any} values The form values
   * @returns {any} Submit function
   * @memberof Navbar
   */
  handleSubmitSignin = (values) => {
    this.props.signinUser(values);
    this.handleClose();
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
              <ul id="category" className="dropdown-content">
                <li>
                  <a href="#!" className="collection-item black-text">
                    Breakfast
                  </a>
                </li>
                <li>
                  <a href="#!" className="collection-item black-text">Lunch</a>
                </li>
                <li>
                  <a href="#!" className="collection-item black-text">Dinner</a>
                </li>
                <li>
                  <a href="#!" className="collection-item black-text">
                    Appetizer
                  </a>
                </li>
                <li>
                  <a href="#!" className="collection-item black-text">Main</a>
                </li>
                <li>
                  <a href="#!" className="collection-item black-text">
                    Dessert
                  </a>
                </li>
              </ul>
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
};

export default Navbar;
