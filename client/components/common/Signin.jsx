import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { Field, reduxForm } from 'redux-form';
import isEmpty from 'lodash/isEmpty';

import { required, isEmptyField } from '../../utils/validate';
import ErrorMessage from '../common/ErrorMessage';
import RenderField from '../common/RenderField';
import Spinner from '../common/Spinner';

const propTypes = {
  openSignin: PropTypes.bool.isRequired,
  handleToggleSigninModal: PropTypes.func.isRequired,
  handleToggleModal: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleSubmitSignin: PropTypes.func.isRequired,
  user: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.shape({
      message: PropTypes.string
    })
  }).isRequired,
};

/**
 * Signin component
 *
 * @param {any} props The props passed to component
 *
 * @returns {object} React element
 */
const Signin = (props) => {
  const {
    openSignin, handleSubmitSignin, handleToggleSigninModal,
    handleToggleModal, user: { isLoading, error }
  } = props;
  const { message } = error;

  const actions = [
    <FlatButton
      label="Cancel"
      secondary
      onClick={handleToggleSigninModal}
    />
  ];

  return (
    <div>
      <Dialog
        title="Login into your account"
        actions={actions}
        modal
        open={openSignin}
        autoScrollBodyContent
      >
        <div className="row">
          <form
            className="col s12"
            onSubmit={props.handleSubmit(handleSubmitSignin)}
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
            {!isEmpty(error) && <ErrorMessage message={message} />}
            <div className="row" />
            <div className="center-align">
              {isLoading && <Spinner size="small" />}
            </div>
            <div className="row center-align">
              <button
                type="submit"
                className={`btn btn-large waves-effect waves-light
                  indigo accent-2`}
                disabled={isLoading}
              >
                Sign In
              </button>
            </div>
            <div className="row center-align">
              Don&#39;t have an account? <a
                role="button"
                tabIndex="0"
                className="cursor-pointer blue-text"
                onClick={handleToggleModal}
              >
                Register
              </a>
            </div>
          </form>
        </div>
      </Dialog>
    </div>
  );
};

Signin.propTypes = propTypes;

export default reduxForm({
  form: 'Signin'
})(Signin);
