import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import isEmpty from 'lodash/isEmpty';

import * as helpers from '../../utils/validate';
import ErrorMessage from '../common/ErrorMessage';
import RenderField from '../common/RenderField';
import Spinner from '../common/Spinner';

const { validate } = helpers;
const propTypes = {
  openSignup: PropTypes.bool.isRequired,
  handleToggleSignupModal: PropTypes.func.isRequired,
  handleToggleModal: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleSubmitSignup: PropTypes.func.isRequired,
  user: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.shape({
      message: PropTypes.string
    })
  }).isRequired,
};

/**
 * Signup component
 *
 * @param {any} props The props passed to component
 *
 * @returns {object} React element
 */
export const Signup = (props) => {
  const {
    user: { isLoading, error }, openSignup, handleToggleSignupModal,
    handleToggleModal, handleSubmit, handleSubmitSignup
  } = props;
  const { message } = error;

  const actions = [
    <FlatButton
      label="Cancel"
      secondary
      onClick={handleToggleSignupModal}
    />
  ];

  return (
    <div>
      <Dialog
        title="Sign Up"
        actions={actions}
        modal
        open={openSignup}
        autoScrollBodyContent
      >
        <div className="row">
          <form
            className="col s12"
            onSubmit={handleSubmit(handleSubmitSignup)}
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
            <div className="center-align">
              {isLoading && <Spinner size="small" />}
            </div>
            <div className="row center-align">
              <button
                type="submit"
                name="signupbtn"
                className={`btn btn-large waves-effect waves-light
                  indigo accent-2`}
                disabled={isLoading}
              >
                Sign Up
              </button>
            </div>
            <div className="row center-align">
              Already have an account? <a
                role="button"
                tabIndex="0"
                className="cursor-pointer blue-text"
                onClick={handleToggleModal}
              >
                Sign In
              </a>
            </div>
          </form>
        </div>
      </Dialog>
    </div>
  );
};

Signup.propTypes = propTypes;

export default reduxForm({
  form: 'Signup',
  validate,
})(Signup);
