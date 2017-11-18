import React from 'react';

const Navbar = () => (
  <div className="navbar-fixed">
    <nav className="deep-orange darken-4">
      <div className="nav-wrapper">
        <a
          href="index.html"
          id="logo"
          className="brand-logo hide-on-small-only"
        >
          More-Recipes
        </a>
        <a
          data-activates="slide_out"
          className="button-collapse"
        >
          <i className="material-icons">menu</i>
        </a>
        <ul className="right hide-on-med-and-down">
          <li><a href="index.html">Home</a></li>
          <li>
            <a className="dropdown-button" data-activates="dropdown1">
              Category
            </a>
          </li>
          <ul id="dropdown1" className="dropdown-content">
            <li>
              <a href="#!" className="collection-item black-text">Breakfast</a>
            </li>
            <li>
              <a href="#!" className="collection-item black-text">Lunch</a>
            </li>
            <li>
              <a href="#!" className="collection-item black-text">Dinner</a>
            </li>
            <li>
              <a href="#!" className="collection-item black-text">Appetizer</a>
            </li>
            <li>
              <a href="#!" className="collection-item black-text">Main</a>
            </li>
            <li>
              <a href="#!" className="collection-item black-text">Dessert</a>
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
                <a href="#signup" className="modal-trigger black-text">
                  Register
                  <i className="material-icons left">folder</i>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  </div>
);

export default Navbar;
