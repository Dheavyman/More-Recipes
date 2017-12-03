import React from 'react';

import Navbar from '../common/Navbar';

/**
 * Class representing Header component
 * 
 * @class Header
 * @extends {React.Component}
 */
class Header extends React.Component {
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
   * Render method
   *
   * @returns {object} React element
   * @memberof Header
   */
  render() {
    return (
      <header>
        <div className="navbar-fixed">
          <nav className="nav-extended deep-orange darken-4">
            <Navbar {...this.props} />
            <div className="nav-content">
              <ul className="tabs tabs-transparent">
                <li className="tab"><a href="#user-recipes">My Recipes</a></li>
                <li className="tab">
                  <a href="#user-favorites">My Favorites</a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <ul className="side-nav" id="slide_out">
          <li>
            <div
              className={`nav-wrapper deep-orange darken-4
                hide-on-med-and-up`}
            >
              <a id="logo" href="index.html" className="white-text">
                More-Recipes
              </a>
            </div>
          </li>
          <li>
            <div className="user-view">
              <div className="background">
                <img src="images/background4.jpg" alt="" />
              </div>
              <a href="#!user">
                <img className="circle" src="images/avatar.png" alt="" />
              </a>
              <a href="#!name">
                <span className="white-text name">John Stew</span>
              </a>
              <a href="#!email">
                <span className="white-text email">johnstew@gmail.com</span>
              </a>
            </div>
          </li>
          <li><a href="index.html">Home</a></li>
          <li>
            <ul className="collapsible" data-collapsible="accordion">
              <li>
                <div className="collapsible-header black-text">Category</div>
                <div className="collapsible-body">
                  <ul>
                    <li>
                      <a href="#!" className="collection-item">Breakfast</a>
                    </li>
                    <li>
                      <a href="#!" className="collection-item">Lunch</a>
                    </li>
                    <li>
                      <a href="#!" className="collection-item">Dinner</a>
                    </li>
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
          <li><a href="profile.html">Profile</a></li>
          <li>
            <div className="divider" />
          </li>
          <li><a className="subheader">Activities</a></li>
          <li>
            <a href="recipes.html">
              My Recipes
              <span className="badge">22</span>
            </a>
          </li>
          <li>
            <a href="?#user-favorites">
              My Favorites
              <span className="badge">55</span>
            </a>
          </li>
          <li>
            <a href="profile.html?#notifications">
              Notificatons
              <span className="new badge blue">2</span>
            </a>
          </li>
          <li>
            <div className="divider" />
          </li>
          <li><a href="index.html">Logout</a></li>
        </ul>
      </header>
    );
  }
}

export default Header;
