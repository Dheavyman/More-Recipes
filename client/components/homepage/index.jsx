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
      searchBy: 'name',
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

    if (value === 'name') {
      this.setState(() => ({
        searchBy: value
      }));
    } else if (value === 'ingredients') {
      this.setState(() => ({
        searchBy: value,
      }));
    } else {
      this.setState(() => ({
        searchTerm: value
      }));
    }
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
    const { searchBy, searchTerm } = this.state;
    localStorage.setItem('searchTerm', this.state.searchTerm);
    this.props.history.push({
      pathname: '/catalog',
      state: {
        searchBy,
        searchTerm,
      }
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

/**
 * Function to map values from state to props
 *
 * @param {any} state - The state values
 *
 * @returns {object} - The mapped props
 */
const mapStateToProps = state => ({
  recipes: state.recipes,
  user: state.user,
});

/**
 * Function to map dispatch to props
 * Action creators are binded to the dispatch function
 *
 * @param {any} dispatch - The store dispatch function
 *
 * @returns {any} The mapped props
 */
const mapDispatchToProps = dispatch => (
  bindActionCreators(actionCreators, dispatch)
);

Home.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(Home);
