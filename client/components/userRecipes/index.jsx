import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { ToastContainer } from 'react-toastify';

import actionCreators from '../../actions';
import Header from './Header';
import Main from './Main';
import { decodeToken } from '../../utils/authenticate';
import config from '../../config';
import recipeAvatar from '../../public/images/recipe-avatar2.png';
import notify from '../../utils/notification';

const propTypes = {
  fetchUserProfile: PropTypes.func.isRequired,
  fetchUserRecipes: PropTypes.func.isRequired,
  fetchUserFavorites: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  addRecipe: PropTypes.func.isRequired,
  editRecipe: PropTypes.func.isRequired,
  deleteRecipe: PropTypes.func.isRequired,
  setFavorite: PropTypes.func.isRequired,
  searchRecipe: PropTypes.func.isRequired,
  user: PropTypes.shape({
    errorFetchingProfile: PropTypes.shape(),
  }).isRequired,
  userRecipes: PropTypes.shape({
    imageUploading: PropTypes.bool.isRequired,
    imageUrl: PropTypes.string
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      userId: PropTypes.string,
    })
  }).isRequired,
  logoutUser: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
    replace: PropTypes.func,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

/**
 * Class representing user recipes
 *
 * @class UserRecipes
 *
 * @extends {React.Component}
 */
class UserRecipes extends React.Component {
  /**
   * Creates an instance of UserRecipes.
   *
   * @memberof UserRecipes
   */
  constructor() {
    super();
    this.state = {
      recipeId: null,
      currentProfileUserId: null,
      authenticatedUserId: null,
      recipeToEdit: {},
      openEdit: false,
      openDelete: false,
      openAdd: false,
      title: '',
      category: 'Select Category',
      description: '',
      preparationTime: undefined,
      ingredients: '',
      directions: '',
      imageData: null,
      imagePreview: '',
      deleteMessage: '',
      actionTitle: '',
      action: '',
    };
    this.handleOpenEdit = this.handleOpenEdit.bind(this);
    this.handleOpenDelete = this.handleOpenDelete.bind(this);
    this.handleOpenAdd = this.handleOpenAdd.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleImagePreview = this.handleImagePreview.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleEditChange = this.handleEditChange.bind(this);
    this.handleEditRecipe = this.handleEditRecipe.bind(this);
    this.handleDeleteRecipe = this.handleDeleteRecipe.bind(this);
    this.handleAddRecipe = this.handleAddRecipe.bind(this);
  }

  /**
   * Component did mount life cycle method
   *
   * @returns {any} Fetches user favorite recipes
   *
   * @memberof UserFavorites
   */
  componentWillMount() {
    const { match: { params: { userId } } } = this.props;
    const { user: { id } } = decodeToken();
    this.setState({
      currentProfileUserId: parseInt(userId, 10),
      authenticatedUserId: id,
    });
  }

  /**
   * Component will receive props life cycle method
   *
   * @param {any} nextProps - The next properties
   *
   * @returns {any} Navigate to homepage
   *
   * @memberof UserRecipes
   */
  componentWillReceiveProps(nextProps) {
    console.log('the next props', nextProps);
    const { user: { errorFetchingProfile }, history, location } = nextProps;

    if (!isEmpty(errorFetchingProfile)) {
      if (errorFetchingProfile.message.includes('jwt') ||
      errorFetchingProfile.message.includes('invalid')) {
        history.push({
          pathname: '/',
          state: {
            message: 'Unauthenticated user',
            from: {
              pathname: location.pathname,
            },
          },
        });
      }
    }
    if (nextProps.location.pathname !== this.props.location.pathname) {
      const {
        fetchUserProfile, fetchUserRecipes, fetchUserFavorites
      } = this.props;
      fetchUserProfile(nextProps.match.params.userId);
      fetchUserRecipes(nextProps.match.params.userId);
      fetchUserFavorites(nextProps.match.params.userId);
    }
  }

  /**
   * Opens the edit recipe modal
   *
   * @param {number} recipe - The recipe to be edited
   *
   * @returns {object} Set open state to true
   *
   * @memberof UserRecipes
   */
  handleOpenEdit(recipe) {
    this.setState({
      recipeToEdit: recipe,
      openEdit: true,
    });
  }

  /**
   * Opens the delete recipe modal
   *
   * @param {number} recipeId - Id of recipe
   * @param {string} deleteMessage - Confirmation message
   * @param {string} actionTitle - Title of action to perform
   * @param {string} action - Action to perform
   *
   * @returns {object} Set openDelete state to true
   *
   * @memberof UserRecipes
   */
  handleOpenDelete(recipeId, deleteMessage, actionTitle, action) {
    this.setState({
      recipeId,
      deleteMessage,
      actionTitle,
      action,
      openDelete: true
    });
  }

