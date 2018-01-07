import React from 'react';
import PropTypes from 'prop-types';

const ProfileDetails = (props) => {
  const { user: { userProfile }, handleStartEdit } = props,
    { username, firstName, lastName, email, phone } = userProfile;

  const handleEdit = () => {
    handleStartEdit(userProfile);
  };

  return (
    <div>
      <div className="row" />
      <div className="col s12">
        <h5><i className="material-icons left">person</i>My Profile</h5>
        <div className="divider black" />
        <br />
        <div id="about_user" className="row">
          <div id="profile_username" className="row">
            <label htmlFor="username" className="col s3 black-text">
              Username:
            </label>
            <div id="username" className="col s9">{username}</div>
          </div>
          <div id="profile_first_name" className="row">
            <label htmlFor="firstname" className="col s3 black-text">
              First Name:
            </label>
            <div id="firstname" className="col s9">{firstName}</div>
          </div>
          <div id="profile_last_name" className="row">
            <label htmlFor="lastname" className="col s3 black-text">
              Last Name:
            </label>
            <div id="lastname" className="col s9">{lastName}</div>
          </div>
          <div id="profile_email" className="row">
            <label htmlFor="email" className="col s3 black-text">
              Email:
            </label>
            <div id="email" className="col s9">{email}</div>
          </div>
          <div id="profile_phone" className="row">
            <label htmlFor="phone" className="col s3 black-text">
              Phone Number:
            </label>
            <div id="phone" className="col s9">{phone}</div>
          </div>
        </div>
      </div>
      <div className="col s12">
        <h5>About Me</h5>
        <div className="divider black" />
        <p
          id="about-me"
        >
          I am an aspiring world className developer.
          I like to learn and play with code.
          I don&#39;t joke with food either:)
        </p>
      </div>
      <button
        id="edit-btn"
        className={'btn-floating waves-effect waves-light green right'}
        onClick={handleEdit}
      >
        <i className="material-icons left">edit</i>
      </button>
      <div className="row" />
    </div>
  );
};

ProfileDetails.propTypes = {
  user: PropTypes.shape({
    userProfile: PropTypes.shape({
      username: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      email: PropTypes.string,
      phone: PropTypes.string,
    })
  }).isRequired,
  handleStartEdit: PropTypes.func.isRequired,
};

export default ProfileDetails;
