import React from 'react';

import RecipeImage from '../common/RecipeImage';

const RecipeCard = () => (
  <div className="card">
    <div className="card-image">
      <RecipeImage />
    </div>
    <div className="card-action center-align">
      <a id="favorite" className="chip waves-effect waves-red ">
        <i className="fa fa-heart" /><span>20</span>
      </a>
      <a id="upvote" className="chip waves-effect waves-red">
        <i className="fa fa-thumbs-up" /><span>50</span>
      </a>
      <a id="downvote" className="chip waves-effect waves-red">
        <i className="fa fa-thumbs-down" /><span>10</span>
      </a>
    </div>
  </div>
);

export default RecipeCard;