  /**
   * Opens the add recipe modal
   *
   * @returns {object} Set openAdd state to true
   *
   * @memberof UserRecipes
   */
  handleOpenAdd() {
    this.setState({ openAdd: true });
  }

  /**
   * Closes the modal
   *
   * @returns {object} Set open state to false
   *
   * @memberof UserRecipes
   */
  handleClose() {
    this.setState({
      openEdit: false,
      openDelete: false,
      openAdd: false,
      category: 'Select Category',
      imagePreview: '',
    });
  }

  /**
   * Function to handle image preview
   *
   * @param {any} imagePreview - The image to be displaced
   *
   * @returns {object} Set the state property imagePreview
   *
   * @memberof UserRecipes
   */
  handleImagePreview(imagePreview) {
    this.setState({
      imagePreview,
    });
  }

  /**
   * Function to handle input value change
   * when user edits a recipe
   *
   * @param {any} event - The input event
   *
   * @returns {func} Sets the state of the input
   *
   * @memberof UserRecipes
   */
  handleEditChange(event) {
    const { recipeToEdit } = this.state;
    const { target: { name } } = event;
    let { target: { value } } = event;

    if (name === 'preparationTime') {
      value = parseInt(value, 10);
    }
    this.setState({
      recipeToEdit: {
        ...recipeToEdit,
        [name]: value,
      }
    });
  }

  /**
   * Function to handle input value change
   * when user enters values
   *
   * @param {any} event - The input event
   *
   * @returns {func} Sets the state of the input
   *
   * @memberof UserRecipes
   */
  handleChange(event) {
    const { target: { name, value } } = event;
    this.setState({
      [name]: value,
    });
  }

  /**
   * Function to handle on select input change
   *
   * @param {any} event - The select input event
   *
   * @returns {func} Sets the category input state value
   *
   * @memberof UserRecipes
   */
  handleSelect(event) {
    const { target: { value } } = event;
    this.setState({
      category: value,
    });
  }

  /**
   * Function to handle image upload
   *
   * @param {any} files - The array of image files to be uploaded
   * Only single image upload is enabled
   *
   * @returns {string} The image url hosted on cloudinary
   *
   * @memberof UserRecipes
   */
  handleDrop = (files) => {
    const { preview } = files[0];
    const formData = new FormData();
    formData.append('file', files[0]);
    formData.append('upload_preset', config.UPLOAD_PRESET);
    formData.append('api_key', config.API_KEY);

    this.handleImagePreview(preview);
    this.setState({
      imageData: formData,
    });
  }

  /**
   * Function to edit user recipe
   *
   * @param {any} event - The edit event
   *
   * @returns {func} Dispatch action to edit recipe
   *
   * @memberof UserRecipes
   */
  handleEditRecipe(event) {
    event.preventDefault();
    const { recipeToEdit, imageData } = this.state;
    const { editRecipe, uploadImage, userRecipes: {
      imageUploaded } } = this.props;
    const { id } = recipeToEdit;
    if (!imageUploaded && imageData) {
      uploadImage(imageData)
        .then(() => {
          const { userRecipes: { imageUrl, error } } = this.props;
          const values = {
            ...recipeToEdit,
            recipeImage: imageUrl,
          };
          if (isEmpty(error)) {
            editRecipe(id, values)
              .then(() => {
                const { userRecipes } = this.props;

                if (isEmpty(userRecipes.error)) {
                  this.handleClose();
                  notify('success', 'Recipe edited successfully');
                } else {
                  notify('error', 'Edit recipe unsuccessful');
                }
              });
          } else {
            notify('error', 'Image upload unsuccessful');
          }
        });
    } else {
      const values = recipeToEdit;
      editRecipe(id, values)
        .then(() => {
          const { userRecipes } = this.props;

          if (isEmpty(userRecipes.error)) {
            this.handleClose();
            notify('success', 'Recipe edited successfully');
          } else {
            notify('error', 'Edit recipe unsuccessful');
          }
        });
    }
  }

  /**
   * Function to delete a recipe
   *
   * @param {any} id - The id of recipe
   * @param {string} actionTitle - Title of action to perform
   *
   * @returns {func} Dispatch action to delete recipe
   *
   * @memberof UserRecipes
   */
  handleDeleteRecipe(id, actionTitle) {
    const { deleteRecipe, setFavorite } = this.props;
    if (actionTitle === 'Delete Recipe') {
      deleteRecipe(id)
        .then(() => {
          const { userRecipes } = this.props;

          if (isEmpty(userRecipes.error)) {
            this.handleClose();
            notify('success', 'Recipe deleted successfully');
          } else {
            notify('error', 'Delete recipe unsuccessful');
          }
        });
    } else if (actionTitle === 'Remove Recipe') {
      setFavorite(id)
        .then(() => {
          const { userRecipes } = this.props;

          if (isEmpty(userRecipes.error)) {
            this.handleClose();
            notify('success', 'Recipe removed successfully');
          } else {
            notify('error', 'Remove recipe unsuccessful');
          }
        });
    }
  }

