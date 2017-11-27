import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const customContentStyle = {
  width: '35%',
  maxWidth: '35%',
};

const Signin = (props) => {
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
        title="Login into your account"
        actions={actions}
        modal
        contentStyle={customContentStyle}
        open={props.open}
        autoScrollBodyContent
      >
        <div className="row">
          <form className="col s12">
            <div className="modal-content">
              <div className="row">
                <div className="input-field col s12">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    className="validate"
                    required
                  />
                  <label htmlFor="username">Username</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className="validate"
                    required
                  />
                  <label htmlFor="password">Password</label>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <div className="row" />
              <div className="row">
                <button
                  type="submit"
                  name="signinbtn"
                  className={`col s6 offset-s3 btn btn-large waves-effect
                  waves-light indigo accent-2`}
                >
                  Sign In
                </button>
              </div>
            </div>
          </form>
        </div>
      </Dialog>
    </div>
  );
};

Signin.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default Signin;
