import React from 'react';

import common from '../common';

const { RecipeImage } = common;

const RecipeCard = () =>
  (
    <div className="col s12 m6 l4">
      <div id="recipes" className="card large">
        <a href="recipe.html">
          <span className="card-title">German Sauce</span></a>
        <div className="card-image">
          <a href="recipe.html">
            <RecipeImage />
          </a>
        </div>
        <div className="card-content">
          <p>A rich meal for an awesome afternoon.</p>
        </div>
        <div className="card-action">
          <p id="owner">
            <label htmlFor="owner">Recipe by: </label> John Stew
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
    </div>
  );

export default RecipeCard;
