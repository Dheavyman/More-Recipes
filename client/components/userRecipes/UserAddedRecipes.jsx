import React from 'react';
import PropTypes from 'prop-types';

import UserRecipeCard from './UserRecipeCard';

/**
 * Class representing user added recipes
 *
 * @class UserAddedRecipes
 * @extends {React.Component}
 */
class UserAddedRecipes extends React.Component {
  /**
   * Component did mount lifecyle method
   *
   * @returns {any} Fetches user added recipes
   * @memberof UserAddedRecipes
   */
  componentDidMount() {
    const { fetchUserRecipes, userId } = this.props;

    fetchUserRecipes(userId);
  }

  /**
   * Render method
   *
   * @returns {object} React element
   * @memberof UserAddedRecipes
   */
  render() {
    const { userRecipes: { userAddedRecipes } } = this.props;

    return (
      <div className="row">
        {userAddedRecipes && userAddedRecipes.map(recipe => (
          <UserRecipeCard key={recipe.id} recipe={recipe} {...this.props} />
        ))}
      </div>
    );
  }
}

UserAddedRecipes.propTypes = {
  fetchUserRecipes: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
  userRecipes: PropTypes.shape({
    userAddedRecipes: PropTypes.arrayOf(PropTypes.shape()),
  }).isRequired,
};

export default UserAddedRecipes;
