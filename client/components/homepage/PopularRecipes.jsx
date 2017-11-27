import React from 'react';

import PopularRecipsCard from './PopularRecipesCard';

const PopularRecipes = () => (
  <div id="popular" className="col s12 grey lighten-3 z-depth-1">
    <h4>Popular Recipes</h4>
    <hr />
    <PopularRecipsCard />
    <PopularRecipsCard />
    <PopularRecipsCard />
    <PopularRecipsCard />
    <PopularRecipsCard />
    <PopularRecipsCard />
  </div>
);

export default PopularRecipes;
