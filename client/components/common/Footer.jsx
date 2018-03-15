import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Footer component
 *
 * @returns {object} React element
 */
const Footer = () => (
  <div className="page-footer deep-orange darken-1">
    <div className="container center-align">
      <div className="row">
        <div className="connect-icons col s12 m6 l6">
          <h5 className="white-text">Stay Connected</h5>
          <i className="fa fa-facebook-square fa-2x" />
          <i className="fa fa-twitter-square fa-2x" />
          <i className="fa fa-pinterest-square fa-2x" />
          <i className="fa fa-instagram fa-2x" />
        </div>
        <div className="col s12 m6 l4 offset-l2">
          <h5 className="white-text">Navigate</h5>
          <ul>
            <li>
              <Link to="/" className="grey-text text-lighten-3">Home</Link>
            </li>
            <li>
              <a className="grey-text text-lighten-3" href="#!">About Us</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div className="footer-copyright">
      <div className="container">
        © 2017 All rights reserved
      </div>
    </div>
  </div>
);

export default Footer;
