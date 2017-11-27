import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import common from '../common';

const { RecipeImage } = common;

const RecipeCatalogCard = (props) => {
  const { recipe } = props;
  return (
    <div className="col s12 m6 l4">
      <div id="recipes" className="card large">
        <Link to={`recipes/${recipe.id}`}>
          <span className="card-title">{recipe.title}</span>
        </Link>
        <div className="card-image">
          <Link to={`recipes/${recipe.id}`}>
            <RecipeImage />
          </Link>
        </div>
        <div className="card-content">
          <p>{recipe.description}</p>
        </div>
        <div className="card-action">
          <p id="owner">
            <label htmlFor="owner">Recipe by: </label> John Stew
          </p>
          <ul className="center-align">
            <li id="views"><i className="material-icons tiny">visibility</i>
              {recipe.views}
            </li>
            <li id="favorites"><i className="material-icons tiny">favorite</i>
              20
            </li>
            <li id="upvotes"><i className="material-icons tiny">thumb_up</i>
              {recipe.upvotes}
            </li>
            <li id="downvotes"><i className="material-icons tiny">thumb_down</i>
              {recipe.downvotes}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

RecipeCatalogCard.propTypes = {
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

RecipeCatalogCard.defaultProps = {
  recipe: undefined,
};

export default RecipeCatalogCard;
