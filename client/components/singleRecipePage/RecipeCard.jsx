import React from 'react';
import PropTypes from 'prop-types';

import RecipeImage from '../common/RecipeImage';

const RecipeCard = (props) => {
  const { recipe } = props,
    { title, recipeImage, upvotes, downvotes } = recipe;
  return (
    <div className="card">
      <div className="card-image">
        <RecipeImage title={title} recipeImage={recipeImage} />
      </div>
      <div className="card-action center-align">
        <a id="favorite" className="chip waves-effect waves-red ">
          <i className="fa fa-heart" /><span>20</span>
        </a>
        <a id="upvote" className="chip waves-effect waves-red">
          <i className="fa fa-thumbs-up" /><span>{upvotes}</span>
        </a>
        <a id="downvote" className="chip waves-effect waves-red">
          <i className="fa fa-thumbs-down" /><span>{downvotes}</span>
        </a>
      </div>
    </div>
  );
};

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    title: PropTypes.string.isRequired,
    recipeImage: PropTypes.string.isRequired,
    upvotes: PropTypes.number.isRequired,
    downvotes: PropTypes.number.isRequired,
  }).isRequired,
};

export default RecipeCard;
