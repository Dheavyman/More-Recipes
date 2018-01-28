import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import ReactTooltip from 'react-tooltip';

import avatar from '../../public/images/avatar.png';
import ProfileDetails from './ProfileDetails';
import EditProfileForm from './EditProfileForm';
import config from '../../config';

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
  }

  /**
   * Component did mount lifecycle method
   *
   * @returns {any} Dispatch action to fetch user profile
   * @memberof UserProfile
   */
  componentDidMount() {
    // Initialize materialize material box class
    $('.materialboxed').materialbox();
    // Initialize materialize tooltip class
    $('.tooltipped').tooltip({
      delay: 50
    });

    const { fetchUserProfile, userId } = this.props;
    fetchUserProfile(userId);
  }

  /**
   * Component will receive props lifecycle method
   *
   * @param {any} nextProps - The next props
   * @returns {any} Changes state
   * @memberof UserProfile
   */
  componentWillReceiveProps(nextProps) {
    const { user: { error } } = nextProps;
    if (isEmpty(error)) {
      this.setState({
        isEditing: false,
      });
    }
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
    ReactTooltip.hide();
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
    const { userDetails } = this.state,
      { editUserProfile, userId } = this.props;

    editUserProfile(userId, userDetails);
  }

  /**
   * Function to handle profile picture upload
   *
   * @param {event} event - Picture upload event
   * @returns {any} Uploads picture
   * @memberof UserProfile
   */
  handleUploadPhoto = (event) => {
    event.preventDefault();
    const { target: { files } } = event,
      file = files[0],
      { userId, uploadUserImage, editProfilePicture } = this.props,
      formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', config.UPLOAD_PRESET);
    formData.append('api_key', config.API_KEY);

    uploadUserImage(formData)
      .then(() => {
        const { user: { userImageUrl, error } } = this.props,
          imageFile = {
            userImage: userImageUrl,
          };

        if (isEmpty(error)) {
          editProfilePicture(userId, imageFile);
        }
      });
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
          <div className="row">
            <figure className="col s12">
              <img
                id="profile-image"
                className="materialboxed responsive-img circle"
                src={userImage || avatar}
                alt={fullName}
              />
            </figure>
          </div>
          <div className="row">
            <div className=" image-upload-button center">
              <label
                htmlFor="user-image"
                className={`btn-floating waves-effect waves-light
                  ${userImage ? 'green' : 'indigo accent-2'}`}
              >
                <i className="material-icons small" data-tip="Edit photo">
                  camera_alt
                </i>
              </label>
              <input
                id="user-image"
                name="user-image"
                type="file"
                onChange={this.handleUploadPhoto}
              />
              <ReactTooltip />
            </div>
          </div>
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
  editProfilePicture: PropTypes.func.isRequired,
  uploadUserImage: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
  user: PropTypes.shape({
    userProfile: PropTypes.shape({
      fullName: PropTypes.string,
      userImage: PropTypes.string,
    }),
    userImageUrl: PropTypes.string,
  }).isRequired,
};

export default UserProfile;
