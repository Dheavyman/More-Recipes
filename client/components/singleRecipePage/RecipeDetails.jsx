import React from 'react';

const RecipeDetails = () => (
  <div className="row">
    <div className="col s12">
      <h6><b><em>Description:</em></b></h6>
      <p id="description" className="grey-text text-darken-3 lighten-3">
        A rich meal for an awesome afternoon.
      </p>
    </div>
    <div className="col s12">
      <h6><b><em>Preparation Time (Minutes):</em></b></h6>
      <p id="prep-time" className="grey-text text-darken-3 lighten-3">
        80
      </p>
    </div>
    <div className="col s12">
      <h6><b><em>Ingredients:</em></b></h6>
      <p id="ingredients" className="grey-text text-darken-3 lighten-3">
        Tomatoes <br /> Fish <br /> Pepper <br /> Spices <br /> Salt
      </p>
    </div>
    <div className="col s12">
      <h6><b><em>Directions:</em></b></h6>
      <p id="directions" className="grey-text text-darken-3 lighten-3">
        Boil the boilables for 20 minutes.
        <br />Cook the fish for 15 minutes.
        <br />Add spices andseasonings and cook for 30 minutes.
      </p>
    </div>
  </div>
);

export default RecipeDetails;
