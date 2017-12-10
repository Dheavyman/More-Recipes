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
      openSignup: false,
      openSignin: false,
      reviewContent: '',
    };
    this.handleOpenSignup = this.handleOpenSignup.bind(this);
    this.handleOpenSignin = this.handleOpenSignin.bind(this);
    this.handleClose = this.handleClose.bind(this);
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
   * Opens the signup modal
   *
   * @returns {object} Set open state to true
   * @memberof Recipe
   */
  handleOpenSignup() {
    this.setState({ openSignup: true });
  }

  /**
   * Opens the signin modal
   *
   * @returns {object} Set open state to true
   * @memberof Recipe
   */
  handleOpenSignin() {
    this.setState({ openSignin: true });
  }

  /**
   * Closes the modal
   *
   * @param {object} errors - The error object
   * @returns {object} Set open state to false
   * @memberof Recipe
   */
  handleClose() {
    this.setState({
      openSignup: false,
      openSignin: false
    });
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
    const { user: { isAuthenticated } } = this.props,
      review = {
        content: this.state.reviewContent,
      };

    if (isAuthenticated) {
      this.props.postReview(
        this.props.match.params.recipeId, review
      )
        .then(() => {
          const { singleRecipe: { error } } = this.props;
          if (isEmpty(error)) {
            this.componentDidMount();
            this.setState({
              reviewContent: '',
            });
          }
        });
    } else {
      this.handleOpenSignin();
    }
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
            <Header
              openSignup={this.state.openSignup}
              openSignin={this.state.openSignin}
              handleOpenSignup={this.handleOpenSignup}
              handleOpenSignin={this.handleOpenSignin}
              handleClose={this.handleClose}
              {...this.props}
            />
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
  user: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
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
