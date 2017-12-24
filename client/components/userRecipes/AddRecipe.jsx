import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import isEmpty from 'lodash/isEmpty';
import Dropzone from 'react-dropzone';

import Spinner from '../common/Spinner';
import ErrorMessage from '../common/ErrorMessage';

/**
 * Add recipe component
 *
 * @param {any} props - The props passed
 * @returns { object } React component
 */
const AddRecipe = (props) => {
  const { category, open, handleChange, handleSelect, handleDrop, handleClose,
    handleAddRecipe, imagePreview, userRecipes: { isLoading,
      imageUploading, error } } = props;
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
          <form className="col s12" onSubmit={handleAddRecipe} >
            <div className="row">
              <div className="input-field col s12">
                <input
                  name="title"
                  type="text"
                  className="validate"
                  onChange={handleChange}
                  required
                />
                <label htmlFor="recipe_name">Title</label>
              </div>
            </div>
            <div className="row">
              <select
                className="browser-default"
                value={category}
                onChange={handleSelect}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                    onDrop={handleDrop}
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
                  {(imageUploading || isLoading) && <Spinner />}
                </div>
              </div>
            </div>
            {!isEmpty(error) &&
              <ErrorMessage message={error.message} />}
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
};

AddRecipe.propTypes = {
  category: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSelect: PropTypes.func.isRequired,
  handleAddRecipe: PropTypes.func.isRequired,
  handleDrop: PropTypes.func.isRequired,
  imagePreview: PropTypes.string.isRequired,
  userRecipes: PropTypes.shape({
    imageUploading: PropTypes.bool.isRequired,
    error: PropTypes.shape()
  }).isRequired,
};

export default AddRecipe;
