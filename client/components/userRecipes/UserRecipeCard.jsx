import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import RecipeImage from '../common/RecipeImage';

const UserRecipeCard = (props) => {
  const { recipe, handleOpenEdit, handleOpenDelete } = props,
    { id, title, description, views, upvotes, downvotes } = recipe;

  const handleOpen = () => {
    handleOpenEdit(recipe);
  };

  return (
    <div className="col s12 m6 l3">
      <div id="recipes" className="card large">
        <Link to={`/recipes/${id}`}>
          <span className="card-title">{title}</span>
        </Link>
        <div className="card-image">
          <Link to={`/recipes/${id}`}>
            <RecipeImage />
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
              20
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
            onClick={handleOpen}
            className={'btn-floating waves-effect waves-light green right'}
          >
            <i className="material-icons">edit</i>
          </a>
          <a
            role="button"
            tabIndex="0"
            onClick={handleOpenDelete}
            className={'btn-floating waves-effect waves-light red right'}
          >
            <i className="material-icons">delete</i>
          </a>
        </div>
      </div>
    </div>
  );
};

UserRecipeCard.propTypes = {
  recipe: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    upvotes: PropTypes.number,
    downvotes: PropTypes.number,
  }).isRequired,
  handleOpenEdit: PropTypes.func.isRequired,
  handleOpenDelete: PropTypes.func.isRequired,
};

export default UserRecipeCard;
