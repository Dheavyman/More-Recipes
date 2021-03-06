import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actionCreators from '../../actions';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Main from './Main';
import notify from '../../utils/notification';

const propTypes = {
  recipes: PropTypes.shape({
    recipes: PropTypes.arrayOf(PropTypes.shape()),
  }).isRequired,
  retrievePopularRecipes: PropTypes.func.isRequired,
  retrieveRecipes: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      message: PropTypes.string,
    }),
  }).isRequired,
  resetAuthentication: PropTypes.func.isRequired,
};

/**
 * Class representing the home component
 *
 * @class Home
 *
 * @extends {Component}
 */
export class Home extends Component {
  /**
   * Creates an instance of Home.
   *
   * @memberof Home
   */
  constructor() {
    super();
    this.state = {
      search: 'title',
      list: '',
    };
  }

  /**
   * Component did mount function
   *
   * @returns {object} The response from the server
   *
   * @memberof Home
   */
  componentDidMount() {
    const {
      recipes: { recipes }, location: { state }, resetAuthentication,
      retrievePopularRecipes, retrieveRecipes
    } = this.props;

    retrievePopularRecipes();

    if (!recipes.length > 0) {
      retrieveRecipes();
    }
    if (state && state.message === 'Unauthenticated user') {
      resetAuthentication();
      notify('info', 'Please login to continue');
    }
  }

  /**
   * Function to handle change in search term
   *
   * @param {object} event - The event object
   *
   * @returns {any} Changes state to the current search term
   *
   * @memberof Home
   */
  handleSearchChange = (event) => {
    const { target: { value } } = event;

    if (value === 'title') {
      this.setState(() => ({
        search: value
      }));
    } else if (value === 'ingredients') {
      this.setState(() => ({
        search: value,
      }));
    } else {
      this.setState(() => ({
        list: value
      }));
    }
  }

  /**
   * Function to handle submitting search term
   *
   * @param {object} event - The event object
   *
   * @returns {any} Submits the search term
   *
   * @memberof Home
   */
  handleSubmitSearch = (event) => {
    event.preventDefault();
    const { search, list } = this.state;

    if (list !== '') {
      this.props.history.push({
        pathname: '/catalog',
        search: `?search=${search}&list=${list}`,
      });
    }
  }

  /**
   * Search recipes by category
   *
   * @param {object} event - The event performed
   *
   * @return {any} Submit the search
   *
   * @memberof Home
   */
  handleSearchCategory = (event) => {
    const { target: { name } } = event;
    this.props.history.push({
      pathname: '/catalog',
      search: `?search=category&list=${name}`,
    });
  }

  /**
   * The render function
   *
   * @returns {object} React element
   *
   * @memberof Home
   */
  render() {
    return (
      <div className="page-body">
        <header>
          <Header
            handleSearchCategory={this.handleSearchCategory}
            {...this.props}
          />
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
  userRecipes: state.userRecipes,
});

/**
 * Function to map dispatch to props
 * Action creators are bound to the dispatch function
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
