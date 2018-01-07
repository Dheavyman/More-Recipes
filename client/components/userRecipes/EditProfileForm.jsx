import React from 'react';
import PropTypes from 'prop-types';

import TextField from '../common/TextField';

const EditProfileForm = (props) => {
  const { user: { userProfile }, handleProfileChange, handleSubmitProfile,
      handleCancel } = props,
    { username, firstName, lastName, email, phone } = userProfile;
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
          required
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
        <TextField
          id="Phone Number"
          name="phone"
          type="tel"
          placeholder="Phone number"
          defaultValue={phone}
          onChange={handleProfileChange}
        />
      </div>
      <div className="col s12">
        <h5>About Me</h5>
        <div className="divider black" />
        <textarea
          id="textarea"
          name="aboutMe"
          placeholder="About me"
          defaultValue={'aboutMe'}
          className="materialize-textarea"
          onChange={handleProfileChange}
        />
      </div>
      <button
        id="edit-btn"
        className={`btn-floating waves-effect waves-light indigo accent-2
        right`}
        onClick={handleSubmitProfile}
      >
        <i className="material-icons">save</i>
      </button>
      <button
        id="edit-btn"
        className={'btn-floating waves-effect waves-light red right'}
        onClick={handleCancel}
      >
        <i className="material-icons">cancel</i>
      </button>
      <div className="row" />
    </div>
  );
};

EditProfileForm.propTypes = {
  user: PropTypes.shape({
    userProfile: PropTypes.shape({
      username: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      email: PropTypes.string,
      phone: PropTypes.string,
    })
  }).isRequired,
  handleProfileChange: PropTypes.func.isRequired,
  handleSubmitProfile: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
};

export default EditProfileForm;
