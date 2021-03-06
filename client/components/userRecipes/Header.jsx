import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import SideNav from '../common/SideNav';

const propTypes = {
  logoutUser: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

/**
 * Class representing Header component
 *
 * @class Header
 *
 * @extends {React.Component}
 */
class Header extends React.Component {
  /**
   * Component did mount life cycle method
   *
   * @returns {function} Initialize materialize components
   *
   * @memberof Header
   */
  componentDidMount() {
    // Initialize materialize css side nav menu activator
    $('.button-collapse').sideNav({
      closeOnClick: true,
      draggable: true,
    });
    // Initialize materialize tab class
    $('ul.tabs').tabs();
  }

  /**
   * Render method
   *
   * @returns {object} React element
   *
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
                <li className="tab">
                  <a data-tab="user-profile" href="#user-profile">Profile</a>
                </li>
                <li className="tab">
                  <a data-tab="user-recipes" href="#user-recipes">Recipes</a>
                </li>
                <li className="tab">
                  <a data-tab="user-favorites" href="#user-favorites">
                    Favorites
                  </a>
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

Header.propTypes = propTypes;

export default Header;
