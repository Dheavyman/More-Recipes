import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const customContentStyle = {
  width: '35%',
  maxWidth: '35%',
};

const DeleteRecipe = (props) => {
  const actions = [
    <FlatButton
      label="Cancel"
      secondary
      onClick={props.handleClose}
    />,
    <FlatButton
      label="Delete"
      onClick={props.handleClose}
    />,
  ];

  return (
    <div>
      <Dialog
        title="Delete Recipe"
        actions={actions}
        modal
        contentStyle={customContentStyle}
        open={props.open}
        autoScrollBodyContent
      >
        <div id="delete-recipe">
          <div className="row center-align">
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
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default DeleteRecipe;
