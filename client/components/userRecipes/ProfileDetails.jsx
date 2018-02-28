import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

const propTypes = {
  user: PropTypes.shape({
    userProfile: PropTypes.shape({
      username: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      email: PropTypes.string,
      aboutMe: PropTypes.string,
    })
  }).isRequired,
  handleStartEdit: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
  authenticatedUserId: PropTypes.number
};

const defaultProps = {
  authenticatedUserId: null,
};

const ProfileDetails = (props) => {
  const { user: { userProfile }, handleStartEdit, userId,
    authenticatedUserId } = props;
  const { username, firstName, lastName, email, aboutMe } = userProfile;
  const editableDetails = {
    firstName,
    lastName,
    aboutMe,
  };

  const handleEdit = () => {
    handleStartEdit(editableDetails);
  };

  return (
    <div>
      <div className="row" />
      <div className="col s12">
        <h5><i className="material-icons left">person</i>
          {userId === authenticatedUserId ? 'My' : firstName} Profile</h5>
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
        </div>
      </div>
      <div className="col s12">
        <h5>About {userId === authenticatedUserId ? 'Me' : firstName}</h5>
        <div className="divider black" />
        <p
          id="about-me"
        >
          {aboutMe}
        </p>
      </div>
      <div>
        {userId === authenticatedUserId
        && <button
          id="edit-btn"
          className={'btn-floating waves-effect waves-light green right'}
          onClick={handleEdit}
        >
          <i className="material-icons left" data-tip="Edit Details">edit</i>
        </button>}
        <ReactTooltip />
      </div>
      <div className="row" />
    </div>
  );
};

ProfileDetails.propTypes = propTypes;

ProfileDetails.defaultProps = defaultProps;

export default ProfileDetails;
