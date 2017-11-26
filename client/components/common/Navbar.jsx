import React from 'react';
import { Link } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Modal from '../homepage/Modal';

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
      open: false
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
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
   * Opens the modal
   *
   * @returns {object} Set open state to true
   * @memberof Navbar
   */
  handleOpen() {
    this.setState({ open: true });
  }

  /**
   * Closes the modal
   *
   * @returns {object} Set open state to false
   * @memberof Navbar
   */
  handleClose() {
    this.setState({ open: false });
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
                    <a href="#signin" className="modal-trigger black-text">
                      Sign in
                      <i className="material-icons left">person</i>
                    </a>
                  </li>
                  <li>
                    <a
                      role="button"
                      tabIndex="0"
                      className="black-text"
                      onClick={this.handleOpen}
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
          <Modal open={this.state.open} handleClose={this.handleClose} />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Navbar;
