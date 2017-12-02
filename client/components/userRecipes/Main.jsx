import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import UserRecipeCard from './UserRecipeCard';
import FavoriteCard from './FavoriteCard';
import EditRecipe from './EditRecipe';
import DeleteRecipe from './DeleteRecipe';
import AddRecipe from './AddRecipe';

/**
 * Class representing the main component
 *
 * @class Main
 * @extends {React.Component}
 */
class Main extends React.Component {
  /**
   * Creates an instance of UserRecipes.
   *
   * @memberof Main
   */
  constructor() {
    super();
    this.state = {
      openEdit: false,
      openDelete: false,
      openAdd: false
    };
    this.handleOpenEdit = this.handleOpenEdit.bind(this);
    this.handleOpenDelete = this.handleOpenDelete.bind(this);
    this.handleOpenAdd = this.handleOpenAdd.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  /**
   * Opens the edit recipe modal
   *
   * @returns {object} Set open state to true
   * @memberof Main
   */
  handleOpenEdit() {
    this.setState({ openEdit: true });
  }

  /**
   * Opens the delete recipe modal
   *
   * @returns {object} Set openDelete state to true
   * @memberof Main
   */
  handleOpenDelete() {
    this.setState({ openDelete: true });
  }

  /**
   * Opens the add recipe modal
   *
   * @returns {object} Set openAdd state to true
   * @memberof Main
   */
  handleOpenAdd() {
    this.setState({ openAdd: true });
  }

  /**
   * Closes the modal
   *
   * @returns {object} Set open state to false
   * @memberof Main
   */
  handleClose() {
    this.setState({
      openEdit: false,
      openDelete: false,
      openAdd: false
    });
  }

  /**
   * Render method
   *
   * @returns {object} React element
   * @memberof Main
   */
  render() {
    return (
      <div className="row">
        <div className="fixed-action-btn">
          <a
            role="button"
            tabIndex="0"
            onClick={this.handleOpenAdd}
            className={`btn-floating btn-large modal-trigger waves-effect
              waves-light indigo accent-2 pulse`}
          >
            <i className="material-icons">add</i>
          </a>
        </div>
        <div className="my-recipes row">
          <div id="user-recipes" className="col s12">
            <div className="col s12 m6 l3">
              <UserRecipeCard
                handleOpenEdit={this.handleOpenEdit}
                handleOpenDelete={this.handleOpenDelete}
              />
            </div>
            <div id="delete-recipe" className="modal">
              <div className="modal-content center-align">
                <p>Are you sure you want to delete this recipe?</p>
              </div>
              <div className="modal-footer">
                <a
                  className="modal-close waves-effect waves-light btn-flat"
                >
                  Cancel
                </a>
                <a
                  className={`modal-action modal-close waves-effect waves-red
                    btn-flat`}
                >
                  Delete
                </a>
              </div>
            </div>
          </div>
          <div id="user-favorites" className="col s12">
            <div className="col s12 m6 l3">
              <FavoriteCard />
            </div>
          </div>
        </div>
        <MuiThemeProvider>
          <EditRecipe
            open={this.state.openEdit}
            handleClose={this.handleClose}
          />
        </MuiThemeProvider>
        <MuiThemeProvider>
          <DeleteRecipe
            open={this.state.openDelete}
            handleClose={this.handleClose}
          />
        </MuiThemeProvider>
        <MuiThemeProvider>
          <AddRecipe
            open={this.state.openAdd}
            handleClose={this.handleClose}
          />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Main;