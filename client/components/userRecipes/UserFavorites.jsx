import React from 'react';
import PropTypes from 'prop-types';

import UserFavoriteCard from './UserFavoriteCard';
import Spinner from '../common/Spinner';

const propTypes = {
  fetchUserFavorites: PropTypes.func.isRequired,
  currentProfileUserId: PropTypes.number.isRequired,
  userRecipes: PropTypes.shape({
    isFetchingUserFavorites: PropTypes.bool,
    userFavorites: PropTypes.arrayOf(PropTypes.shape()),
  }).isRequired,
};

/**
 * Class representing user favorite recipes
 *
 * @class UserFavorites
 *
 * @extends {React.Component}
 */
class UserFavorites extends React.Component {
  /**
   * Component did mount lifecycle method
   *
   * @returns {any} Fetches user favorite recipes
   *
   * @memberof UserFavorites
   */
  componentDidMount() {
    const { fetchUserFavorites, currentProfileUserId } = this.props;

    fetchUserFavorites(currentProfileUserId);
  }

  /**
   * Render user favorites
   *
   * @param {object} props - Properties passed to the function
   *
   * @returns {object} React element
   *
   * @memberof UserFavorites
   */
  renderUserFavorites = (props) => {
    const { userRecipes: { userFavorites } } = props;

    return (
      <div>
        {userFavorites &&
          userFavorites.length === 0
          ? <div className="center-align" >
            <h5>You have not favorited any recipe</h5>
            <i className="material-icons large">folder_open</i>
          </div>
          : userFavorites.map(favorite => (
            <UserFavoriteCard
              key={favorite.Recipe.id}
              recipe={favorite.Recipe}
              owner={favorite.Recipe.User}
              {...this.props}
            />
          ))}
      </div>
    );
  }

  /**
   * Render method
   *
   * @returns {object} React element
   *
   * @memberof UserFavorites
   */
  render() {
    const { userRecipes: { isFetchingUserFavorites } } = this.props;

    return (
      <div className="row">
        {isFetchingUserFavorites
          ? <div className="center-align">
            {isFetchingUserFavorites && <Spinner size="big" />}
          </div>
          : this.renderUserFavorites(this.props)
        }
      </div>
    );
  }
}

UserFavorites.propTypes = propTypes;

export default UserFavorites;
