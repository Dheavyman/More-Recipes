import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const customContentStyle = {
  width: '35%',
  maxWidth: '35%',
};

const EditRecipe = (props) => {
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
        title="Edit Recipe"
        actions={actions}
        modal
        contentStyle={customContentStyle}
        open={props.open}
        autoScrollBodyContent
      >
        <div id="edit-recipe" className="row">
          <form className="col s12">
            <div className="modal-content">
              <div className="row">
                <div className="input-field col s12">
                  <input id="recipe-name" type="text" className="validate" />
                  <label htmlFor="recipe-name">Title</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    id="recipe-description"
                    className="materialize-textarea"
                  />
                  <label htmlFor="recipe-description">Description</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input id="recipe-prep-time" type="number" min="0" />
                  <label htmlFor="recipe-prep-time">
                    Preparation Time (MINS)
                  </label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <textarea
                    id="recipe-ingredients"
                    className="materialize-textarea"
                  />
                  <label htmlFor="recipe-ingredients">Ingredients</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <textarea
                    id="recipe-directions"
                    className="materialize-textarea"
                  />
                  <label htmlFor="recipe-directions">Directions</label>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="submit"
                className={`col s6 offset-s3 btn btn-large waves-effect
                  waves-light indigo accent-2`}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </Dialog>
    </div>
  );
};

EditRecipe.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default EditRecipe;
