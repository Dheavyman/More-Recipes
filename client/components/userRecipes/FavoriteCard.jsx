import React from 'react';

const FavoriteCard = () => (
  <div id="recipes" className="card large">
    <a href="recipe.html">
      <span className="card-title">Swedish Noodles</span>
    </a>
    <div className="card-image">
      <a href="recipe.html"><img src="images/image06.jpg" alt="" /></a>
    </div>
    <div className="card-content">
      <p>A rich meal for an awesome afternoon.</p>
    </div>
    <div className="card-action">
      <p id="owner">
        <label htmlFor="owner">Recipe by: </label>
        John Stew
      </p>
      <ul className="center-align">
        <li id="views"><i className="material-icons tiny">visibility</i>
          200
        </li>
        <li id="favorites"><i className="material-icons tiny">favorite</i>
          20
        </li>
        <li id="upvotes"><i className="material-icons tiny">thumb_up</i>
          50
        </li>
        <li id="downvotes"><i className="material-icons tiny">thumb_down</i>
          10
        </li>
      </ul>
    </div>
  </div>
);

export default FavoriteCard;
