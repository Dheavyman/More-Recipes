import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import ReactTooltip from 'react-tooltip';

import avatar from '../../public/images/avatar.png';
import ProfileDetails from './ProfileDetails';
import EditProfileForm from './EditProfileForm';
import config from '../../config';
import Spinner from '../common/Spinner';

const propTypes = {
  fetchUserProfile: PropTypes.func.isRequired,
  editUserProfile: PropTypes.func.isRequired,
  uploadUserImage: PropTypes.func.isRequired,
  currentProfileUserId: PropTypes.number.isRequired,
  authenticatedUserId: PropTypes.number,
  user: PropTypes.shape({
    isFetchingUserProfile: PropTypes.bool,
    imageUploading: PropTypes.bool.isRequired,
    userProfile: PropTypes.shape({
      fullName: PropTypes.string,
      userImage: PropTypes.string,
    }),
    userImageUrl: PropTypes.string,
  }).isRequired,
};

const defaultProps = {
  authenticatedUserId: null,
};

/**
 * Class representing user profile section
 *
 * @class UserProfile
 *
 * @extends {React.Component}
 */
class UserProfile extends React.Component {
  /**
   * Creates an instance of UserProfile.
   *
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
   * Component did mount life cycle method
   *
   * @returns {any} Dispatch action to fetch user profile
   *
   * @memberof UserProfile
   */
  componentDidMount() {
    window.scrollTo(0, 0);
    $('.materialboxed').materialbox();

    const { fetchUserProfile, currentProfileUserId } = this.props;
    fetchUserProfile(currentProfileUserId);
  }

  /**
   * Component did update life cycle method
   *
   * @returns {any} Initialize materialize class
   * @memberof UserProfile
   */
  componentDidUpdate() {
    $('.materialboxed').materialbox();
  }

  /**
   * Function to switch to edit profile form
   *
   * @param {object} userDetails - The details of the user
   *
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
   *
   * @returns {any} Set input value state values
   */
  handleProfileChange = (event) => {
    const { target: { name, value } } = event;
    const { userDetails } = this.state;
    this.setState({
      userDetails: {
        ...userDetails,
        [name]: value,
      }
    });
  }

  /**
   * Function to handle canceling of profile edit event
   *
   * @returns {any} Cancels the edit event
   */
  handleCancel = () => {
    this.setState({
      isEditing: false,
    });
  }

  /**
   * Function to handle submitting profile changes
   *
   * @returns {any} Submits the changes made
   *
   * @memberof UserProfile
   */
  handleSubmitProfile = () => {
    const { userDetails } = this.state;
    const { editUserProfile } = this.props;

    editUserProfile(userDetails)
      .then(() => {
        const { user: { error } } = this.props;
        if (isEmpty(error)) {
          this.setState({
            isEditing: false,
          });
        }
      });
  }

  /**
   * Function to handle profile picture upload
   *
   * @param {event} event - Picture upload event
   *
   * @returns {any} Uploads picture
   *
   * @memberof UserProfile
   */
  handleUploadPhoto = (event) => {
    event.preventDefault();
    const { target: { files } } = event;
    const file = files[0];
    const { uploadUserImage, editUserProfile } = this.props;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', config.UPLOAD_PRESET);
    formData.append('api_key', config.API_KEY);

    uploadUserImage(formData)
      .then(() => {
        const { user: { userImageUrl, error } } = this.props;
        const imageFile = {
          userImage: userImageUrl,
        };

        if (isEmpty(error)) {
          editUserProfile(imageFile);
        }
      });
  }
  /**
   * Render user profile
   *
   * @returns {object} User profile
   *
   * @memberof UserProfile
   */
  renderUserProfile() {
    const { isEditing } = this.state;
    const {
      user: { imageUploading, userProfile }, currentProfileUserId,
      authenticatedUserId
    } = this.props;
    const { fullName, userImage } = userProfile;
    return (
      <div>
        {isEmpty(userProfile)
          ? <div className="center-align" >
            <h5>User does not exist</h5>
            <i className="material-icons large">folder_open</i>
          </div>
          : <div>
            <div className="user-image col s12 m5 l4">
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
              <span className="uploading-image-spinner">
                <div className="center-align">
                  {imageUploading && <Spinner size="small" />}
                </div>
              </span>
              <div className="row">
                {currentProfileUserId === authenticatedUserId
                  && <div className=" image-upload-button center">
                    <label
                      htmlFor="user-image"
                      className={`btn-floating waves-effect waves-light
                  ${userImage ? 'green' : 'indigo accent-2'}`}
                    >
                      <i className="material-icons small" data-tip="Edit Photo">
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
                  </div>}
              </div>
            </div>
            <div className="col s12 m5 l6 z-depth-1">
              {isEditing && (currentProfileUserId === authenticatedUserId) ?
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
        }
      </div>
    );
  }

  /**
   * Render function
   *
   * @returns {object} React element
   *
   * @memberof UserProfile
   */
  render() {
    const { user: { isFetchingUserProfile } } = this.props;

    return (
      <div className="row">
        {isFetchingUserProfile
          ? <div className="center-align">
            <Spinner size="big" />
          </div>
          : this.renderUserProfile(this.props)
        }
      </div>
    );
  }
}

UserProfile.propTypes = propTypes;

UserProfile.defaultProps = defaultProps;

export default UserProfile;
