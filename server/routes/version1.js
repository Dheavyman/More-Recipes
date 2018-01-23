import express from 'express';

import controllers from '../controllers';
import middlewares from '../middlewares';
import swaggerSpec from '../swagger';

const router = express.Router(),
  authenticate = middlewares.authentication,
  favoriteController = controllers.favorite,
  recipeController = controllers.recipe,
  reviewController = controllers.review,
  userController = controllers.user,
  voteController = controllers.vote,
  userValidate = middlewares.userValidation,
  recipeValidate = middlewares.recipeValidation,
  reviewValidate = middlewares.reviewValidation,
  notifyUsers = middlewares.usersNotification;

// Retrieve swagger specification for API
router.get('/swagger.json', (req, res) => {
  res.set('Content-Type', 'application/json');
  res.json({
    swaggerSpec,
  });
});

/**
 * @swagger
 * /users/signup:
 *   post:
 *     tags:
 *       - Users
 *     summary: Create a new user
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in:  body
 *         description: Signup details
 *         required: true
 *         schema:
 *           $ref: '#/definitions/UserSignup'
 *     responses:
 *       201:
 *         description: User created
 *         schema:
 *           $ref: '#/definitions/SignupResponse'
 *       400:
 *         description: Invalid or incomplete signup details
 */
router.post('/users/signup', userValidate.signupRequiredInputs,
  userValidate.validUserInputs, userValidate.usernameExist,
  userValidate.emailExist, userController.registerUser);

/**
 * @swagger
 * /users/signin:
 *   post:
 *     tags:
 *       - Users
 *     summary: User login
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         description: Login details
 *         required: true
 *         schema:
 *           $ref: '#/definitions/UserSignin'
 *     responses:
 *       200:
 *         description: Ok, User logged in
 *         schema:
 *           $ref: '#/definitions/LoginResponse'
 */
router.post('/users/signin', userValidate.signinRequiredInputs,
  userController.signinUser);

/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Retrieve a user profile
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: Id of user
 *         type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Ok, User profile retrieved
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: Success
 *             message:
 *               type: string
 *               example: User profile retrieved
 *             data:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/definitions/User'
 */
router.get('/users/:userId', authenticate.verifyToken, userValidate.userExist,
  userController.userProfile);

/**
 * @swagger
 * /users/{userId}:
 *   put:
 *     tags:
 *       - Users
 *     summary: Edit a user profile
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: Id of user
 *         type: integer
 *         required: true
 *       - name: body
 *         in: body
 *         description: New details
 *         required: true
 *         schema:
 *           $ref: '#/definitions/NewUserDetails'
 *     responses:
 *       200:
 *         description: Ok
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: Success
 *             message:
 *               type: string
 *               example: User details updated
 *             data:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/definitions/User'
 */
router.put('/users/:userId', authenticate.verifyToken, userValidate.userExist,
  userController.editUserDetails);

/**
 * @swagger
 * /users/{userId}/image:
 *   put:
 *     tags:
 *       - Users
 *     summary: Edit a user image
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: Id of user
 *         type: integer
 *         required: true
 *       - name: userImage
 *         in: body
 *         description: New user image url
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             userImage:
 *               type: string
 *     responses:
 *       200:
 *         description: Ok
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: Success
 *             message:
 *               type: string
 *               example: User image updated
 *             data:
 *               type: object
 *               properties:
 *                 userImage:
 *                   type: string
 */
router.put('/users/:userId/image', authenticate.verifyToken,
  userValidate.userExist, userController.editUserImage);

router.route('/recipes')
  /**
   * @swagger
   * /recipes:
   *   post:
   *     tags:
   *       - Recipes
   *     summary: Add a new recipe
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: body
   *         in: body
   *         description: Recipe creation details
   *         required: true
   *         schema:
   *           $ref: '#/definitions/NewRecipe'
   *     responses:
   *       201:
   *         description: Recipe created
   *         schema:
   *           type: object
   *           properties:
   *             status:
   *               type: string
   *               example: Success
   *             message:
   *               type: string
   *               example: Recipe created
   *             data:
   *               type: object
   *               properties:
   *                 recipe:
   *                   $ref: '#/definitions/Recipe'
   *       400:
   *         description: Invalid or incomplete details to create recipe
   */
  .post(authenticate.verifyToken, recipeValidate.recipeRequiredInputs,
    recipeController.addRecipe)

  /**
   * @swagger
   * /recipes:
   *   get:
   *     tags:
   *       - Recipes
   *     summary: Retrieve all recipes
   *     description: User can either search for recipes or sort recipes
   *                  but not both at the same time
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: search
   *         in: query
   *         description: Value to base the search on
   *         type: string
   *         enum:
   *           - ingredients
   *           - category
   *       - name: list
   *         in: query
   *         description: Value(s) to search with
   *         type: string
   *       - name: sort
   *         in: query
   *         description: Value to base the sort on
   *         type: string
   *       - name: order
   *         in: query
   *         description: Value to order the sort with
   *         type: string
   *     responses:
   *       200:
   *         description: Ok, Recipes retrieved
   *         schema:
   *           type: object
   *           properties:
   *             status:
   *               type: string
   *               example: Success
   *             message:
   *               type: string
   *               example: Recipes retrieved
   *             data:
   *               type: object
   *               properties:
   *                 recipes:
   *                   type: array
   *                   items:
   *                     $ref: '#/definitions/Recipe'
   */
  .get(recipeController.getAll, recipeController.getMostUpvotes,
    recipeController.searchByIngredients, recipeController.searchByCategory);

