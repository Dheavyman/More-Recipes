import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export default (ComposedComponent) => {
  /**
   * Class representing authentication component
   *
   * @class Authentication
   * @extends {Component}
   */
  class Authentication extends React.Component {
    /**
     * Component will mount lifecycle method
     *
     * @returns {any} Redirects user to signin
     * @memberof Authentication
     */
    componentWillMount() {
      if (!this.props.isAuthenticated) {
        console.log('This executed');
        this.props.history.push('/');
      }
    }

    /**
     * Component will update lifecycle method
     *
     * @param {any} nextProps - The next props
     * @returns {func} Redirect user to signin
     * @memberof Authentication
     */
    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        this.props.history.push('/');
      }
    }

    /**
     * Render method
     *
     * @returns {object} The composed component
     * @memberof Authentication
     */
    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  const mapStateToProps = state => ({
    user: state.user,
    isAuthenticated: state.user.isAuthenticated,
  });

  Authentication.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  };

  return connect(mapStateToProps)(Authentication);
};
