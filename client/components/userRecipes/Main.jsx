import React from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import UserProfile from './UserProfile';
import UserAddedRecipes from './UserAddedRecipes';
import UserFavorites from './UserFavorites';
import EditRecipe from './EditRecipe';
import DeleteRecipe from './DeleteRecipe';
import AddRecipe from './AddRecipe';

/**
 * Function representing main component
 *
 * @param {any} props - The props passed to the component
 * @returns {object} - React components
 */
const Main = (props) => {
  const { openAdd, openEdit, openDelete, handleOpenAdd } = props;

  return (
    <div className="row">
      <div className="fixed-action-btn">
        <button
          onClick={handleOpenAdd}
          className={`btn-floating btn-large modal-trigger waves-effect
              waves-light indigo accent-2 pulse`}
        >
          <i className="material-icons">add</i>
        </button>
      </div>
      <div className="dashboard">
        <div className="" >
          <div id="user-profile" className="col s12" >
            <UserProfile {...props} />
          </div>
          <div id="user-recipes" className="col s12" >
            <UserAddedRecipes {...props} />
          </div>
          <div id="user-favorites" className="col s12">
            <UserFavorites {...props} />
          </div>
        </div>
      </div>
      <MuiThemeProvider>
        <EditRecipe open={openEdit} {...props} />
      </MuiThemeProvider>
      <MuiThemeProvider>
        <DeleteRecipe open={openDelete} {...props} />
      </MuiThemeProvider>
      <MuiThemeProvider>
        <AddRecipe open={openAdd} {...props} />
      </MuiThemeProvider>
    </div>
  );
};

Main.propTypes = {
  openAdd: PropTypes.bool.isRequired,
  openEdit: PropTypes.bool.isRequired,
  openDelete: PropTypes.bool.isRequired,
  handleOpenAdd: PropTypes.func.isRequired,
};

export default Main;
