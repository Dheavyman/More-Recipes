import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import isEmpty from 'lodash/isEmpty';
import Dropzone from 'react-dropzone';

import Spinner from '../common/Spinner';
import ErrorMessage from '../common/ErrorMessage';

/**
 * Class representing Add recipe functionality
 *
 * @class AddRecipe
 * @extends {React.Component}
 */
class AddRecipe extends React.Component {
  /**
   * Creates an instance of AddRecipe.
   *
   * @memberof AddRecipe
   */
  constructor() {
    super();
    this.state = {
      title: '',
      category: 'Select Category',
      description: '',
      preparationTime: null,
      ingredients: '',
      directions: '',
      imageData: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * Function to handle input value change
   * when user enters values
   *
   * @param {any} event - The input event
   * @returns {func} Sets the state of the input
   * @memberof AddRecipe
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
   * @memberof AddRecipe
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
    const { handleImagePreview } = this.props,
      { preview } = files[0],
      formData = new FormData();
    formData.append('file', files[0]);
    formData.append('upload_preset', 'o62xeo3k');
    formData.append('api_key', '281293666534996');

    handleImagePreview(preview);
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
    console.log(this.props);
    const { imageData } = this.state,
      { uploadImage, addRecipe, handleClose, reloadPage,
        recipeActions: { imageUploaded, imageUrl } } = this.props,

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
    console.log('Values', values);

    event.preventDefault();
    if (!imageUploaded) {
      uploadImage(imageData)
        .then((error) => {
          if (isEmpty(error)) {
            addRecipe(values, handleClose);
          }
        });
    } else {
      addRecipe(values, handleClose);
    }
  }

  /**
   * Render function
   *
   * @returns {object} React element
   * @memberof AddRecipe
   */
  render() {
    const { open, handleClose, imagePreview, recipeActions: {
      imageUploading, error } } = this.props;

    const actions = [
      <FlatButton
        label="Cancel"
        secondary
        onClick={handleClose}
      />
    ];

    return (
      <div>
        <Dialog
          title="Add Recipe"
          actions={actions}
          modal
          open={open}
          autoScrollBodyContent
        >
          <div id="add-recipe" className="row">
            <form className="col s12" onSubmit={this.handleSubmit} >
              <div className="row">
                <div className="input-field col s12">
                  <input
                    name="title"
                    type="text"
                    className="validate"
                    onChange={this.handleChange}
                    required
                  />
                  <label htmlFor="recipe_name">Title</label>
                </div>
              </div>
              <div className="row">
                <select
                  className="browser-default"
                  value={this.state.category}
                  onChange={this.handleSelect}
                >
                  <option value="">Select Category</option>
                  <option value="Breakfast">Breakfast</option>
                  <option name="Lunch" value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Appetizer">Appetizer</option>
                  <option value="Main">Main</option>
                  <option value="Dessert">Dessert</option>
                </select>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <textarea
                    name="description"
                    className="materialize-textarea validate"
                    onChange={this.handleChange}
                    required
                  />
                  <label htmlFor="recipe_description">Description</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    name="preparationTime"
                    type="number"
                    className="validate"
                    min="0"
                    onChange={this.handleChange}
                    required
                  />
                  <label htmlFor="recipe_prep_time">
                    Preparation Time (MINS)
                  </label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <textarea
                    name="ingredients"
                    placeholder="Enter ingredients seperated by comma"
                    className="materialize-textarea validate"
                    onChange={this.handleChange}
                    required
                  />
                  <label htmlFor="recipe_ingredients" className="active">
                    Ingredients
                  </label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <textarea
                    name="directions"
                    placeholder="Enter directions seperated by comma"
                    className="materialize-textarea validate"
                    onChange={this.handleChange}
                    required
                  />
                  <label htmlFor="recipe_directions" className="active">
                    Directions
                  </label>
                </div>
              </div>
              <div className="row center-align">
                <div className="col s12">
                  <div className="col s6 offset-s3">
                    <Dropzone
                      className="dropzone"
                      onDrop={this.handleDrop}
                      accept="image/*"
                      multiple={false}
                    >
                      {!imagePreview ?
                        <p className="center-align">
                          Drop your file or click here to upload
                          <i className="material-icons center large">camera</i>
                        </p> :
                        <img src={imagePreview} alt="" />}
                    </Dropzone>
                    <div className="row" />
                    {imageUploading && <Spinner />}
                  </div>
                </div>
              </div>
              {!isEmpty(error) && <ErrorMessage message={error.message} />}
              <div className="row" />
              <div className="row center-align">
                <button
                  type="submit"
                  className={`btn btn-large waves-effect
                    waves-light indigo accent-2`}
                >
                  Add Recipe
                </button>
              </div>
            </form>
          </div>
        </Dialog>
      </div>
    );
  }
}

AddRecipe.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  addRecipe: PropTypes.func.isRequired,
  reloadPage: PropTypes.func.isRequired,
  // userRecipes: PropTypes.shape({
  //   error: PropTypes.shape({
  //     message: PropTypes.string
  //   }).isRequired,
  // }).isRequired,
  uploadImage: PropTypes.func.isRequired,
  recipeActions: PropTypes.shape({
    imageUploading: PropTypes.bool.isRequired,
    imageUrl: PropTypes.string
  }).isRequired,
  imagePreview: PropTypes.string.isRequired,
  handleImagePreview: PropTypes.func.isRequired,
};

export default AddRecipe;
