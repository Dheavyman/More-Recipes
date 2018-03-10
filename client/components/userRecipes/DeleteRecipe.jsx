import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const propTypes = {
  recipeId: PropTypes.number,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleDeleteRecipe: PropTypes.func.isRequired,
  deleteMessage: PropTypes.string.isRequired,
  actionTitle: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
  userRecipes: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
  }).isRequired,
};

const defaultProps = {
  recipeId: null,
};

/**
 * Delete recipe component
 *
 * @param {object} props - The properties passed to the function
 *
 * @returns {object} React element
 */
const DeleteRecipe = (props) => {
  const {
    recipeId, open, handleClose, handleDeleteRecipe,
    deleteMessage, actionTitle, action, userRecipes
  } = props;
  const { isLoading } = userRecipes;

  const actions = [
    <FlatButton
      label="Cancel"
      onClick={handleClose}
    />,
    <FlatButton
      label={action || 'Delete'}
      secondary
      onClick={() => handleDeleteRecipe(recipeId, actionTitle)}
      disabled={isLoading}
    />,
  ];

  return (
    <div>
      <Dialog
        title={<div className="center-align">
          {actionTitle}
        </div>}
        actions={actions}
        modal
        open={open}
        autoScrollBodyContent
      >
        <div id="delete-recipe">
          <div className="row center-align">
            <div className="col s12 m6 l2">
              <i className="material-icons icon-red large">warning</i>
            </div>
            <div className="col s12 m6 l8">
              <p>{deleteMessage}</p>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

DeleteRecipe.propTypes = propTypes;

DeleteRecipe.defaultProps = defaultProps;

export default DeleteRecipe;
