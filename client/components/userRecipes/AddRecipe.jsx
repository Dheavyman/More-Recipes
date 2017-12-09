import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
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
      category: '',
      description: '',
      preparationTime: null,
      ingredients: '',
      directions: '',
    };
    this.handleChange = this.handleChange.bind(this);
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
   * Function to handle submiting new recipe input values
   *
   * @param {any} event - The submit event
   * @returns {func} Submit the values to the server
   * @memberof AddRecipe
   */
  handleSubmit(event) {
    event.preventDefault();
    console.log(this, event);
  }

  /**
   * Render function
   *
   * @returns {object} React element
   * @memberof AddRecipe
   */
  render() {
    const { open, handleClose } = this.props;

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
          <div id="add-recipe" className="row center-align">
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
                    name="ngredients"
                    placeholder="Enter ingredients seperated by comma"
                    className="materialize-textarea validate"
                    onChange={this.handleChange}
                    required
                  />
                  <label htmlFor="recipe_ingredients">Ingredients</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <textarea
                    name="directions"
                    className="materialize-textarea validate"
                    onChange={this.handleChange}
                    required
                  />
                  <label htmlFor="recipe_directions">Directions</label>
                </div>
              </div>
              <div className="file-field input-field">
                <div className="btn indigo accent-2">
                  <span>File</span>
                  <input type="file" />
                </div>
                <div className="file-path-wrapper">
                  <input
                    name="recipeImage"
                    className="file-path validate"
                    type="text"
                    placeholder="Upload photo"
                    onChange={this.handleChange}
                    // required
                  />
                </div>
              </div>
              <div className="row" />
              <button
                type="submit"
                className={`btn btn-large waves-effect
                    waves-light indigo accent-2`}
              >
                Add Recipe
              </button>
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
};

export default AddRecipe;
