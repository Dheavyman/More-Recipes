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
  const { userRecipes: { userAddedRecipes } } = props,
    { recipes } = userAddedRecipes;
  return (
    <div className="row">
      {recipes && recipes.map(recipe => (
        <UserRecipeCard key={recipe.id} recipe={recipe} {...props} />
      ))}
    </div>
  );
};

UserAddedRecipes.propTypes = {
  userRecipes: PropTypes.shape({
    userAddedRecipes: PropTypes.shape({
      data: PropTypes.shape({
        recipes: PropTypes.arrayOf(PropTypes.shape()),
      }),
    }),
  }).isRequired,
};

export default UserAddedRecipes;
