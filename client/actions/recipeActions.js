const fetchRecipes = recipes => ({
  type: 'FETCH_RECIPES',
  recipes,
});

const fetchPopularRecipes = popularRecipes => ({
  type: 'FETCH_POPULAR_RECIPES',
  popularRecipes,
});

export { fetchRecipes, fetchPopularRecipes };
