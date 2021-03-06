import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

import TextField from '../common/TextField';
import Spinner from '../common/Spinner';

const propTypes = {
  user: PropTypes.shape({
    isLoading: PropTypes.bool,
    userProfile: PropTypes.shape({
      username: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      email: PropTypes.string,
      aboutMe: PropTypes.string,
    })
  }).isRequired,
  handleProfileChange: PropTypes.func.isRequired,
  handleSubmitProfile: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
};

/**
 * Edit profile form component
 *
 * @param {object} props - The properties passed to the component
 *
 * @returns {object} React element
 */
const EditProfileForm = (props) => {
  const {
    user: { isLoading, userProfile }, handleProfileChange, handleSubmitProfile,
    handleCancel
  } = props;
  const { username, firstName, lastName, email, aboutMe } = userProfile;

  return (
    <div>
      <div className="row" />
      <h5><i className="material-icons left">person</i>My Profile</h5>
      <div className="divider black" />
      <br />
      <div id="about_user" className="row">
        <TextField
          id="Username"
          name="username"
          type="text"
          placeholder="Username"
          defaultValue={username}
          className="validate"
          disabled
          onChange={handleProfileChange}
        />
        <TextField
          id="First Name"
          name="firstName"
          type="text"
          placeholder="First name"
          defaultValue={firstName}
          className="validate"
          required
          onChange={handleProfileChange}
          maxLength="255"
        />
        <TextField
          id="Last Name"
          name="lastName"
          type="text"
          placeholder="Last name"
          defaultValue={lastName}
          className="validate"
          required
          onChange={handleProfileChange}
          maxLength="255"
        />
        <TextField
          id="Email"
          name="email"
          type="email"
          placeholder="Email"
          defaultValue={email}
          disabled
          onChange={handleProfileChange}
        />
      </div>
      <div className="col s12">
        <h5>About Me</h5>
        <div className="divider black" />
        <textarea
          id="aboutMe"
          name="aboutMe"
          placeholder="About me"
          defaultValue={aboutMe}
          className="materialize-textarea"
          onChange={handleProfileChange}
        />
      </div>
      <div className="row">
        <div className="center-align">
          {isLoading && <Spinner size="small" />}
        </div>
      </div>
      <div>
        <button
          id="confirm-edit-btn"
          className={`btn-floating waves-effect waves-light indigo accent-2
            right`}
          onClick={handleSubmitProfile}
          disabled={isLoading}
        >
          <i className="material-icons" data-tip="Save Details">save</i>
        </button>
        <button
          id="cancel-edit-btn"
          className={'btn-floating waves-effect waves-light red right'}
          onClick={handleCancel}
          disabled={isLoading}
        >
          <i className="material-icons" data-tip="Cancel">cancel</i>
        </button>
        <ReactTooltip />
      </div>
      <div className="row" />
    </div>
  );
};

EditProfileForm.propTypes = propTypes;

export default EditProfileForm;
