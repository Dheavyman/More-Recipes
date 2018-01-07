import React from 'react';
import PropTypes from 'prop-types';

import UserFavoriteCard from './UserFavoriteCard';

/**
 * Class representing user favorite recipes
 *
 * @class UserFavorites
 * @extends {React.Component}
 */
class UserFavorites extends React.Component {
  /**
   * Component did mount lifecycle method
   *
   * @returns {any} Fetches user favorite recipes
   * @memberof UserFavorites
   */
  componentDidMount() {
    const { fetchUserFavorites, userId } = this.props;

    fetchUserFavorites(userId);
  }

  /**
   * Render method
   *
   * @returns {object} React element
   * @memberof UserFavorites
   */
  render() {
    const { userRecipes: { user } } = this.props,
      { userFavorites } = user;

    return (
      <div className="row">
        {userFavorites && userFavorites.map(recipe => (
          <UserFavoriteCard
            key={recipe.Recipe.id}
            recipe={recipe.Recipe}
            {...this.props}
          />
        ))}
      </div>
    );
  }
}

UserFavorites.propTypes = {
  fetchUserFavorites: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
  userRecipes: PropTypes.shape({
    user: PropTypes.shape({
      userFavorites: PropTypes.arrayOf(PropTypes.shape())
    })
  }).isRequired,
};

export default UserFavorites;
