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
  currentProfileUserId: PropTypes.number.isRequired,
  authenticatedUserId: PropTypes.number,
};

const defaultProps = {
  authenticatedUserId: null,
};

/**
 * User recipe card component
 *
 * @param {object} props - The properties passed to the component
 *
 * @returns {object} React element
 */
const UserRecipeCard = (props) => {
  const {
    recipe, handleOpenEdit, handleOpenDelete, currentProfileUserId,
    authenticatedUserId
  } = props;
  const { id, title, description, recipeImage, views, upvotes, downvotes,
    favorites } = recipe;
  const message = 'Are you sure you want to delete this recipe?';
  const actionTitle = 'Delete Recipe';
  const action = 'Delete';

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
          {currentProfileUserId === authenticatedUserId &&
            <a
              role="button"
              tabIndex="0"
              onClick={() => handleOpenEdit(recipe)}
              className="right"
            >
              <i
                className="material-icons icon-green"
                data-tip="Edit Recipe"
              >
                edit
              </i>
            </a>
          }
          {currentProfileUserId === authenticatedUserId &&
            <a
              role="button"
              tabIndex="0"
              onClick={() => handleOpenDelete(id, message, actionTitle, action)}
              className="right"
            >
              <i
                className="material-icons icon-red"
                data-tip="Delete Recipe"
              >
                delete
              </i>
            </a>
          }
          <ReactTooltip />
        </div>
      </div>
    </div>
  );
};

UserRecipeCard.propTypes = propTypes;
UserRecipeCard.defaultProps = defaultProps;

export default UserRecipeCard;
