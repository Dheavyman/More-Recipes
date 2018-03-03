import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { decodeToken } from '../../utils/authenticate';

const propTypes = {
  handleOpenSignup: PropTypes.func,
  handleOpenSignin: PropTypes.func,
  handleLogoutUser: PropTypes.func.isRequired,
  user: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
    userProfile: PropTypes.shape({
      notifications: PropTypes.bool,
    })
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string
  }).isRequired,
  userRecipes: PropTypes.shape({
    userAddedRecipesCount: PropTypes.number,
    userFavoritesCount: PropTypes.number,
  }),
  editUserProfile: PropTypes.func.isRequired,
  currentProfileUserId: PropTypes.number,
  authenticatedUserId: PropTypes.number,
};

const defaultProps = {
  handleOpenSignup: undefined,
  handleOpenSignin: undefined,
  currentProfileUserId: null,
  authenticatedUserId: null,
  userRecipes: undefined,
};

/**
 * Class representing Side nav component
 *
 * @class SideNav
 *
 * @extends {React.Component}
 */
class SideNav extends React.Component {
  /**
   * ComponentDidMount lifecycle method
   *
   * @returns {any} Initialize materialize collapsible class
   *
   * @memberof SideNav
   */
  componentDidMount() {
    $('.collapsible').collapsible();
  }

  /**
   * Function to handle changing of tabs
   *
   * @param {any} event - Event from clicking and element
   *
   * @returns {any} Changes to the corresponding tab
   *
   * @memberof SideNav
   */
  handleTabChange = (event) => {
    event.preventDefault();
    const { target: { name } } = event;
    $('ul.tabs').tabs('select_tab', name);
  }

  /**
   * Handle change in notification switch
   *
   * @returns {object} Change the switch position
   *
   * @memberof SideNav
   */
  handleNotificationChange = () => {
    const { editUserProfile } = this.props;
    const checked = document.getElementById('notification-switch').checked;
    const status = {
      notifications: checked,
    };

    editUserProfile(status);
  }

  /**
   * Render function
   *
   * @returns {object} React element
   *
   * @memberof SideNav
   */
  render() {
    const {
      user, location: { pathname }, handleOpenSignup, handleOpenSignin,
      handleLogoutUser, userRecipes, currentProfileUserId, authenticatedUserId,
    } = this.props;
    const { isAuthenticated, userProfile: { notifications } } = user;
    const userUrl = new RegExp(/users/);
    const dashboard = pathname.match(userUrl) === null ? null : 'fixed';
    const decoded = decodeToken();
    let userId;

    if (decoded) {
      const { user: { id } } = decoded;
      userId = id;
    }
    return (
      <div>
        <ul className={`side-nav ${dashboard}`} id="slide_out">
          <li><Link to="/">Home</Link></li>
          <li>
            <ul className="collapsible" data-collapsible="accordion">
              <li>
                <div className="collapsible-header black-text">Category</div>
                <div className="collapsible-body">
                  <ul>
                    <li>
                      <a href="#!" className="collection-item">Breakfast</a>
                    </li>
                    <li><a href="#!" className="collection-item">Lunch</a></li>
                    <li><a href="#!" className="collection-item">Dinner</a></li>
                    <li>
                      <a href="#!" className="collection-item">Appetizer</a>
                    </li>
                    <li><a href="#!" className="collection-item">Main</a></li>
                    <li>
                      <a href="#!" className="collection-item">Dessert</a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </li>
          <li>
            <div className="divider" />
          </li>
          {isAuthenticated
            ? <div>
              <li><Link to={`/users/${userId}/dashboard`} >Dashboard</Link></li>
              <li>
                <div className="divider" />
              </li>
              <li>
                <a name="user-profile" href="#!" onClick={this.handleTabChange}>
                  Profile
                </a>
              </li>
              <li><a className="subheader">Activities</a></li>
              <li>
                <a name="user-recipes" href="#!" onClick={this.handleTabChange}>
                  Recipes
                  <span className="badge">
                    {userRecipes && userRecipes.userAddedRecipesCount}
                  </span>
                </a>
              </li>
              <li>
                <a
                  name="user-favorites"
                  href="#!"
                  onClick={this.handleTabChange}
                >
                  Favorites
                  <span className="badge">
                    {userRecipes && userRecipes.userFavoritesCount}
                  </span>
                </a>
              </li>
              {currentProfileUserId === authenticatedUserId &&
                <li>
                  <a>
                    Notificatons
                    <span className=" badge switch">
                      <label htmlFor="notification-switch">
                        <input
                          id="notification-switch"
                          type="checkbox"
                          onClick={this.handleNotificationChange}
                          defaultChecked={notifications}
                        />
                        <span className="lever" />
                      </label>
                    </span>
                  </a>
                </li>
              }
              <li>
                <div className="divider" />
              </li>
              <li>
                <a
                  role="button"
                  tabIndex="0"
                  onClick={handleLogoutUser}
                >
                  Logout
                </a>
                <ToastContainer />
              </li>
            </div>
            : <div>
              <li>
                <a
                  role="button"
                  tabIndex="0"
                  onClick={handleOpenSignin}
                >
                  Sign In
                </a>
              </li>
              <li>
                <a
                  role="button"
                  tabIndex="0"
                  onClick={handleOpenSignup}
                >
                  Register
                </a>
              </li>
            </div>
          }
        </ul>
      </div>
    );
  }
}

SideNav.propTypes = propTypes;
SideNav.defaultProps = defaultProps;

export default SideNav;
