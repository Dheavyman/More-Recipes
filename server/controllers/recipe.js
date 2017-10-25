import db from '../../dummyDb';

const recipes = db.recipes;

export default {
  addRecipe(req, res) {
    recipes.push(req.body);
    res.status(200).send({
      status: 'Success',
      message: 'Recipe added successfully',
    });
  }
};
