import db from '../../dummyDb';

const recipes = db.recipes;

export default {
  addRecipe(req, res) {
    recipes.push(req.body);
    return res.status(200).send({
      status: 'Success',
      message: 'Recipe added successfully',
    });
  },

  modifyRecipe(req, res) {
    for (let i = 0; i < recipes.length; i += 1) {
      const recipe = recipes[i];
      if (recipe.id === parseInt(req.params.recipeId, 10)) {
        recipe.title = req.body.title || recipe.title;
        recipe.description = req.body.description || recipe.description;
        recipe.preparationTime = req.body.preparationTime ||
          recipe.preparationTime;
        recipe.ingredients = req.body.ingredients || recipe.ingredients;
        recipe.directions = req.body.directions || recipe.directions;
        return res.status(200).send({
          status: 'Success',
          message: 'Recipe modified successfully',
        });
      }
    }
    return res.status(404).send({
      status: 'Fail',
      message: 'Recipe not found'
    });
  },

  deleteRecipe(req, res) {
    for (let i = 0; i < recipes.length; i += 1) {
      const recipe = recipes[i];
      if (recipe.id === parseInt(req.params.recipeId, 10)) {
        recipes.splice(i, 1);
        return res.status(200).send({
          status: 'Success',
          message: 'Recipe deleted successfully',
        });
      }
    }
    return res.status(404).send({
      status: 'Fail',
      message: 'Recipe not found'
    });
  },

  getAll(req, res) {
    res.status(200).send({
      recipes,
    });
  },

  getOne(req, res) {
    for (let i = 0; i < recipes.length; i += 1) {
      const recipe = recipes[i];
      if (recipe.id === parseInt(req.params.recipeId, 10)) {
        return res.status(200).send({
          status: 'Success',
          recipe: recipes[i],
        });
      }
    }
    return res.status(404).send({
      status: 'Fail',
      message: 'Recipe not found'
    });
  }
};
