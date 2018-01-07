import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import SideNav from '../common/SideNav';

/**
 * Class representing Header component
 *
 * @class Header
 * @extends {React.Component}
 */
class Header extends React.Component {
  /**
   * Creates an instance of Header.
   *
   * @memberof Header
   */
  constructor() {
    super();
    this.handleLogoutUser = this.handleLogoutUser.bind(this);
  }
  /**
   * Component did mount lifecycle method
   *
   * @returns {function} Initialize materialize componenets
   * @memberof Header
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
    // Initailize materialize tab class
    $('ul.tabs').tabs();
  }

  /**
   * Logout user from the application
   *
   * @returns {any} Logout user
   * @memberof Header
   */
  handleLogoutUser() {
    const { logoutUser, history } = this.props;
    logoutUser();
    history.push('/');
  }

  /**
   * Render method
   *
   * @returns {object} React element
   * @memberof Header
   */
  render() {
    return (
      <div>
        <div className="navbar-fixed">
          <nav className="nav-extended deep-orange darken-4">
            <div className="nav-wrapper" >
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
            </div>
            <div className="nav-content">
              <ul className="tabs tabs-transparent">
                <li className="tab"><a href="#user-profile">Profile</a></li>
                <li className="tab"><a href="#user-recipes">My Recipes</a></li>
                <li className="tab">
                  <a href="#user-favorites">My Favorites</a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <SideNav {...this.props} />
      </div>
    );
  }
}

Header.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Header;
