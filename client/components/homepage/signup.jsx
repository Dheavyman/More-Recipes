import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import * as helpers from '../../helpers/validate';

const { validate } = helpers;

const customContentStyle = {
  width: '35%',
  maxWidth: '35%',
};

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error }
}) => (
  <div>
    <label htmlFor={type}>{label}</label>
    <br />
    <div>
      <input
        {...input}
        type={type}
        placeholder={label}
      />
      {touched && (error && <span className="red-text">{error}</span>)}
    </div>
  </div>
);

const Signup = (props) => {
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
        <div className="row">
          <form
            className="col s12"
            onSubmit={props.handleSubmit(props.onSubmit)}
          >
            <div className="row">
              <div className="input-field col s12">
                <Field
                  name="firstName"
                  label="First Name"
                  component={renderField}
                  type="text"
                />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <Field
                  name="lastName"
                  label="Last Name"
                  component={renderField}
                  type="text"
                />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <Field
                  name="username"
                  label="Username"
                  component={renderField}
                  type="text"
                />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <Field
                  name="email"
                  label="Email"
                  component={renderField}
                  type="email"
                />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <Field
                  name="password"
                  label="Password"
                  component={renderField}
                  type="password"
                />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <Field
                  name="retypePassword"
                  label="Retype-Password"
                  component={renderField}
                  type="password"
                />
              </div>
            </div>
            <div className="row" />
            <div className="row">
              <button
                type="submit"
                name="signupbtn"
                className={`col s6 offset-s3 btn btn-large waves-effect
                  waves-light indigo accent-2`}
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

Signup.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

renderField.propTypes = {
  input: PropTypes.shape().isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }).isRequired,
};

export default reduxForm({
  form: 'Signup',
  validate,
})(Signup);
