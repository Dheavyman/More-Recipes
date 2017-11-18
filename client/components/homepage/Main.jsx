import React from 'react';

import PopularRecipes from './PopularRecipes';
import RecipeCatalog from './RecipeCatalog';
import SearchBar from './SearchBar';
import Slider from './Slider';

const Main = () => (
  <main>
    <div id="position">
      <Slider />
      <SearchBar />
    </div>
    <div className="row">
      <div className="col s12 m5 l4 push-m7 push-l8">
        <PopularRecipes />
      </div>
      <div className="col s12 m7 l8 pull-m5 pull-l4">
        <RecipeCatalog />
      </div>
    </div>
  </main>
);

export default Main;