/**
 * @swagger
 * /recipes/popular:
 *   get:
 *     tags:
 *       - Recipes
 *     summary: Retrieve popular recipes based on favorites count
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Ok, Recipes retrieved
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: Success
 *             message:
 *               type: string
 *               example: Popular recipes retrieved
 *             data:
 *               type: object
 *               properties:
 *                 recipes:
 *                   type: array
 *                   items:
 *                     $ref: '#/definitions/Recipe'
 */
router.get('/recipes/popular', recipeController.getPopular);

router.route('/recipes/:recipeId')
  /**
   * @swagger
   * /recipes/{recipeId}:
   *   get:
   *     tags:
   *       - Recipes
   *     summary: Retrieve a single recipe
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: recipeId
   *         in: path
   *         description: Id of recipe to retrieve
   *         type: integer
   *         required: true
   *     responses:
   *       200:
   *         description: Ok, Recipe retrieved
   *         schema:
   *           type: object
   *           properties:
   *             status:
   *               type: string
   *               example: Success
   *             message:
   *               type: string
   *               example: Recipe retrieved
   *             data:
   *               type: object
   *               properties:
   *                 recipe:
   *                   $ref: '#/definitions/Recipe'
   */
  .get(recipeValidate.recipeExist, recipeController.getOne)

  /**
   * @swagger
   * /recipes/{recipeId}:
   *   put:
   *     tags:
   *       - Recipes
   *     summary: Modify a recipe
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: recipeId
   *         in: path
   *         description: Id of recipe to modify
   *         type: integer
   *         required: true
   *       - name: body
   *         in: body
   *         description: New details
   *         required: true
   *         schema:
   *           $ref: '#/definitions/NewRecipe'
   *     responses:
   *       200:
   *         description: Ok, Recipe modified
   *         schema:
   *           type: object
   *           properties:
   *             status:
   *               type: string
   *               example: Success
   *             message:
   *               type: string
   *               example: Recipe modified
   *             data:
   *               type: object
   *               properties:
   *                 recipe:
   *                   $ref: '#/definitions/Recipe'
   */
  .put(authenticate.verifyToken, recipeValidate.recipeRequiredInputs,
    recipeValidate.recipeExist, recipeValidate.userRecipe,
    notifyUsers.favoriteRecipeModified, recipeController.modifyRecipe)

  /**
   * @swagger
   * /recipes/{recipeId}:
   *   delete:
   *     tags:
   *       - Recipes
   *     summary: Delete a single recipe
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: recipeId
   *         in: path
   *         description: Id of recipe to delete
   *         type: integer
   *         required: true
   *     responses:
   *       200:
   *         description: Ok, Recipe deleted
   *         schema:
   *           type: object
   *           properties:
   *             status:
   *               type: string
   *               example: Success
   *             message:
   *               type: string
   *               example: Recipe deleted
   */
  .delete(authenticate.verifyToken, recipeValidate.recipeExist,
    recipeValidate.userRecipe, recipeController.deleteRecipe);

/**
 * @swagger
 * /recipes/{recipeId}/reviews:
 *   post:
 *     tags:
   *       - Reviews
 *     summary: Add a review
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: recipeId
 *         in: path
 *         description: Id of recipe to delete
 *         type: integer
 *         required: true
 *       - name: body
 *         in: body
 *         description: Review content
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             content:
 *               type: string
 *     responses:
 *       201:
 *         description: Review created
 *         schema:
 *           $ref: '#/definitions/Review'
 *       400:
 *         description: Invalid or incomplete details to create review
 */
router.post('/recipes/:recipeId/reviews', authenticate.verifyToken,
  reviewValidate.reviewRequiredInputs, recipeValidate.recipeExist,
  reviewController.addReview);

