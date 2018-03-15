import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

import RecipeImage from '../common/RecipeImage';

const propTypes = {
  handleOpenDelete: PropTypes.func.isRequired,
  recipe: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    recipeImage: PropTypes.string,
    views: PropTypes.number,
    upvotes: PropTypes.number,
    downvotes: PropTypes.number,
    favorites: PropTypes.number,
  }).isRequired,
  owner: PropTypes.shape({
    fullName: PropTypes.string,
  }).isRequired,
  currentProfileUserId: PropTypes.number.isRequired,
  authenticatedUserId: PropTypes.number,
};

const defaultProps = {
  authenticatedUserId: null,
};

/**
 * User favorite card component
 *
 * @param {object} props - The properties passed to the component
 *
 * @returns {object} React element
 */
const UserFavoriteCard = (props) => {
  const {
    handleOpenDelete, recipe, owner: { fullName }, currentProfileUserId,
    authenticatedUserId
  } = props;
  const { id, title, description, recipeImage, views, upvotes, downvotes,
    favorites } = recipe;
  const message = 'Are you sure you want to remove recipe from your favorites?';
  const actionTitle = 'Remove Recipe';
  const action = 'Remove';

  return (
    <div className="col s12 m6 l3">
      <div id="recipes" className="card large hoverable">
        <a href="recipe.html">
          <span className="card-title">{title}</span>
        </a>
        <div className="card-image">
          <Link to={`/recipes/${id}`}>
            <RecipeImage title={title} recipeImage={recipeImage} />
          </Link>
        </div>
        <div className="card-content">
          <p>{description}</p>
        </div>
        <div className="card-action">
          <p>
            <label htmlFor="owner">Recipe by: </label>
            {fullName}
          </p>
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
              id="remove-favorite"
              role="button"
              tabIndex="0"
              onClick={() => handleOpenDelete(id, message, actionTitle, action)}
              data-tip="Remove"
            >
              <i className="material-icons icon-red right">remove_circle</i>
            </a>
          }
          <ReactTooltip />
        </div>
      </div>
    </div>
  );
};

UserFavoriteCard.propTypes = propTypes;
UserFavoriteCard.defaultProps = defaultProps;

export default UserFavoriteCard;
