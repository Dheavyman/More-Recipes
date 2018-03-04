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
  const { recipeId, open, handleClose, handleDeleteRecipe,
    deleteMessage, actionTitle, action } = props;

  const actions = [
    <FlatButton
      label="Cancel"
      onClick={handleClose}
    />,
    <FlatButton
      label={action || 'Delete'}
      secondary
      onClick={() => handleDeleteRecipe(recipeId, actionTitle)}
    />,
  ];

  return (
    <div>
      <Dialog
        title={actionTitle}
        actions={actions}
        modal
        open={open}
        autoScrollBodyContent
      >
        <div id="delete-recipe">
          <div className="row">
            <div className="col s2">
              <i className="material-icons icon-red large">warning</i>
            </div>
            <div className="col s10">
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