/**
 * @swagger
 * /recipes/{recipeId}/reviews/{reviewId}:
 *   delete:
 *     tags:
   *       - Reviews
 *     summary: Delete a review
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: recipeId
 *         in: path
 *         description: Id of recipe
 *         type: integer
 *         required: true
 *       - name: reviewId
 *         in: path
 *         description: Id of review to delete
 *         type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Ok, Review deleted
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: Success
 *             message:
 *               type: string
 *               example: Review deleted
 */
router.delete('/recipes/:recipeId/reviews/:reviewId', authenticate.verifyToken,
  recipeValidate.recipeExist, reviewValidate.reviewExist,
  reviewValidate.userReview, reviewController.deleteReview);

/**
 * @swagger
 * /recipes/{recipeId}/favorites:
 *   post:
 *     tags:
   *       - Favorites
 *     summary: Add a recipe to favorite
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: recipeId
 *         in: path
 *         description: Id of recipe to delete
 *         type: integer
 *         required: true
 *     responses:
 *       201:
 *         description: Recipe added to favorites
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: Success
 *             message:
 *               type: string
 *               example: Recipe added to favorites
 *       200:
 *         description: Recipe removed from favorites
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: Success
 *             message:
 *               type: string
 *               example: Recipe removed from favorites
 */
router.post('/recipes/:recipeId/favorites', authenticate.verifyToken,
  recipeValidate.recipeExist, favoriteController.setFavorite);

/**
 * @swagger
 * /recipes/users/{userId}:
 *   get:
 *     tags:
   *       - Recipes
 *     summary: Retrieve user added recipes
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: Id of user
 *         type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Ok, Recipes retrieved
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: Success
 *             message:
 *               type: string
 *               example: User recipes retrieved
 *             data:
 *               type: object
 *               properties:
 *                 recipes:
 *                   type: array
 *                   items:
 *                     $ref: '#/definitions/Recipe'
 *       404:
 *         description: Not found
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: Fail
 *             message:
 *               type: string
 *               example: User has not added any recipe
 */
router.get('/recipes/users/:userId', authenticate.verifyToken,
  userValidate.userExist, recipeController.userRecipes);

/**
 * @swagger
 * /users/{userId}/recipes:
 *   get:
 *     tags:
   *       - Favorites
 *     summary: Retrieve user favorite recipes
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: Id of user
 *         type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Ok, Recipes retrieved
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: Success
 *             message:
 *               type: string
 *               example: Favorites retrieved
 *             data:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/definitions/UserFavorites'
 *       404:
 *         description: Not found
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: Fail
 *             message:
 *               type: string
 *               example: User has not added any recipe
 */
router.get('/users/:userId/recipes', authenticate.verifyToken,
  userValidate.userExist, favoriteController.userFavorites);

/**
 * @swagger
 * /users/recipes/{recipeId}:
 *   put:
 *     tags:
 *       - Favorites
 *     summary: Create category for user favorite recipe
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: recipeId
 *         in: path
 *         description: Id of recipe
 *         type: integer
 *         required: true
 *       - name: body
 *         in: body
 *         description: Category to be created
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             category:
 *               type: string
 *     responses:
 *       200:
 *         description: Ok, Category created
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: Success
 *             message:
 *               type: string
 *               example: Favorite recipe category added
 *       404:
 *         description: Not found
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: Fail
 *             message:
 *               type: string
 *               example: Favorite recipe not found
 */
router.put('/users/recipes/:recipeId', authenticate.verifyToken,
  recipeValidate.recipeExist, favoriteController.favoriteCategory);

/**
 * @swagger
 * /recipes/{recipeId}/upvotes:
 *   put:
 *     tags:
 *       - Votes
 *     summary: Upvote a recipe
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: recipeId
 *         in: path
 *         description: Id of recipe
 *         type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Ok, Upvote created
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: Success
 *             message:
 *               type: string
 *               example: Upvote recorded
 *             data:
 *               $ref: '#/definitions/VoteUpdate'
 */
router.put('/recipes/:recipeId/upvotes', authenticate.verifyToken,
  recipeValidate.recipeExist, voteController.upvote);

/**
 * @swagger
 * /recipes/{recipeId}/downvotes:
 *   put:
 *     tags:
 *       - Votes
 *     summary: Downvote a recipe
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: recipeId
 *         in: path
 *         description: Id of recipe
 *         type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Ok, Downvote created
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: Success
 *             message:
 *               type: string
 *               example: Downvote recorded
 *             data:
 *               $ref: '#/definitions/VoteUpdate'
 */
router.put('/recipes/:recipeId/downvotes', authenticate.verifyToken,
  recipeValidate.recipeExist, voteController.downvote);

