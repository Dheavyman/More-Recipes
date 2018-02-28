import React, { Component } from 'react';

import Navbar from './Navbar';
import SideNav from './SideNav';

/**
 * Class representing Header component
 *
 * @class Header
 * @extends {Component}
 */
class Header extends Component {
  /**
   * Creates an instance of Header.
   *
   * @memberof Header
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
  }

  /**
   * Opens the signup modal
   *
   * @returns {object} Set open state to true
   * @memberof Header
   */
  handleOpenSignup() {
    this.setState({ openSignup: true });
  }

  /**
   * Opens the signin modal
   *
   * @returns {object} Set open state to true
   * @memberof Header
   */
  handleOpenSignin() {
    this.setState({ openSignin: true });
  }

  /**
   * Closes the modal
   *
   * @param {object} errors - The error object
   *
   * @returns {object} Set open state to false
   * @memberof Header
   */
  handleClose() {
    this.setState({
      openSignup: false,
      openSignin: false
    });
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
          <nav className="deep-orange darken-4">
            <Navbar
              openSignup={this.state.openSignup}
              openSignin={this.state.openSignin}
              handleOpenSignup={this.handleOpenSignup}
              handleOpenSignin={this.handleOpenSignin}
              handleClose={this.handleClose}
              {...this.props}
            />
          </nav>
        </div>
        <SideNav
          openSignup={this.state.openSignup}
          openSignin={this.state.openSignin}
          handleOpenSignup={this.handleOpenSignup}
          handleOpenSignin={this.handleOpenSignin}
          handleClose={this.handleClose}
          {...this.props}
        />
      </div>
    );
  }
}

export default Header;
