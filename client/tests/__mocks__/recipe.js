export default {
  retrieveRecipesSuccess: {
    recipes: [],
    recipesCount: 0,
  },
  retrieveRecipesFailure: {
    status: 'Fail',
    message: 'Error message',
  },
  popularRecipesSuccess: [{
    title: 'Rice',
    category: 'Lunch',
    description: 'Tasty rice',
    preparationTime: 50,
    ingredients: 'Rice, tomatoes, salt',
    directions: 'Do this, do that',
  }, {
    title: 'Yam',
    category: 'Breakfast',
    description: 'Tasty yam',
    preparationTime: 30,
    ingredients: 'Yam, palm oil,  salt',
    directions: 'Do this, do that',
  }],
  popularRecipesFailure: {
    status: 'Fail',
    message: 'Error message',
  },
  fetchRecipeSuccess: {
    title: 'Yam',
    category: 'Breakfast',
    description: 'Tasty yam',
    preparationTime: 30,
    ingredients: 'Yam, palm oil,  salt',
    directions: 'Do this, do that',
  },
  fetchRecipeFailure: {
    status: 'Fail',
    message: 'Error message',
  },
  fetchUserRecipesSuccess: {
    recipes: [{
      title: 'Rice',
      category: 'Lunch',
      description: 'Tasty rice',
      preparationTime: 50,
      ingredients: 'Rice, tomatoes, salt',
      directions: 'Do this, do that',
    }],
    recipesCount: 1,
  },
  fetchUserRecipesFailure: {
    status: 'Fail',
    message: 'Error message',
  },
  fetchUserFavoritesSuccess: [{
    title: 'Rice',
    category: 'Lunch',
    description: 'Tasty rice',
    preparationTime: 50,
    ingredients: 'Rice, tomatoes, salt',
    directions: 'Do this, do that',
  }],
  fetchUserFavoritesFailure: {
    status: 'Fail',
    message: 'Error message',
  },
  searchRecipeSuccess: [{
    title: 'Yam',
    category: 'Breakfast',
    description: 'Tasty yam',
    preparationTime: 30,
    ingredients: 'Yam, palm oil,  salt',
    directions: 'Do this, do that',
  }, {
    title: 'Rice',
    category: 'Lunch',
    description: 'Tasty rice',
    preparationTime: 50,
    ingredients: 'Rice, tomatoes, salt',
    directions: 'Do this, do that',
  }],
  searchRecipeFailure: {
    status: 'Fail',
    message: 'Error message',
  },
  retrieveRecipesSuccessResponse: {
    status: 'Success',
    message: 'Recipes retrieved',
    data: {
      recipes: [{
        title: 'Yam',
        category: 'Breakfast',
        description: 'Tasty yam',
        preparationTime: 30,
        ingredients: 'Yam, palm oil,  salt',
        directions: 'Do this, do that',
      }, {
        title: 'Rice',
        category: 'Lunch',
        description: 'Tasty rice',
        preparationTime: 50,
        ingredients: 'Rice, tomatoes, salt',
        directions: 'Do this, do that',
      }],
      recipesCount: 2,
    },
  },
  retrieveRecipesFailureResponse: {
    status: 'Fail',
    message: 'Error retrieving recipes',
  },
  popularRecipesSuccessResponse: {
    status: 'Success',
    message: 'Recipes retrieved',
    data: {
      recipes: [{
        title: 'Yam',
        category: 'Breakfast',
        description: 'Tasty yam',
        preparationTime: 30,
        ingredients: 'Yam, palm oil,  salt',
        directions: 'Do this, do that',
      }, {
        title: 'Rice',
        category: 'Lunch',
        description: 'Tasty rice',
        preparationTime: 50,
        ingredients: 'Rice, tomatoes, salt',
        directions: 'Do this, do that',
      }],
      recipesCount: 2,
    },
  },
  fetchRecipeSuccessResponse: {
    status: 'Success',
    message: 'Recipe retrieved',
    data: {
      recipe: {
        title: 'Yam',
        category: 'Breakfast',
        description: 'Tasty yam',
        preparationTime: 30,
        ingredients: 'Yam, palm oil,  salt',
        directions: 'Do this, do that',
        Favorites: [],
        Votes: [],
        Reviews: [],
      },
    },
  },
  fetchRecipeFailureResponse: {
    status: 'Fail',
    message: 'Error in fetching recipe',
  },
  userRecipesSuccessResponse: {
    status: 'Success',
    message: 'Recipes retrieved',
    data: {
      recipes: [{
        title: 'Yam',
        category: 'Breakfast',
        description: 'Tasty yam',
        preparationTime: 30,
        ingredients: 'Yam, palm oil,  salt',
        directions: 'Do this, do that',
      }, {
        title: 'Rice',
        category: 'Lunch',
        description: 'Tasty rice',
        preparationTime: 50,
        ingredients: 'Rice, tomatoes, salt',
        directions: 'Do this, do that',
      }],
      recipesCount: 2,
    },
  },
  userRecipesFailureResponse: {
    status: 'Fail',
    message: 'Error fetching user recipes',
  },
  userFavoritesSuccessResponse: {
    status: 'Success',
    message: 'Favorites retrieved',
    data: {
      favorites: [{
        title: 'Yam',
        category: 'Breakfast',
        description: 'Tasty yam',
        preparationTime: 30,
        ingredients: 'Yam, palm oil,  salt',
        directions: 'Do this, do that',
      }, {
        title: 'Rice',
        category: 'Lunch',
        description: 'Tasty rice',
        preparationTime: 50,
        ingredients: 'Rice, tomatoes, salt',
        directions: 'Do this, do that',
      }],
      favoritesCount: 2,
    },
  },
  userFavoritesFailureResponse: {
    status: 'Fail',
    message: 'Error fetching recipes'
  },
  searchRecipesSuccessResponse: {
    status: 'Success',
    message: 'Recipe(s) retrieved',
    data: {
      recipes: [{
        title: 'Rice',
        category: 'Lunch',
        description: 'Tasty rice',
        preparationTime: 50,
        ingredients: 'Rice, tomatoes, salt',
        directions: 'Do this, do that',
      }],
    },
  },
  searchRecipesFailureResponse: {
    status: 'Fail',
    message: 'Error searching for recipe'
  },
  addRecipeSuccess: {
    recipe: {
      id: 5,
      title: 'Macaroni',
      category: 'Dinner',
      description: 'Tasty macaroni',
      preparationTime: 45,
      ingredients: 'Macaroni, groundnut oil, salt',
      directions: 'Do this, do that',
      recipeImage: 'Recipe image',
      upvotes: 0,
      downvotes: 0,
      views: 1,
      favorites: 0,
    },
  },
  addRecipeFailure: {
    status: 'Fail',
    message: 'Error adding recipe',
  },
  recipeId: 5,
  editRecipeSuccess: {
    recipe: {
      id: 5,
      title: 'Macaroni',
      category: 'Dinner',
      description: 'Tasty and nutritious macaroni',
      preparationTime: 45,
      ingredients: 'Macaroni, groundnut oil, salt',
      directions: 'Do this, do this again, do that',
      recipeImage: 'Recipe image',
      upvotes: 0,
      downvotes: 0,
      views: 1,
      favorites: 0,
    },
  },
  editRecipeFailure: {
    status: 'Fail',
    message: 'Error editing recipe',
  },
  deleteRecipeFailure: {
    status: 'Fail',
    message: 'Error deleting recipe',
  },
  recipeImageUrl: 'Recipe image url',
  uploadImageFailure: {
    message: 'Error message',
  },
  recipeValue: {
    id: 5,
    title: 'Macaroni',
    category: 'Dinner',
    description: 'Tasty macaroni',
    preparationTime: 45,
    ingredients: 'Macaroni, groundnut oil, salt',
    directions: 'Do this, do that',
    recipeImage: 'Recipe image',
    upvotes: 0,
    downvotes: 0,
    views: 1,
    favorites: 0,
  },
  addRecipeSuccessResponse: {
    status: 'Success',
    message: 'Recipe created',
    data: {
      recipe: {
        id: 5,
        title: 'Macaroni',
        category: 'Dinner',
        description: 'Tasty macaroni',
        preparationTime: 45,
        ingredients: 'Macaroni, groundnut oil, salt',
        directions: 'Do this, do that',
        recipeImage: 'Recipe image',
        upvotes: 0,
        downvotes: 0,
        views: 1,
        favorites: 0,
      },
    },
  },
  addRecipeFailureResponse: {
    status: 'Fail',
    message: 'Error creating recipe',
  },
  editRecipeSuccessResponse: {
    status: 'Success',
    message: 'Recipe updated',
    data: {
      recipe: {
        id: 5,
        title: 'Macaroni',
        category: 'Dinner',
        description: 'Tasty macaroni',
        preparationTime: 45,
        ingredients: 'Macaroni, pepper, groundnut oil, salt',
        directions: 'Do this, do that',
        recipeImage: 'Recipe image',
        upvotes: 0,
        downvotes: 0,
        views: 1,
        favorites: 0,
      },
    },
  },
  editRecipeFailureResponse: {
    status: 'Fail',
    message: 'Error updating recipe',
  },
  deleteRecipeSuccessResponse: {
    status: 'Success',
    message: 'Recipe deleted',
  },
  deleteRecipeFailureResponse: {
    status: 'Fail',
    message: 'Error deleting recipe',
  },
  recipeImageData: {
    imageData: 'image data',
  },
  uploadImageSuccessResponse: {
    secure_url: 'secure image url',
  },
  uploadImageFailureResponse: {
    data: {
      error: 'Error uploading image',
    },
  },
  setFavoriteSuccessResponse: {
    status: 'Success',
    message: 'Recipe added to favorites',
    data: {
      favorites: 1,
    },
  },
  setFavoriteFailureResponse: {
    status: 'Fail',
    message: 'Error setting favorite recipe'
  },
  voteSuccessResponse: {
    status: 'Success',
    message: 'Upvote or downvote recorded',
    data: {
      id: 2,
      upvotes: 1,
      downvotes: 0,
    },
  },
  voteFailureResponse: {
    status: 'Failure',
    message: 'Error voting',
  },
};
