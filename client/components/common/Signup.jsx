import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import isEmpty from 'lodash/isEmpty';

import * as helpers from '../../utils/validate';
import ErrorMessage from '../common/ErrorMessage';
import RenderField from '../common/RenderField';

const { validate } = helpers;

/**
 * Signup react component
 *
 * @param {any} props The props passed to component
 * @returns {object} React element
 */
const Signup = (props) => {
  const { user: { error }, open, handleClose, handleSubmit, onSubmit,
      submitting } = props,
    { message } = error;

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
        title="Create an account"
        actions={actions}
        modal
        open={open}
        autoScrollBodyContent
      >
        <div className="row">
          <form
            className="col s12"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="row">
              <div className="input-field col s12">
                <Field
                  name="firstName"
                  label="First Name"
                  component={RenderField}
                  type="text"
                />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <Field
                  name="lastName"
                  label="Last Name"
                  component={RenderField}
                  type="text"
                />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <Field
                  name="username"
                  label="Username"
                  component={RenderField}
                  type="text"
                />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <Field
                  name="email"
                  label="Email"
                  component={RenderField}
                  type="email"
                />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <Field
                  name="password"
                  label="Password"
                  component={RenderField}
                  type="password"
                />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <Field
                  name="retypePassword"
                  label="Retype-Password"
                  component={RenderField}
                  type="password"
                />
              </div>
            </div>
            {!isEmpty(error) && <ErrorMessage message={message} />}
            <div className="row" />
            <div className="row center-align">
              <button
                type="submit"
                name="signupbtn"
                className={`btn btn-large waves-effect waves-light
                  indigo accent-2`}
                disabled={submitting}
              >
                  Sign Up
              </button>
            </div>
          </form>
        </div>
      </Dialog>
    </div>
  );
};

// Signup props validation
Signup.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    error: PropTypes.shape({
      message: PropTypes.string
    })
  }).isRequired,
};

export default reduxForm({
  form: 'Signup',
  validate,
})(Signup);
