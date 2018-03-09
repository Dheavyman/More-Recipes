import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import queryString from 'query-string';

import actionCreators from '../../actions';
import Header from '../common/Header';
import Main from './Main';
import Footer from '../common/Footer';

const propTypes = {
  searchRecipe: PropTypes.func.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
  history: PropTypes.shape({
    replace: PropTypes.func,
  }).isRequired,
  recipes: PropTypes.shape({
    recipes: PropTypes.arrayOf(PropTypes.shape()),
    searchPerformed: PropTypes.bool.isRequired,
  }).isRequired,
  retrieveRecipes: PropTypes.func.isRequired,
};

const defaultProps = {
  location: undefined,
};

/**
 * Class representing catalog page
 *
 * @class CatalogPage
 *
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
      search: 'title',
      list: '',
      searchedTerm: '',
      searchPerformed: false,
      limit: 8,
      offset: 8,
    };
  }

  /**
   * Component did mount lifecycle method
   *
   * @returns {any} Any
   *
   * @memberof CatalogPage
   */
  componentDidMount() {
    window.scrollTo(0, 0);
    window.onscroll = () => {
      if (document.body.scrollTop > 1000
        || document.documentElement.scrollTop > 1000) {
        document.getElementById('scroll-to-top').style.display = 'block';
      } else {
        document.getElementById('scroll-to-top').style.display = 'none';
      }
    };

    const { location: { search }, searchRecipe, retrieveRecipes,
      recipes: { recipes } } = this.props;

    if (search !== '') {
      const parsed = queryString.parse(search);

      if (parsed.search && parsed.list) {
        searchRecipe(parsed.search, parsed.list);
      }
    } else if (recipes.length <= 0) {
      retrieveRecipes();
    }
  }

  /**
   * Component will receive props lifecycle method
   *
   * @param {object} nextProps - The next properties passed
   *
   * @returns {any} Sets state
   *
   * @memberof CatalogPage
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.recipes.recipes.length > 0) {
      this.setState((previousState, props) => ({
        offset: props.recipes.recipes.length,
      }));
    }

    if (nextProps.recipes.searchPerformed) {
      this.setState({
        searchPerformed: true,
      });
    }
  }

  /**
   * Component will unmount lifecyle method
   *
   * @returns {any} Remove onscroll event listener
   *
   * @memberof CatalogPage
   */
  componentWillUnmount() {
    window.onscroll = undefined;
  }

  /**
   * Function to handle change in search term
   *
   * @param {object} event - The event object
   *
   * @returns {any} Changes state to the current search term
   *
   * @memberof CatalogPage
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
   * @memberof CatalogPage
   */
  handleSubmitSearch = (event) => {
    event.preventDefault();
    const { search, list } = this.state;
    const { searchRecipe } = this.props;

    if (list !== '') {
      this.setState(() => ({
        searchedTerm: list,
      }));

      searchRecipe(search, list);
      this.props.history.replace({
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
   * @memberof CatalogPage
   */
  handleSearchCategory = (event) => {
    console.log('the event======>>>>>>>', event.target.name);
    const { target: { name } } = event;
    const { searchRecipe } = this.props;

    searchRecipe('category', name);
    this.props.history.replace({
      pathname: '/catalog',
      search: `?search=category&list=${name}`,
    });
  }

  /**
   * Function to retrieve more recipes for more pages
   *
   * @returns {any} Retrieve more recipes
   *
   * @memberof CatalogPage
   */
  retrieveMoreRecipes = () => {
    const { limit, offset } = this.state;
    const { retrieveRecipes } = this.props;

    retrieveRecipes(limit, offset);
  }

  /**
   * Fuction to scroll to the top of the page
   *
   * @returns {any} Scrolls the page
   *
   * @memberof CatalogPage
   */
  scrollToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  /**
   * Render method
   *
   * @returns {object} React element
   *
   * @memberof CatalogPage
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
        <main className="grey lighten-3">
          <Main
            handleSearchChange={this.handleSearchChange}
            handleSubmitSearch={this.handleSubmitSearch}
            retrieveMoreRecipes={this.retrieveMoreRecipes}
            scrollToTop={this.scrollToTop}
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
