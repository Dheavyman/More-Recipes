import React from 'react';

import RecipeImage from '../common/RecipeImage';
import RecipeCard from './RecipeCard';
import RecipeDetails from './RecipeDetails';
import ReviewCollection from './ReviewCollection';
import AddReview from './AddReview';

const Main = () => (
  <main>
    <div className="parallax-container">
      <div className="parallax">
        <RecipeImage />
      </div>
    </div>
    <div className="section white container">
      <div className="row">
        <div className="col s12">
          <h5 className="header">German Sauce</h5>
        </div>
      </div>
      <div className="row">
        <div className="col s12 m6 l5">
          <RecipeCard />
        </div>
        <div className="col s12 m6 l7">
          <RecipeDetails />
        </div>
      </div>
      <ReviewCollection />
      <AddReview />
    </div>
  </main>
);

export default Main;
