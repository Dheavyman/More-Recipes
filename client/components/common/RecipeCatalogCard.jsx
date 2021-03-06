import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import RecipeImage from '../common/RecipeImage';
import notify from '../../utils/notification';

const propTypes = {
  user: PropTypes.shape({
    isAuthenticated: PropTypes.bool,
  }).isRequired,
  recipe: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    category: PropTypes.string,
    description: PropTypes.string,
    preparationTime: PropTypes.number,
    ingredients: PropTypes.string,
    directions: PropTypes.string,
  }),
};

const defaultProps = {
  recipe: undefined,
};

/**
 * Function to notify user to login
 *
 * @param {object} event - The event performed
 *
 * @returns {any} Toast message
 */
const handleNotify = (event) => {
  event.preventDefault();
  notify('info', 'Please login to view the user profile');
};

/**
 * Recipe catalog card component
 *
 * @param {object} props - The properties passed to the component
 *
 * @returns {object} React element
 */
const RecipeCatalogCard = (props) => {
  const { user: { isAuthenticated }, recipe } = props;
  const { id, title, recipeImage, description, views, upvotes, downvotes,
    favorites, User: { id: userId, fullName } } = recipe;

  return (
    <div className="col s12 m4 l3">
      <div id="recipes" className="card large hoverable">
        <Link to={`recipes/${id}`}>
          <span className="card-title">{title}</span>
        </Link>
        <div className="card-image">
          <Link to={`recipes/${id}`}>
            <RecipeImage title={title} recipeImage={recipeImage} />
          </Link>
        </div>
        <div className="card-content">
          <p>{description}</p>
        </div>
        <div className="card-action">

          <p id="owner">
            <label htmlFor="owner">Recipe by: </label>
            {isAuthenticated
              ? <Link to={`/users/${userId}/dashboard`}>
                <span className="recipe-owner">{fullName}</span>
              </Link>
              : <a
                id="view-user-profile"
                href="#!"
                onClick={handleNotify}
              >
                <span className="recipe-owner">{fullName}</span>
              </a>
            }
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
        </div>
      </div>
    </div>
  );
};

RecipeCatalogCard.propTypes = propTypes;
RecipeCatalogCard.defaultProps = defaultProps;

export default RecipeCatalogCard;
