import React from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import isEmpty from 'lodash/isEmpty';

import UserAddedRecipes from './UserAddedRecipes';
import UserFavoriteCard from './UserFavoriteCard';
import EditRecipe from './EditRecipe';
import DeleteRecipe from './DeleteRecipe';
import AddRecipe from './AddRecipe';

/**
 * Class representing the main component
 *
 * @class Main
 * @extends {React.Component}
 */
class Main extends React.Component {
  /**
   * Creates an instance of UserRecipes.
   *
   * @memberof Main
   */
  constructor() {
    super();
    this.state = {
      openEdit: false,
      openDelete: false,
      openAdd: false,
      imagePreview: '',
      title: '',
      category: 'Select Category',
      description: '',
      preparationTime: null,
      ingredients: '',
      directions: '',
      imageData: null,
    };
    this.handleOpenEdit = this.handleOpenEdit.bind(this);
    this.handleOpenDelete = this.handleOpenDelete.bind(this);
    this.handleOpenAdd = this.handleOpenAdd.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleImagePreview = this.handleImagePreview.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * Opens the edit recipe modal
   *
   * @returns {object} Set open state to true
   * @memberof Main
   */
  handleOpenEdit() {
    this.setState({ openEdit: true });
  }

  /**
   * Opens the delete recipe modal
   *
   * @returns {object} Set openDelete state to true
   * @memberof Main
   */
  handleOpenDelete() {
    this.setState({ openDelete: true });
  }

  /**
   * Opens the add recipe modal
   *
   * @returns {object} Set openAdd state to true
   * @memberof Main
   */
  handleOpenAdd() {
    this.setState({ openAdd: true });
  }

  /**
   * Closes the modal
   *
   * @returns {object} Set open state to false
   * @memberof Main
   */
  handleClose() {
    this.setState({
      openEdit: false,
      openDelete: false,
      openAdd: false,
      imagePreview: '',
    });
  }

  /**
   * Funtion to handle image preview
   *
   * @param {any} imagePreview - The image to be displaced
   * @returns {objec} Set the state property imagePreview
   * @memberof Main
   */
  handleImagePreview(imagePreview) {
    this.setState({
      imagePreview,
    });
  }

  /**
   * Function to handle input value change
   * when user enters values
   *
   * @param {any} event - The input event
   * @returns {func} Sets the state of the input
   * @memberof Main
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
   * @returns {func} Sets the category input state value
   * @memberof Main
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
   * @returns {string} The image url hosted on cloudinary
   * @memberof AddRecipe
   */
  handleDrop = (files) => {
    const { preview } = files[0],
      formData = new FormData();
    formData.append('file', files[0]);
    formData.append('upload_preset', 'o62xeo3k');
    formData.append('api_key', '281293666534996');

    this.handleImagePreview(preview);
    this.setState({
      imageData: formData,
    });
  }

  /**
   * Function to handle submiting new recipe input values
   *
   * @param {any} event - The submit event
   * @returns {func} Submit the values to the server
   * @memberof AddRecipe
   */
  handleSubmit(event) {
    const { imageData } = this.state,
      { uploadImage, addRecipe, recipeActions: {
        imageUploaded, imageUrl } } = this.props,

      values = {
        title: this.state.title,
        category: this.state.category === 'Select Category' ?
          undefined : this.state.category,
        description: this.state.description,
        preparationTime: this.state.preparationTime,
        ingredients: this.state.ingredients,
        directions: this.state.directions,
        recipeImage: imageUrl,
      };

    event.preventDefault();
    if (!imageUploaded) {
      uploadImage(imageData)
        .then((error) => {
          if (isEmpty(error)) {
            addRecipe(values, this.handleClose);
          }
        });
    } else {
      addRecipe(values, this.handleClose);
    }
  }

  /**
   * Render method
   *
   * @returns {object} React element
   * @memberof Main
   */
  render() {
    const { category, imagePreview } = this.state;
    return (
      <div className="row">
        <div className="fixed-action-btn">
          <a
            role="button"
            tabIndex="0"
            onClick={this.handleOpenAdd}
            className={`btn-floating btn-large modal-trigger waves-effect
              waves-light indigo accent-2 pulse`}
          >
            <i className="material-icons">add</i>
          </a>
        </div>
        <div className="my-recipes">
          <div id="user-recipes">
            <UserAddedRecipes
              handleOpenEdit={this.handleOpenEdit}
              handleOpenDelete={this.handleOpenDelete}
              {...this.props}
            />
          </div>
          <div id="user-favorites" className="col s12">
            <UserFavoriteCard />
          </div>
        </div>
        <MuiThemeProvider>
          <EditRecipe
            open={this.state.openEdit}
            handleClose={this.handleClose}
          />
        </MuiThemeProvider>
        <MuiThemeProvider>
          <DeleteRecipe
            open={this.state.openDelete}
            handleClose={this.handleClose}
          />
        </MuiThemeProvider>
        <MuiThemeProvider>
          <AddRecipe
            open={this.state.openAdd}
            handleChange={this.handleChange}
            handleSelect={this.handleSelect}
            handleClose={this.handleClose}
            handleSubmit={this.handleSubmit}
            handleDrop={this.handleDrop}
            imagePreview={imagePreview}
            handleImagePreview={this.handleImagePreview}
            category={category}
            {...this.props}
          />
        </MuiThemeProvider>
      </div>
    );
  }
}

Main.propTypes = {
  addRecipe: PropTypes.func.isRequired,
  reloadPage: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  recipeActions: PropTypes.shape({
    imageUploading: PropTypes.bool.isRequired,
    imageUrl: PropTypes.string
  }).isRequired,
};

export default Main;
