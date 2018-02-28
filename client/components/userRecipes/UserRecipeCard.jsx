import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

import RecipeImage from '../common/RecipeImage';

const propTypes = {
  recipe: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    recipeImage: PropTypes.string,
    views: PropTypes.number,
    upvotes: PropTypes.number,
    downvotes: PropTypes.number,
    favorites: PropTypes.number,
  }).isRequired,
  handleOpenEdit: PropTypes.func.isRequired,
  handleOpenDelete: PropTypes.func.isRequired,
};

const UserRecipeCard = (props) => {
  const { recipe, handleOpenEdit, handleOpenDelete } = props;
  const { id, title, description, recipeImage, views, upvotes, downvotes,
    favorites } = recipe;

  const openEditModal = () => {
    handleOpenEdit(recipe);
  };

  const openDeleteModal = () => {
    handleOpenDelete(id);
  };

  return (
    <div className="col s12 m6 l3">
      <div id="recipes" className="card large">
        <Link to={`/recipes/${id}`}>
          <span className="card-title">{title}</span>
        </Link>
        <div className="card-image">
          <Link to={`/recipes/${id}`}>
            <RecipeImage title={title} recipeImage={recipeImage} />
          </Link>
        </div>
        <div className="card-content">
          <p>{description}</p>
        </div>
        <div className="card-action">
          <ul className="center-align">
            <li id="views"><i className="material-icons tiny">visibility</i>
              {views}
            </li>
            <li id="favorites"><i className="material-icons tiny">favorite</i>
              {favorites}
            </li>
            <li id="upvotes"><i className="material-icons tiny">thumb_up</i>
              {upvotes}
            </li>
            <li id="downvotes"><i className="material-icons tiny">thumb_down</i>
              {downvotes}
            </li>
          </ul>
          <a
            role="button"
            tabIndex="0"
            onClick={openEditModal}
            className={'btn-floating waves-effect waves-light green right'}
          >
            <i className="material-icons" data-tip="Edit Recipe">edit</i>
          </a>
          <a
            role="button"
            tabIndex="0"
            onClick={openDeleteModal}
            className={'btn-floating waves-effect waves-light red right'}
          >
            <i className="material-icons" data-tip="Delete Recipe">delete</i>
          </a>
          <ReactTooltip />
        </div>
      </div>
    </div>
  );
};

UserRecipeCard.propTypes = propTypes;

export default UserRecipeCard;
