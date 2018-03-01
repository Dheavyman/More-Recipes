import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Navbar from './Navbar';
import SideNav from './SideNav';
import notify from '../../utils/notification';

const propTypes = {
  signupUser: PropTypes.func.isRequired,
  signinUser: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  user: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
    userSignin: PropTypes.shape({
      message: PropTypes.string
    })
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

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
   * Form submission handler function
   *
   * @param {any} values The form values
   * @returns {any} Submit function
   * @memberof Header
   */
  handleSubmitSignup = (values) => {
    this.props.signupUser(values)
      .then(() => {
        const { user: { userSignup } } = this.props;
        if (userSignup.message === 'User created') {
          this.handleClose();
          notify('success', 'Signup Successful, Please login to your account');
        }
      });
  }

  /**
   * Form submission handler function
   *
   * @param {any} values The form values
   * @returns {any} Submit function
   * @memberof Header
   */
  handleSubmitSignin = (values) => {
    this.props.signinUser(values)
      .then(() => {
        const { user: { userSignin } } = this.props;
        if (userSignin.message === 'User logged in') {
          this.handleClose();
          notify('success', 'Login Successful');
        }
      });
  }

  /**
   * Logout user from the application
   *
   * @returns {any} Logout user
   * @memberof Header
   */
  handleLogoutUser = () => {
    const { logoutUser, history } = this.props;
    logoutUser()
      .then(() => {
        notify('success', 'Logout Successful');
        history.push('/');
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
              handleSubmitSignup={this.handleSubmitSignup}
              handleSubmitSignin={this.handleSubmitSignin}
              handleLogoutUser={this.handleLogoutUser}
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
          handleLogoutUser={this.handleLogoutUser}
          {...this.props}
        />
      </div>
    );
  }
}

Header.propTypes = propTypes;

export default Header;