  /**
   * Function to handle submitting new recipe input values
   *
   * @param {any} event - The submit event
   *
   * @returns {func} Submit the values to the server
   *
   * @memberof UserRecipes
   */
  handleAddRecipe(event) {
    event.preventDefault();
    const { imageData } = this.state;
    const { uploadImage, addRecipe, userRecipes: {
      imageUploaded } } = this.props;

    let values = {
      title: this.state.title,
      category: this.state.category === 'Select Category' ?
        undefined : this.state.category,
      description: this.state.description,
      preparationTime: this.state.preparationTime,
      ingredients: this.state.ingredients,
      directions: this.state.directions,
    };

    if (!imageUploaded) {
      if (imageData !== null) {
        uploadImage(imageData)
          .then(() => {
            const { userRecipes: { imageUrl, error } } = this.props;
            values = {
              ...values,
              recipeImage: imageUrl,
            };
            if (isEmpty(error)) {
              addRecipe(values)
                .then(() => {
                  const { userRecipes } = this.props;

                  if (isEmpty(userRecipes.error)) {
                    this.handleClose();
                    notify('success', 'Recipe created successfully');
                  } else {
                    notify('error', 'Create recipe unsuccessful');
                  }
                });
            } else {
              notify('error', 'Image upload unsuccessful');
            }
          });
      } else {
        values = {
          ...values,
          recipeImage: recipeAvatar,
        };
        addRecipe(values)
          .then(() => {
            const { userRecipes } = this.props;

            if (isEmpty(userRecipes.error)) {
              this.handleClose();
              notify('success', 'Recipe created successfully');
            } else {
              notify('error', 'Create recipe unsuccessful');
            }
          });
      }
    } else {
      const { userRecipes: { imageUrl } } = this.props;
      values = {
        ...values,
        recipeImage: imageUrl,
      };
      addRecipe(values)
        .then(() => {
          const { userRecipes } = this.props;

          if (isEmpty(userRecipes.error)) {
            this.handleClose();
            notify('success', 'Recipe created successfully');
          } else {
            notify('error', 'Create recipe unsuccessful');
          }
        });
    }
  }

  /**
   * Logout user from the application
   *
   * @returns {any} Logout user
   *
   * @memberof UserRecipes
   */
  handleLogoutUser = () => {
    const { logoutUser, history } = this.props;
    logoutUser()
      .then(() => {
        history.push('/');
      });
  }

  /**
   * Search recipes by category
   *
   * @param {object} event - The event performed
   *
   * @return {any} Submit the search
   *
   * @memberof UserRecipes
   */
  handleSearchCategory = (event) => {
    const { target: { name } } = event;
    this.props.history.push({
      pathname: '/catalog',
      search: `?search=category&list=${name}`,
    });
  }

  /**
   * Render method
   *
   * @returns {object} React element
   *
   * @memberof UserRecipes
   */
  render() {
    return (
      <div className="page-body">
        <header id="header" >
          <Header
            handleLogoutUser={this.handleLogoutUser}
            currentProfileUserId={this.state.currentProfileUserId}
            authenticatedUserId={this.state.authenticatedUserId}
            handleSearchCategory={this.handleSearchCategory}
            {...this.props}
          />
        </header>
        <main id="main" >
          <Main
            handleChange={this.handleChange}
            handleOpenAdd={this.handleOpenAdd}
            handleOpenEdit={this.handleOpenEdit}
            handleOpenDelete={this.handleOpenDelete}
            handleEditChange={this.handleEditChange}
            handleSelect={this.handleSelect}
            handleClose={this.handleClose}
            handleEditRecipe={this.handleEditRecipe}
            handleDeleteRecipe={this.handleDeleteRecipe}
            handleAddRecipe={this.handleAddRecipe}
            handleDrop={this.handleDrop}
            handleImagePreview={this.handleImagePreview}
            {...this.state}
            {...this.props}
          />
          <ToastContainer />
        </main>
      </div>
    );
  }
}

UserRecipes.propTypes = propTypes;

/**
 * Function to map values from state to props
 *
 * @param {any} state - The state values
 *
 * @returns {object} - The mapped props
 */
const mapStateToProps = state => ({
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

export default connect(mapStateToProps, mapDispatchToProps)(UserRecipes);
