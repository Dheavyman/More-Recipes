import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const customContentStyle = {
  width: '35%',
  maxWidth: '35%',
};

const AddRecipe = (props) => {
  const actions = [
    <FlatButton
      label="Cancel"
      secondary
      onClick={props.handleClose}
    />
  ];

  return (
    <div>
      <Dialog
        title="Add Recipe"
        actions={actions}
        modal
        contentStyle={customContentStyle}
        open={props.open}
        autoScrollBodyContent
      >
        <div id="add-recipe" className="row center-align">
          <form className="col s12">
            <div className="modal-content">
              <div className="row">
                <div className="input-field col s12">
                  <input
                    id="recipe_name"
                    type="text"
                    className="validate"
                    required
                  />
                  <label htmlFor="recipe_name">Title</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <textarea
                    id="recipe_description"
                    className="materialize-textarea"
                    required
                  />
                  <label htmlFor="recipe_description">Description</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input id="recipe_prep_time" type="number" min="0" required />
                  <label htmlFor="recipe_prep_time">
                    Preparation Time (MINS)
                  </label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <textarea
                    id="recipe_ingredients"
                    className="materialize-textarea"
                    required
                  />
                  <label htmlFor="recipe_ingredients">Ingredients</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <textarea
                    id="recipe_directions"
                    className="materialize-textarea"
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
                    className="file-path validate"
                    type="text"
                    placeholder="Upload photo"
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer row">
              <div className="row" />
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
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default AddRecipe;
