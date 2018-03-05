import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actionCreators from '../../actions';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Main from './Main';

const propTypes = {
  recipes: PropTypes.shape({
    recipes: PropTypes.arrayOf(PropTypes.shape()),
  }).isRequired,
  retrieveRecipes: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

/**
 * Class representing the home component
 *
 * @class Home
 *
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
    const { recipes: { recipes } } = this.props;

    if (!recipes.length > 0) {
      this.props.retrieveRecipes();
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
