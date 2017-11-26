import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import Signup from './Signup';

const customContentStyle = {
  width: '35%',
  maxWidth: '35%',
};

const Modal = (props) => {
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
        title="Create an account"
        actions={actions}
        modal
        contentStyle={customContentStyle}
        open={props.open}
        autoScrollBodyContent
      >
        <Signup />
      </Dialog>
    </div>
  );
};

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default Modal;
