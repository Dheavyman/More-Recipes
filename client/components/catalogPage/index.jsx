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
    state: PropTypes.string,
  }).isRequired,
};

const defaultProps = {
  searchTerm: undefined,
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
      searchTerm: '',
    };
  }

  /**
   * Component will mount lifecycle method
   *
   * @returns {any} Sets state
   * @memberof CatalogPage
   */
  // componentWillMount() {
  //   console.log('this', this.props);
  //   this.setState({
  //     searchTerm: this.props.location.state,
  //   });
  //   console.log('state', this.state);
  // }

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
      searchRecipe(state);
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
   * @memberof CatalogPage
   */
  handleSubmitSearch = (event) => {
    console.log('Handle submit function ------>>>>>');
    event.preventDefault();
    localStorage.setItem('searchTerm', this.state.searchTerm);
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

const mapStateToProps = state => ({
  recipes: state.recipes,
  user: state.user,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators(actionCreators, dispatch)
);

CatalogPage.propTypes = propTypes;
CatalogPage.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(CatalogPage);
