import React from 'react';
import PropTypes from 'prop-types';

import avatar from '../../public/images/avatar.png';
import ProfileDetails from './ProfileDetails';
import EditProfileForm from './EditProfileForm';

/**
 * Class representing user profile section
 *
 * @class UserProfile
 * @extends {React.Component}
 */
class UserProfile extends React.Component {
  /**
   * Creates an instance of UserProfile.
   * @memberof UserProfile
   */
  constructor() {
    super();
    this.state = {
      isEditing: false,
      userDetails: null,
    };
    // this.handleProfileChange = this.handleProfileChange.bind(this);
  }

  /**
   * Component did mount lifecycle method
   *
   * @returns {any} Dispatch action to fetch user profile
   * @memberof UserProfile
   */
  componentDidMount() {
    const { fetchUserProfile, userId } = this.props;
    fetchUserProfile(userId);
  }

  /**
   * Function to switch to edit profile form
   *
   * @param {object} userDetails - The details of the user
   * @returns {any} Set editing to true
   */
  handleStartEdit = (userDetails) => {
    this.setState({
      userDetails,
      isEditing: true,
    });
  }

  /**
   * Function to handle edit profile input fields
   *
   * @param {object} event - Edit profile events
   * @returns {any} Set input value state values
   */
  handleProfileChange = (event) => {
    const { target: { name, value } } = event,
      { userDetails } = this.state;
    this.setState({
      userDetails: {
        ...userDetails,
        [name]: value,
      }
    });
  }

  /**
   * Function to handle canceling of profile edit event
   * @returns {any} Cancels the edit event
   */
  handleCancel = () => {
    this.setState({
      isEditing: false,
    });
  }

  /**
   * Function to handle submiting profile changes
   *
   * @returns {any} Submits the changes made
   * @memberof UserProfile
   */
  handleSubmitProfile = () => {
    console.log('Profile submitted');
    const { userDetails } = this.state,
      { editUserProfile } = this.props;

    editUserProfile(userDetails);
  }

  /**
   * Render function
   *
   * @returns {object} React element
   * @memberof UserProfile
   */
  render() {
    const { isEditing } = this.state,
      { user: { userProfile } } = this.props,
      { fullName, userImage } = userProfile;

    return (
      <div className="row">
        <div className="col s12 m5 l4">
          <figure className="col s12">
            <img
              id="profile-image"
              className="materialboxed responsive-img circle"
              src={userImage || avatar}
              alt={fullName}
            />
          </figure>
        </div>
        <div className="col s12 m5 l6 z-depth-1">
          {isEditing ?
            <EditProfileForm
              handleProfileChange={this.handleProfileChange}
              handleSubmitProfile={this.handleSubmitProfile}
              handleCancel={this.handleCancel}
              {...this.state}
              {...this.props}
            /> :
            <ProfileDetails
              handleStartEdit={this.handleStartEdit}
              {...this.props}
            />
          }
        </div>
      </div>
    );
  }
}

UserProfile.propTypes = {
  fetchUserProfile: PropTypes.func.isRequired,
  editUserProfile: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
  user: PropTypes.shape({
    userProfile: PropTypes.shape({
      fullName: PropTypes.string,
      userImage: PropTypes.string,
    })
  }).isRequired,
};

export default UserProfile;
