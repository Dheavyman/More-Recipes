import React from 'react';

import RecipeImage from '../common/RecipeImage';

const RecipeCard = () => (
  <div className="card">
    <div className="card-image">
      <RecipeImage />
    </div>
    <div className="card-action">
      <a id="favorite" className="chip waves-effect waves-red ">
        <i className="fa fa-heart" />
      </a>
      <a id="upvote" className="chip waves-effect waves-red">
        <i className="fa fa-thumbs-up" />
      </a>
      <a id="downvote" className="chip waves-effect waves-red">
        <i className="fa fa-thumbs-down" />
      </a>
    </div>
  </div>
);

export default RecipeCard;
