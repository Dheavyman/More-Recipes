import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { ToastContainer } from 'react-toastify';

import Navbar from './Navbar';
import SideNav from './SideNav';
import notify from '../../utils/notification';

const propTypes = {
  signupUser: PropTypes.func.isRequired,
  signinUser: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  user: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
    userAuthentication: PropTypes.shape({
      message: PropTypes.string
    })
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape(),
  }).isRequired,
  handleSearchCategory: PropTypes.func,
};

const defaultProps = {
  handleSearchCategory: undefined
};

/**
 * Class representing Header component
 *
 * @class Header
 *
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
  }

  /**
   * Component did mount method
   *
   * @returns {any} Initialize materialize components
   *
   * @memberof Header
   */
  componentDidMount() {
    // Initialize materialize css side nav menu activator
    $('.button-collapse').sideNav({
      closeOnClick: true,
      draggable: true,
    });
    // Initialize materialize dropdown class
    $('.dropdown-button').dropdown({
      belowOrigin: true,
    });
  }

  /**
   * Open or close the signup modal
   *
   * @returns {object} Toggle openSignup state
   *
   * @memberof Header
   */
  handleToggleSignupModal = () => {
    this.setState({ openSignup: !this.state.openSignup });
  }

  /**
   * Open or close the signin modal
   *
   * @returns {object} Toggle openSignin state
   *
   * @memberof Header
   */
  handleToggleSigninModal = () => {
    this.setState({ openSignin: !this.state.openSignin });
  }

  handleToggleModal = () => {
    this.setState({
      openSignin: !this.state.openSignin,
      openSignup: !this.state.openSignup,
    });
  }

  /**
   * Form submission handler function
   *
   * @param {any} values The form values
   *
   * @returns {any} Submit function
   *
   * @memberof Header
   */
  handleSubmitSignup = (values) => {
    this.props.signupUser(values)
      .then(() => {
        const { user: { error } } = this.props;
        if (isEmpty(error)) {
          this.handleToggleSignupModal();
          notify('success', 'Signup Successful');
        }
      });
  }

  /**
   * Form submission handler function
   *
   * @param {any} values The form values
   *
   * @returns {any} Submit function
   *
   * @memberof Header
   */
  handleSubmitSignin = (values) => {
    const { signinUser, history, location: { state } } = this.props;
    console.log('the state on signin =======', state);
    signinUser(values)
      .then(() => {
        const { user: { error } } = this.props;
        if (isEmpty(error)) {
          this.handleToggleSigninModal();
          if (!isEmpty(state) || state !== undefined) {
            console.log('this happened=======>>>>>>');
            history.push(state.from.pathname);
          } else {
            notify('success', 'Login Successful');
          }
        }
      });
  }

  /**
   * Logout user from the application
   *
   * @returns {any} Logout user
   *
   * @memberof Header
   */
  handleLogoutUser = () => {
    const { logoutUser, history } = this.props;
    logoutUser()
      .then(() => {
        history.push('/');
      });
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
          <nav className="deep-orange darken-4">
            <Navbar
              openSignup={this.state.openSignup}
              openSignin={this.state.openSignin}
              handleToggleSignupModal={this.handleToggleSignupModal}
              handleToggleSigninModal={this.handleToggleSigninModal}
              handleToggleModal={this.handleToggleModal}
              handleSubmitSignup={this.handleSubmitSignup}
              handleSubmitSignin={this.handleSubmitSignin}
              handleLogoutUser={this.handleLogoutUser}
              handleSearchCategory={this.props.handleSearchCategory}
              {...this.props}
            />
          </nav>
        </div>
        <SideNav
          openSignup={this.state.openSignup}
          openSignin={this.state.openSignin}
          handleToggleSignupModal={this.handleToggleSignupModal}
          handleToggleSigninModal={this.handleToggleSigninModal}
          handleLogoutUser={this.handleLogoutUser}
          handleSearchCategory={this.props.handleSearchCategory}
          {...this.props}
        />
        <ToastContainer />
      </div>
    );
  }
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
