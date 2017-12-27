import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { Field, reduxForm } from 'redux-form';
import isEmpty from 'lodash/isEmpty';

import { required, isEmptyField } from '../../utils/validate';
import ErrorMessage from '../common/ErrorMessage';
import RenderField from '../common/RenderField';

/**
 * Signin react component
 *
 * @param {any} props The props passed to component
 * @returns {object} React element
 */
const Signin = (props) => {
  const { open, onSubmit, submitting, user: { error } } = props,
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
        open={open}
        autoScrollBodyContent
      >
        <div className="row">
          <form
            className="col s12"
            onSubmit={props.handleSubmit(onSubmit)}
          >
            <div className="row">
              <div className="input-field col s12">
                <Field
                  name="username"
                  label="Username"
                  component={RenderField}
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
                  component={RenderField}
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
                disabled={submitting}
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

export default reduxForm({
  form: 'Signin'
})(Signin);
