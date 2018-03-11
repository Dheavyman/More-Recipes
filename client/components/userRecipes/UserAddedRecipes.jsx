import React from 'react';
import PropTypes from 'prop-types';

import UserRecipeCard from './UserRecipeCard';
import Spinner from '../common/Spinner';

const propTypes = {
  fetchUserRecipes: PropTypes.func.isRequired,
  currentProfileUserId: PropTypes.number.isRequired,
  userRecipes: PropTypes.shape({
    isFetchingUserRecipes: PropTypes.bool,
    userAddedRecipes: PropTypes.arrayOf(PropTypes.shape()),
  }).isRequired,
};

/**
 * Class representing user added recipes
 *
 * @class UserAddedRecipes
 *
 * @extends {React.Component}
 */
class UserAddedRecipes extends React.Component {
  /**
   * Component did mount life cycle method
   *
   * @returns {any} Fetches user added recipes
   *
   * @memberof UserAddedRecipes
   */
  componentDidMount() {
    const { fetchUserRecipes, currentProfileUserId } = this.props;

    fetchUserRecipes(currentProfileUserId);
  }

  /**
   * Render user recipes
   *
   * @param {object} props - Properties passed to the function
   *
   * @returns {object} React element
   *
   * @memberof UserAddedRecipes
   */
  renderUserRecipes = (props) => {
    const { userRecipes: { userAddedRecipes } } = props;

    return (
      <div>
        {userAddedRecipes &&
          userAddedRecipes.length === 0
          ? <div className="center-align" >
            <h5>You have not added any recipe</h5>
            <i className="material-icons large">folder_open</i>
          </div>
          : userAddedRecipes.map(recipe => (
            <UserRecipeCard key={recipe.id} recipe={recipe} {...this.props} />
          ))
        }
      </div>
    );
  }

  /**
   * Render method
   *
   * @returns {object} React element
   *
   * @memberof UserAddedRecipes
   */
  render() {
    const { userRecipes: { isFetchingUserRecipes } } = this.props;

    return (
      <div className="row">
        {isFetchingUserRecipes
          ? <div className="center-align">
            <Spinner size="big" />
          </div>
          : this.renderUserRecipes(this.props)
        }
      </div>
    );
  }
}

UserAddedRecipes.propTypes = propTypes;

export default UserAddedRecipes;
