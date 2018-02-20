import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actionCreators from '../../actions';
import Header from '../common/Header';
import Main from './Main';
import Footer from '../common/Footer';

const propTypes = {
  searchRecipe: PropTypes.func.isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      search: PropTypes.string,
      searchTerm: PropTypes.string,
    }),
  }),
  recipes: PropTypes.shape({
    searchResult: PropTypes.arrayOf(PropTypes.shape()),
  }).isRequired,
};

const defaultProps = {
  location: undefined,
};

/**
 * Class representing catalog page
 *
 * @class CatalogPage
 * @extends {Component}
 */
class CatalogPage extends Component {
  /**
   * Creates an instance of CatalogPage.
   *
   * @memberof CatalogPage
   */
  constructor() {
    super();
    this.state = {
      searchBy: 'name',
      searchTerm: '',
      searchedTerm: '',
      showText: false,
    };
  }

  /**
   * Component did mount lifecycle method
   *
   * @returns {any} Any
   * @memberof CatalogPage
   */
  componentDidMount() {
    const { location: { state }, searchRecipe } = this.props;
    window.scrollTo(0, 0);
    if (state) {
      searchRecipe(state.searchBy, state.searchTerm);
    }
  }

  /**
   * Component will receive props lifecycle method
   *
   * @returns {any} Sets state
   * @memberof CatalogPage
   */
  componentWillReceiveProps() {
    if (this.props.recipes.searchResult) {
      this.setState({
        showText: true,
      });
    }
  }

  /**
   * Function to handle change in search term
   *
   * @param {object} event - The event object
   *
   * @returns {any} Changes state to the current search term
   * @memberof CatalogPage
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
   * @memberof CatalogPage
   */
  handleSubmitSearch = (event) => {
    event.preventDefault();
    const { searchBy, searchTerm } = this.state;
    const { searchRecipe } = this.props;

    this.setState(() => ({
      searchedTerm: searchTerm,
    }));

    searchRecipe(searchBy, searchTerm);
  }

  /**
   * Render method
   *
   * @returns {object} React element
   * @memberof CatalogPage
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

CatalogPage.propTypes = propTypes;
CatalogPage.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(CatalogPage);
