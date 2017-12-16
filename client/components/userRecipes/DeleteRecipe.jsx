import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const DeleteRecipe = (props) => {
  console.log(props);
  const { recipeId, open, handleClose, handleDeleteRecipe } = props,
    deleteRecipe = () => {
      handleDeleteRecipe(recipeId);
    };

  const actions = [
    <FlatButton
      label="Cancel"
      secondary
      onClick={handleClose}
    />,
    <FlatButton
      label="Delete"
      onClick={deleteRecipe}
    />,
  ];

  return (
    <div>
      <Dialog
        title="Delete Recipe"
        actions={actions}
        modal
        open={open}
        autoScrollBodyContent
      >
        <div id="delete-recipe">
          <div className="row">
            <div className="col s2">
              <i className="material-icons large">warning</i>
            </div>
            <div className="col s10">
              <p>Are you sure you want to delete this recipe?</p>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

DeleteRecipe.propTypes = {
  recipeId: PropTypes.number.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleDeleteRecipe: PropTypes.func.isRequired,
};

export default DeleteRecipe;
