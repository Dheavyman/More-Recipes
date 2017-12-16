import React from 'react';
import PropTypes from 'prop-types';

import UserRecipeCard from './UserRecipeCard';

/**
 * Function to display all user added recipes
 *
 * @param {any} props - The props passed to the function
 * @returns { object } React component
 */
const UserAddedRecipes = (props) => {
  const { userRecipes: { userAddedRecipes } } = props;
  return (
    <div className="row">
      {userAddedRecipes && userAddedRecipes.map(recipe => (
        <UserRecipeCard key={recipe.id} recipe={recipe} {...props} />
      ))}
    </div>
  );
};

UserAddedRecipes.propTypes = {
  userRecipes: PropTypes.shape({
    userAddedRecipes: PropTypes.arrayOf(PropTypes.shape()),
  }).isRequired,
};

export default UserAddedRecipes;
