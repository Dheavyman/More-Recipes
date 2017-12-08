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
   * Creates an instance of Recipe.
   *
   * @param {any} props - This is the props param
   * @memberof Recipe
   */
  constructor(props) {
    super(props);
    this.state = {
      reviewContent: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitReview = this.handleSubmitReview.bind(this);
  }

  /**
   * Component did mount
   *
   * @returns {object} React element
   * @memberof Recipe
   */
  componentDidMount() {
    // Initialize materialize css parallax class
    $('.parallax').parallax();
    this.props.fetchRecipe(this.props.match.params.recipeId);
  }

  /**
   * Funtion to handle review input state
   *
   * @param {string} event - The input value
   * @returns {string} The updated state
   * @memberof Recipe
   */
  handleChange(event) {
    this.setState({
      reviewContent: event.target.value,
    });
  }

  /**
   * Function to handle submission of review
   *
   * @param {string} event - The user review
   * @returns {func} Dispatch function
   * @memberof Recipe
   */
  handleSubmitReview(event) {
    event.preventDefault();
    this.props.postReview(
      this.props.match.params.recipeId, this.state.reviewContent
    )
      .then((response) => {
        console.log(response);
        const { status } = response;
        if (status !== 401) {
          this.componentDidMount();
        }
        this.setState({
          reviewContent: '',
        });
      });
  }

  /**
   * Render method
   *
   * @returns {object} React element
   * @memberof Recipe
   */
  render() {
    console.log(this.props);
    const { singleRecipe } = this.props;
    return (
      <div>
        {!isEmpty(singleRecipe) &&
        <div>
          <header>
            <Header {...this.props} />
          </header>
          <main>
            <Main
              singleRecipe={singleRecipe}
              reviewContent={this.state.reviewContent}
              handleChange={this.handleChange}
              handleSubmitReview={this.handleSubmitReview}
            />
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
  postReview: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Recipe);