/**
 * @swagger
 * /users/enable:
 *   put:
 *     tags:
 *       - Users
 *     summary: Enable notification
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Ok, Notification enabled
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: Success
 *             message:
 *               type: string
 *               example: Notification enabled
 */
router.put('/users/enable', authenticate.verifyToken,
  userController.enableNotifications);

/**
 * @swagger
 * /users/disable:
 *   put:
 *     tags:
 *       - Users
 *     summary: Disable notification
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Ok, Notification disabled
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: Success
 *             message:
 *               type: string
 *               example: Notification disabled
 */
router.put('/users/disable', authenticate.verifyToken,
  userController.disableNotifications);

export default router;

/**
 * @swagger
 * definitions:
 *   User:
 *     type: object
 *     properties:
 *       username:
 *         description: User username
 *         type: string
 *       firstName:
 *         description: User firstName
 *         type: string
 *       lastName:
 *         description: User lastName
 *         type: string
 *       email:
 *         description: User email
 *         type: string
 *       phone:
 *         description: User phone number
 *         type: integer
 *       userImage:
 *         description: User image
 *         type: string
 *   NewUserDetails:
 *     type: object
 *     properties:
 *       firstName:
 *         description: User firstName
 *         type: string
 *       lastName:
 *         description: User lastName
 *         type: string
 *       phone:
 *         description: User phone number
 *         type: integer
 *   UserSignup:
 *     type: object
 *     properties:
 *       firstName:
 *         description: User firstName
 *         type: string
 *       lastName:
 *         description: User lastName
 *         type: string
 *       username:
 *         description: User username
 *         type: string
 *       email:
 *         description: User email
 *         type: string
 *       password:
 *         description: User password
 *         type: string
 *       userImage:
 *         description: User image
 *         type: string
 *   UserSignin:
 *     type: object
 *     properties:
 *       username:
 *         description: User username
 *         type: string
 *       password:
 *         description: User password
 *         type: string
 *   SignupResponse:
 *     type: object
 *     properties:
 *       status:
 *         type: string
 *         example: Success
 *       message:
 *         type: string
 *         example: User created
 *   LoginResponse:
 *     type: object
 *     properties:
 *       status:
 *         type: string
 *         example: Success
 *       message:
 *         type: string
 *         example: User logged in
 *       data:
 *         type: object
 *         properties:
 *           token:
 *             type: string
 *   Recipe:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *       title:
 *         type: string
 *       category:
 *         type: string
 *       description:
 *         type: string
 *       preparationTime:
 *         type: integer
 *         minimum: 0
 *       ingredients:
 *         type: string
 *       directions:
 *         type: string
 *       recipeImage:
 *         type: string
 *       upvotes:
 *         type: integer
 *       downvotes:
 *         type: integer
 *       views:
 *         type: integer
 *       favorites:
 *         type: integer
 *   NewRecipe:
 *     type: object
 *     properties:
 *       title:
 *         type: string
 *         description: Title of recipe
 *       category:
 *         type: string
 *         description: Category of recipe
 *       description:
 *         type: string
 *         description: Short description of recipe
 *       preparationTime:
 *         type: integer
 *         minimum: 0
 *         description: Time to prepare the recipe
 *       ingredients:
 *         type: string
 *         description: Ingredient required
 *       directions:
 *         type: string
 *         description: Directions to prepare the recipe
 *       recipeImage:
 *         type: string
 *         description: Image of recipe
 *   Review:
 *     type: object
 *     properties:
 *       status:
 *         type: string
 *         example: Success
 *       message:
 *         type: string
 *         example: Review created
 *       data:
 *         type: object
 *         properties:
 *           review:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               content:
 *                 type: string
 *               createdAt:
 *                 type: integer
 *               User:
 *                 type: object
 *                 properties:
 *                   fullName:
 *                     type: string
 *   UserFavorites:
 *     type: object
 *     properties:
 *       fullName:
 *         type: string
 *         description: Full name of User
 *       firstName:
 *         type: string
 *         description: First name of user
 *       lastName:
 *         type: string
 *         description: Last name of user
 *       Favorites:
 *         type: array
 *         items:
 *           type: object
 *           properties:
 *             recipeId:
 *               type: integer
 *               description: Id of recipe
 *             category:
 *               type: integer
 *               description: User favorite category
 *             Recipe:
 *               $ref: '#/definitions/Recipe'
 *   VoteUpdate:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *         description: Id of recipe
 *       upvotes:
 *         type: integer
 *         description: Number of upvotes
 *       downvotes:
 *         type: integer
 *         description: Number of downvotes
 */
