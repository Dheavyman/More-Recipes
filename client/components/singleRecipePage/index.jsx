import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { ToastContainer } from 'react-toastify';

import actionCreators from '../../actions';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Main from './Main';
import Spinner from '../common/Spinner';
import { getToken } from '../../utils/authenticate';
import notify from '../../utils/notification';

const propTypes = {
  singleRecipe: PropTypes.shape({
    recipe: PropTypes.shape({
      id: PropTypes.number,
    }),
    reviews: PropTypes.arrayOf(PropTypes.shape()),
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
  upvoteRecipe: PropTypes.func.isRequired,
  downvoteRecipe: PropTypes.func.isRequired,
  setFavorite: PropTypes.func.isRequired,
  fetchReviews: PropTypes.func.isRequired,
  clearReviews: PropTypes.func.isRequired,
  deleteReview: PropTypes.func.isRequired,
};

/**
 * Class representing recipe details page
 *
 * @class Recipe
 *
 * @extends {Component}
 */
class Recipe extends Component {
  /**
   * Creates an instance of Recipe.
   *
   * @param {any} props - This is the props param
   *
   * @memberof Recipe
   */
  constructor(props) {
    super(props);
    this.state = {
      openSignup: false,
      openSignin: false,
      reviewContent: '',
      limit: 5,
      offset: 5,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAddReview = this.handleAddReview.bind(this);
    this.handleUpvote = this.handleUpvote.bind(this);
    this.handleDownvote = this.handleDownvote.bind(this);
    this.handleFavorite = this.handleFavorite.bind(this);
  }

  /**
   * Component did mount
   *
   * @returns {object} React element
   *
   * @memberof Recipe
   */
  componentDidMount() {
    window.scrollTo(0, 0);

    const { fetchRecipe, fetchReviews, match } = this.props;
    const { params: { recipeId } } = match;

    fetchRecipe(recipeId);
    fetchReviews(recipeId);
  }

  /**
   * Component will receive props lifecycle method
   *
   * @param {any} nextProps - The next properties passed to the component
   *
   * @returns {any} Set new state data
   *
   * @memberof Recipe
   */
  componentWillReceiveProps(nextProps) {
    const { singleRecipe: { hasMoreReviews, reviews } } = nextProps;

    if (hasMoreReviews) {
      this.setState({
        offset: reviews.length,
      });
    }
  }

  /**
   * Component will unmount lifecycle method
   *
   * @returns {any} Clear recipe reviews
   *
   * @memberof Recipe
   */
  componentWillUnmount() {
    this.props.clearReviews();
  }

  /**
   * Funtion to handle review input state
   *
   * @param {string} event - The input value
   *
   * @returns {string} The updated state
   *
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
   *
   * @returns {func} Dispatch function
   *
   * @memberof Recipe
   */
  handleAddReview(event) {
    event.preventDefault();
    const { postReview, match, user: { isAuthenticated } } = this.props;
    const { params: { recipeId } } = match;
    const review = {
      content: this.state.reviewContent,
    };
    if (isAuthenticated && getToken() !== null) {
      postReview(recipeId, review)
        .then(() => {
          const { singleRecipe: { error } } = this.props;
          if (isEmpty(error)) {
            this.setState({
              reviewContent: '',
            });
          }
        });
    } else {
      notify('info', 'Please login to post review');
    }
  }

  /**
   * Function to delete a review
   *
   * @param {number} recipeId - Id of recipe
   * @param {number} reviewId - Id of review
   * @returns {any} Delete review
   * @memberof Recipe
   */
  handleDeleteReview = (recipeId, reviewId) => {
    const { deleteReview } = this.props;

    deleteReview(recipeId, reviewId);
  }

  /**
   * Function to handle upvoting a recipe
   *
   * @returns {any} Upvote recipe
   *
   * @memberof Recipe
   */
  handleUpvote() {
    const { singleRecipe, upvoteRecipe } = this.props;
    const { recipe: { id } } = singleRecipe;

    upvoteRecipe(id);
  }

  /**
   * Function to handle downvoting a recipe
   *
   * @returns {any} Downvote recipe
   *
   * @memberof Recipe
   */
  handleDownvote() {
    const { singleRecipe, downvoteRecipe } = this.props;
    const { recipe: { id } } = singleRecipe;

    downvoteRecipe(id);
  }

  /**
   * Function to handle downvoting a recipe
   *
   * @returns {any} Favorite recipe
   *
   * @memberof Recipe
   */
  handleFavorite() {
    const { singleRecipe, setFavorite } = this.props;
    const { recipe: { id } } = singleRecipe;

    setFavorite(id);
  }

  /**
   * Function to handle viewing more reviews
   *
   * @returns {any} Fetch more recipes
   *
   * @memberof Recipe
   */
  handleViewMoreReviews = () => {
    const { limit, offset } = this.state;
    const { fetchReviews, match } = this.props;
    const { params: { recipeId } } = match;

    fetchReviews(recipeId, limit, offset);
  }

  /**
   * Render notification
   *
   * @returns {object} React element
   *
   * @memberof Recipe
   */
  renderNotFound = () => (
    <div className="row center-align">
      <div className="not-found">
        <p className="page-data">RECIPE NOT FOUND</p>
        <i className="material-icons large">error</i>
      </div>
    </div>
  )

  /**
   * Render main component
   *
   * @returns {object} React element
   *
   * @memberof Recipe
   */
  renderMainComponent = () => {
    const { singleRecipe } = this.props;
    const { recipe } = singleRecipe;

    return (
      <div>
        {isEmpty(recipe)
          ? this.renderNotFound()
          : <Main
            singleRecipe={singleRecipe}
            reviewContent={this.state.reviewContent}
            handleChange={this.handleChange}
            handleAddReview={this.handleAddReview}
            handleUpvote={this.handleUpvote}
            handleDownvote={this.handleDownvote}
            handleFavorite={this.handleFavorite}
            handleViewMoreReviews={this.handleViewMoreReviews}
            handleDeleteReview={this.handleDeleteReview}
          />
        }
      </div>
    );
  }

  /**
   * Render method
   *
   * @returns {object} React element
   *
   * @memberof Recipe
   */
  render() {
    const { singleRecipe } = this.props;
    const { isLoading } = singleRecipe;

    return (
      <div className="row">
        <div className="page-body">
          <header>
            <Header
              {...this.props}
            />
          </header>
          <main>
            {isLoading
              ? <div className="center-spinner center-align">
                <Spinner size="big" />
              </div>
              : this.renderMainComponent()
            }
            <ToastContainer />
          </main>
          <footer>
            <Footer />
          </footer>
        </div>
      </div>
    );
  }
}

/**
 * Function to map values from state to props
 *
 * @param {object} state - The state values
 *
 * @returns {object} - The mapped props
 */
const mapStateToProps = state => ({
  singleRecipe: state.singleRecipe,
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

Recipe.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(Recipe);
