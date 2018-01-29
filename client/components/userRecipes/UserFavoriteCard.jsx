import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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
  owner: PropTypes.shape({
    fullName: PropTypes.string,
  }).isRequired,
};

const UserFavoriteCard = (props) => {
  const { recipe, owner: { fullName } } = props;
  const { id, title, description, recipeImage, views, upvotes, downvotes,
    favorites } = recipe;

  return (
    <div className="col s12 m6 l3">
      <div id="recipes" className="card large">
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
          <p id="owner">
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
        </div>
      </div>
    </div>
  );
};

UserFavoriteCard.propTypes = propTypes;

export default UserFavoriteCard;
