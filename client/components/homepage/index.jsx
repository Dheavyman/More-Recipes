import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import actionCreators from '../../actions';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Main from './Main';

const propTypes = {
  retrieveRecipes: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

/**
 * Class representing the home component
 *
 * @class Home
 * @extends {Component}
 */
class Home extends Component {
  /**
   * Creates an instance of Home.
   *
   * @memberof Home
   */
  constructor() {
    super();
    this.state = {
      searchTerm: '',
    };
  }

  /**
   * Component did mount function
   *
   * @returns {object} The response from the server
   * @memberof Home
   */
  componentDidMount() {
    this.props.retrieveRecipes();
  }

  /**
   * Function to handle change in search term
   *
   * @param {object} event - The event object
   *
   * @returns {any} Changes state to the current search term
   * @memberof Home
   */
  handleSearchChange = (event) => {
    const { target: { value } } = event;
    this.setState(() => ({
      searchTerm: value
    }));
  }

  /**
   * Function to handle submitting search term
   *
   * @param {object} event - The event object
   *
   * @returns {any} Submits the search term
   * @memberof Home
   */
  handleSubmitSearch = (event) => {
    event.preventDefault();
    localStorage.setItem('searchTerm', this.state.searchTerm);
    this.props.history.push({
      pathname: '/catalog',
      state: this.state.searchTerm,
    });
  }

  /**
   * The render function
   *
   * @returns {object} React element
   * @memberof Home
   */
  render() {
    return (
      <div>
        <header>
          <Header {...this.props} />
        </header>
        <main>
          <Main
            handleSearchChange={this.handleSearchChange}
            handleSubmitSearch={this.handleSubmitSearch}
            {...this.state}
            {...this.props}
          />
        </main>
        <footer>
          <Footer />
        </footer>
        <ToastContainer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  recipes: state.recipes,
  user: state.user,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators(actionCreators, dispatch)
);

Home.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(Home);
