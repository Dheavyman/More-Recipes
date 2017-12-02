import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { Field, reduxForm } from 'redux-form';
import isEmpty from 'lodash/isEmpty';

import { required, isEmptyField } from '../../utils/validate';
import ErrorMessage from '../common/ErrorMessage';

const customContentStyle = {
  width: '35%',
  maxWidth: '35%',
};

/**
 * Function to render each of the input fields
 *
 * @param {object} Field - The input field
 * @param {object} Field.input - The input field element
 * @param {string} Field.label - The input field label
 * @param {string} Field.type - The input field type
 * @param {object} Field.meta
 * @param {boolean} Field.meta.touched - The field input state
 * @param {string} Field.meta.error - Validation error message
 * @returns {object} Input element
 */
const renderField = ({
  input,
  label,
  type,
  meta: { touched, error }
}) => (
  <div>
    <label htmlFor={label}>{label}</label>
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

/**
 * Signin react component
 *
 * @param {any} props The props passed to component
 * @returns {object} React element
 */
const Signin = (props) => {
  const { user: { error } } = props,
    { message } = error;

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
          <form
            className="col s12"
            onSubmit={props.handleSubmit(props.onSubmit)}
          >
            <div className="row">
              <div className="input-field col s12">
                <Field
                  name="username"
                  label="Username"
                  component={renderField}
                  type="text"
                  validate={[required, isEmptyField]}
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
                  validate={required}
                />
              </div>
            </div>
            {!isEmpty(error) && <ErrorMessage message={message} /> }
            <div className="row" />
            <div className="row center-align">
              <button
                type="submit"
                className={`btn btn-large waves-effect waves-light
                  indigo accent-2`}
                disabled={props.submitting}
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </Dialog>
    </div>
  );
};

// Signin props validation
Signin.propTypes = {
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

// renderfield props validation
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
  form: 'Signin'
})(Signin);
