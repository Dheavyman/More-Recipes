import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import actionCreators from '../../actions';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Main from './Main';

/**
 * Class representing recipe details page
 *
 * @class Recipe
 * @extends {React.Component}
 */
class Recipe extends React.Component {
  /**
   * Component did mount
   *
   * @returns {object} React element
   * @memberof Recipe
   */
  componentDidMount() {
    console.log('Mounted', this.props);
    // Initialize materialize css parallax class
    $('.parallax').parallax();
    this.props.fetchRecipe(this.props.match.params.recipeId);
  }
  /**
   * Render method
   *
   * @returns {object} React element
   * @memberof Recipe
   */
  render() {
    const { singleRecipe } = this.props;
    return (
      <div>
        {!isEmpty(singleRecipe) &&
        <div>
          <header>
            <Header {...this.props} />
          </header>
          <main>
            <Main singleRecipe={singleRecipe} />
          </main>
          <footer>
            <Footer />
          </footer>
        </div>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  singleRecipe: state.singleRecipe.recipe,
  user: state.user,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators(actionCreators, dispatch)
);

Recipe.propTypes = {
  singleRecipe: PropTypes.shape({
    data: PropTypes.shape({
      recipe: PropTypes.shape()
    })
  }).isRequired,
  fetchRecipe: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      recipeId: PropTypes.string,
    })
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Recipe);
