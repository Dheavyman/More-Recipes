import 'mocha';
import chai from 'chai';
import supertest from 'supertest';
import jwt from 'jsonwebtoken';

import app from '../server/app';
import { validSigninSeed } from './__mockData__/user';
import { validRecipeSeed, invalidRecipeSeed } from './__mockData__/recipes';
import { validReviewSeed } from './__mockData__/review';

const server = supertest.agent(app);
const expect = chai.expect;
const userToken = [];
let userId1;
let recipeId1;
let recipeId2;

describe('More-Recipes recipe test', () => {
  describe('signin user', () => {
    it('should allow a user to login', (done) => {
      server
        .post('/api/v1/users/signin')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(validSigninSeed[0])
        .end((err, res) => {
          userToken[0] = res.body.data.user.token;
          userId1 = jwt.decode(userToken[0]).user.id;
          expect('Content-Type', 'application/json');
          expect(res.statusCode).to.equal(200);
          expect(res.body.status).to.equal('Success');
          expect(res.body.message).to.equal('User logged in');
          expect(res.body.data.user.fullName).to.equal('Jessy Sanders');
          expect(res.body.data.user.userImage).to.equal('user.image.url');
          expect(res.body.data.user.token).to.be.a('string');
          done();
        });
    });
    it('should allow another user to login', (done) => {
      server
        .post('/api/v1/users/signin')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(validSigninSeed[1])
        .end((err, res) => {
          userToken[1] = res.body.data.user.token;
          expect('Content-Type', 'application/json');
          expect(res.statusCode).to.equal(200);
          expect(res.body.status).to.equal('Success');
          expect(res.body.message).to.equal('User logged in');
          expect(res.body.data.user.fullName).to.equal('John Scotch');
          expect(res.body.data.user.userImage).to.equal(null);
          expect(res.body.data.user.token).to.be.a('string');
          done();
        });
    });
  });
  describe('add recipe API', () => {
    it('should return 401 for unauthenticated access', (done) => {
      server
        .post('/api/v1/recipes')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', '')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(validRecipeSeed[0])
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
          expect(res.body.status).to.equal('Fail');
          expect(res.body.message).to
            .equal('Unauthenticated access, no token provided');
          done();
        });
    });
    it('should return 401 for unverified token', (done) => {
      server
        .post('/api/v1/recipes')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', 'abc.123.xyz')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(validRecipeSeed[0])
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
          expect(res.body.status).to.equal('Error');
          expect(res.body).to.have.a.property('message');
          expect(res.body.message).to.equal('Invalid token');
          done();
        });
    });
    it('should return 401 for unverified token', (done) => {
      server
        .post('/api/v1/recipes')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', `${userToken[0]}1a2`)
        .set('Content-Type', 'application/json')
        .type('form')
        .send(validRecipeSeed[0])
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
          expect(res.body.status).to.equal('Error');
          expect(res.body).to.have.a.property('message');
          done();
        });
    });
    it('should allow logged in user to post a recipe', (done) => {
      server
        .post('/api/v1/recipes')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', userToken[0])
        .set('Content-Type', 'application/json')
        .type('form')
        .send(validRecipeSeed[0])
        .end((err, res) => {
          recipeId1 = res.body.data.recipe.id;
          expect(res.statusCode).to.equal(201);
          expect(res.body.status).to.equal('Success');
          expect(res.body.message).to.equal('Recipe created');
          expect(res.body.data.recipe.title).to.equal('Beans');
          expect(res.body.data.recipe.category).to.equal('Dessert');
          expect(res.body.data.recipe.description).to.equal('Tasty beans');
          expect(res.body.data.recipe.preparationTime).to.equal(65);
          expect(res.body.data.recipe.ingredients).to
            .equal('Beans, red oil, onion, salt, maggi, pepper');
          expect(res.body.data.recipe.directions).to
            .equal('Cook the beans and add the ingredients');
          expect(res.body.data.recipe.recipeImage).to.equal('Beans URL');
          done();
        });
    });
    it('should return 409 if a user posts a recipe with same title', (done) => {
      server
        .post('/api/v1/recipes')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', userToken[0])
        .set('Content-Type', 'application/json')
        .type('form')
        .send(validRecipeSeed[0])
        .end((err, res) => {
          expect(res.statusCode).to.equal(409);
          expect(res.body.status).to.equal('Fail');
          expect(res.body.message).to.equal(
            'You already have a recipe with same title'
          );
          done();
        });
    });
    it('should allow logged in user to post another recipe', (done) => {
      server
        .post('/api/v1/recipes')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', userToken[0])
        .set('Content-Type', 'application/json')
        .type('form')
        .send(validRecipeSeed[1])
        .end((err, res) => {
          recipeId2 = res.body.data.recipe.id;
          expect(res.statusCode).to.equal(201);
          expect(res.body.status).to.equal('Success');
          expect(res.body.message).to.equal('Recipe created');
          expect(res.body.data.recipe.title).to.equal('Yam sauce');
          expect(res.body.data.recipe.category).to.equal('Lunch');
          expect(res.body.data.recipe.description).to
            .equal('Served white and colorful');
          expect(res.body.data.recipe.preparationTime).to.equal(50);
          expect(res.body.data.recipe.ingredients).to
            .equal('Yam, tomatoes, egg, salt, maggi, pepper');
          expect(res.body.data.recipe.directions).to
            .equal('Slice the yam and prepare the sauce');
          expect(res.body.data.recipe.recipeImage).to.equal('Yam URL');
          done();
        });
    });
    it('should allow another logged in user to post a recipe', (done) => {
      server
        .post('/api/v1/recipes')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', userToken[1])
        .set('Content-Type', 'application/json')
        .type('form')
        .send(validRecipeSeed[3])
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body.status).to.equal('Success');
          expect(res.body.message).to.equal('Recipe created');
          expect(res.body.data.recipe.title).to.equal('Egusi soup');
          expect(res.body.data.recipe.category).to.equal('Dinner');
          expect(res.body.data.recipe.description).to
            .equal('Tasty and nutritious soup');
          expect(res.body.data.recipe.preparationTime).to.equal(65);
          expect(res.body.data.recipe.ingredients).to
            .equal('Egusi, stock fish, red oil, onion, salt, maggi, pepper');
          expect(res.body.data.recipe.directions).to
            .equal('Cook the egusi and add the ingredients');
          expect(res.body.data.recipe.recipeImage).to.equal('Egusi URL');
          done();
        });
    });
    it('should return 400 for an empty title', (done) => {
      server
        .post('/api/v1/recipes')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', userToken[0])
        .set('Content-Type', 'application/json')
        .type('form')
        .send(invalidRecipeSeed[0])
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.status).to.equal('Fail');
          expect(res.body.message).to.equal('Title cannot be empty');
          done();
        });
    });
    it('should return 400 for an empty category', (done) => {
      server
        .post('/api/v1/recipes')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', userToken[0])
        .set('Content-Type', 'application/json')
        .type('form')
        .send(invalidRecipeSeed[5])
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.status).to.equal('Fail');
          expect(res.body.message).to.equal('Category cannot be empty');
          done();
        });
    });
    it('should return 400 for empty description', (done) => {
      server
        .post('/api/v1/recipes')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', userToken[0])
        .set('Content-Type', 'application/json')
        .type('form')
        .send(invalidRecipeSeed[1])
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.status).to.equal('Fail');
          expect(res.body.message).to.equal('Description cannot be empty');
          done();
        });
    });
    it('should return 400 for empty preparation time', (done) => {
      server
        .post('/api/v1/recipes')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', userToken[0])
        .set('Content-Type', 'application/json')
        .type('form')
        .send(invalidRecipeSeed[2])
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.status).to.equal('Fail');
          expect(res.body.message).to.equal('Preparation time cannot be empty');
          done();
        });
    });
    it('should return 400 for empty ingredients', (done) => {
      server
        .post('/api/v1/recipes')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', userToken[0])
        .set('Content-Type', 'application/json')
        .type('form')
        .send(invalidRecipeSeed[3])
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.status).to.equal('Fail');
          expect(res.body.message).to.equal('Ingredients cannot be empty');
          done();
        });
    });
    it('should return 400 for empty directions', (done) => {
      server
        .post('/api/v1/recipes')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', userToken[0])
        .set('Content-Type', 'application/json')
        .type('form')
        .send(invalidRecipeSeed[4])
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.status).to.equal('Fail');
          expect(res.body.message).to.equal('Directions cannot be empty');
          done();
        });
    });
  });
  describe('modify recipe API', () => {
    it('should allow logged in user to modify his/her recipe', (done) => {
      server
        .put(`/api/v1/recipes/${recipeId1}`)
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', userToken[0])
        .set('Content-Type', 'application/json')
        .type('form')
        .send(validRecipeSeed[2])
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.status).to.equal('Success');
          expect(res.body.message).to.equal('Recipe modified');
          expect(res.body.data.recipe.title).to.equal('Beans');
          expect(res.body.data.recipe.category).to.equal('Appetizer');
          expect(res.body.data.recipe.description).to
            .equal('Tasty and nutritious beans');
          expect(res.body.data.recipe.preparationTime).to.equal(80);
          expect(res.body.data.recipe.ingredients).to
            .equal('Beans, red oil, onion, salt, maggi, pepper');
          expect(res.body.data.recipe.directions).to
            .equal('Cook the beans and add the ingredients');
          expect(res.body.data.recipe.recipeImage).to.equal('Beans URL');
          done();
        });
    });
    it('should return 404 for modifying non-existing recipe', (done) => {
      server
        .put(`/api/v1/recipes/${100}`)
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', userToken[0])
        .set('Content-Type', 'application/json')
        .type('form')
        .send(validRecipeSeed[2])
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body.status).to.equal('Fail');
          expect(res.body.message).to.equal('Recipe not found');
          done();
        });
    });
    it('should return 403 for an attempts to modify a recipe user didn\'t add',
      (done) => {
        server
          .put(`/api/v1/recipes/${recipeId1}`)
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('x-access-token', userToken[1])
          .set('Content-Type', 'application/json')
          .type('form')
          .send(validRecipeSeed[2])
          .end((err, res) => {
            expect(res.statusCode).to.equal(403);
            expect(res.body.status).to.equal('Fail');
            expect(res.body.message).to.equal('Not user\'s recipe');
            done();
          });
      });
  });
  describe('retrieve recipe API', () => {
    it('should allow a user to get all the recipes in the catalog',
      (done) => {
        server
          .get('/api/v1/recipes')
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body.status).to.equal('Success');
            expect(res.body.message).to.equal('Recipes retrieved');
            expect(res.body.data.recipes).to.be.an('array');
            expect(res.body.data.recipesCount).to.be.a('number').that.equals(3);
            done();
          });
      });
    it('should allow a user to get a single recipe in the catalog',
      (done) => {
        server
          .get(`/api/v1/recipes/${recipeId2}`)
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body.status).to.equal('Success');
            expect(res.body.message).to.equal('Recipe retrieved');
            expect(res.body.data.recipe.title).to.equal('Yam sauce');
            expect(res.body.data.recipe.category).to.equal('Lunch');
            expect(res.body.data.recipe.description).to
              .equal('Served white and colorful');
            expect(res.body.data.recipe.preparationTime).to.equal(50);
            expect(res.body.data.recipe.ingredients).to
              .equal('Yam, tomatoes, egg, salt, maggi, pepper');
            expect(res.body.data.recipe.directions).to
              .equal('Slice the yam and prepare the sauce');
            expect(res.body.data.recipe.recipeImage).to.equal('Yam URL');
            done();
          });
      });
    it('should allow another user to get a single recipe in the catalog',
      (done) => {
        server
          .get(`/api/v1/recipes/${recipeId2}`)
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('x-access-token', userToken[1])
          .set('Content-Type', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body.status).to.equal('Success');
            expect(res.body.message).to.equal('Recipe retrieved');
            expect(res.body.data.recipe.title).to.equal('Yam sauce');
            expect(res.body.data.recipe.category).to.equal('Lunch');
            expect(res.body.data.recipe.description).to
              .equal('Served white and colorful');
            expect(res.body.data.recipe.preparationTime).to.equal(50);
            expect(res.body.data.recipe.ingredients).to
              .equal('Yam, tomatoes, egg, salt, maggi, pepper');
            expect(res.body.data.recipe.directions).to
              .equal('Slice the yam and prepare the sauce');
            expect(res.body.data.recipe.recipeImage).to.equal('Yam URL');
            done();
          });
      });
    it('should return 400 if the recipeId parameter is not integer', (done) => {
      server
        .get('/api/v1/recipes/recipeId2')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.status).to.equal('Error in parameter');
          done();
        });
    });
    it('should allow a user retrieve recipes added by him/her or another user',
      (done) => {
        server
          .get(`/api/v1/recipes/users/${userId1}`)
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('x-access-token', userToken[0])
          .set('Content-Type', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body.status).to.equal('Success');
            expect(res.body.message).to.equal('User recipes retrieved');
            expect(res.body.data.recipes).to.be.an('array');
            expect(res.body.data.recipesCount).to.be.a('number').that.equals(2);
            done();
          });
      });
    it('should return 200 if a user has not added any recipe', (done) => {
      server
        .get('/api/v1/recipes/users/3')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', userToken[1])
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.status).to.equal('Success');
          expect(res.body.message).to.equal('User has not added any recipe');
          expect(res.body.data.recipes).to.be.an('array');
          expect(res.body.data.recipesCount).to.be.a('number').that.equals(0);
          done();
        });
    });
    it('should allow a user to get the recipes based on favorite count',
      (done) => {
        server
          .get('/api/v1/recipes/popular')
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body.status).to.equal('Success');
            expect(res.body.message).to.equal('Popular recipes retrieved');
            expect(res.body.data.recipes).to.be.an('array');
            done();
          });
      });
    it('should return 404 for attempt to get a recipe that doesn\'t exist',
      (done) => {
        server
          .get(`/api/v1/recipes/${250}`)
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(404);
            expect(res.body.status).to.equal('Fail');
            expect(res.body.message).to.equal('Recipe not found');
            done();
          });
      });
  });
  describe('delete recipe API', () => {
    it('should return 403 for an attempts to delete a recipe user didn\'t add',
      (done) => {
        server
          .delete(`/api/v1/recipes/${recipeId1}`)
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('x-access-token', userToken[1])
          .set('Content-Type', 'application/json')
          .type('form')
          .end((err, res) => {
            expect(res.statusCode).to.equal(403);
            expect(res.body.status).to.equal('Fail');
            expect(res.body.message).to.equal('Not user\'s recipe');
            done();
          });
      });
    it('should allow logged in user to delete a recipe he/she added',
      (done) => {
        server
          .delete(`/api/v1/recipes/${recipeId1}`)
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('x-access-token', userToken[0])
          .set('Content-Type', 'application/json')
          .type('form')
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body.status).to.equal('Success');
            expect(res.body.message).to.equal('Recipe deleted');
            done();
          });
      });
    it('should return 404 for attempt to delete a recipe that doesn\'t exist',
      (done) => {
        server
          .delete(`/api/v1/recipes/${5000}`)
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('x-access-token', userToken[0])
          .set('Content-Type', 'application/json')
          .type('form')
          .end((err, res) => {
            expect(res.statusCode).to.equal(404);
            expect(res.body.status).to.equal('Fail');
            expect(res.body.message).to.equal('Recipe not found');
            done();
          });
      });
  });
  describe('retrieve recipe API', () => {
    it('should allow user get recipes with most upvotes in descending order',
      (done) => {
        server
          .get('/api/v1/recipes?sort=upvotes&order=descending')
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('x-access-token', userToken[0])
          .set('Content-Type', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body.status).to.equal('Success');
            expect(res.body.message).to.equal('Recipes retrieved');
            expect(res.body.data.recipes).to.be.an('array');
            done();
          });
      });
    it('should return 404 for unmatched query strings', (done) => {
      server
        .get('/api/v1/recipes?sort=upvotes&match=unordered')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', userToken[0])
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body.status).to.equal('Fail');
          expect(res.body.message).to
            .equal('No match found, wrong query strings');
          done();
        });
    });
    it('should return 404 for unmatched query strings', (done) => {
      server
        .get('/api/v1/recipes?sort=upvotes&notorder=unordered')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', userToken[0])
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body.status).to.equal('Fail');
          expect(res.body.message).to
            .equal('No match found, wrong query strings');
          done();
        });
    });
  });
  describe('search recipes by title', () => {
    it('should allow users to search for recipes based on title', (done) => {
      server
        .get('/api/v1/recipes?search=title&list=egusi+soup')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.status).to.equal('Success');
          expect(res.body.message).to.equal('Recipe(s) retrieved');
          expect(res.body.data.recipes).to.be.an('array');
          expect(res.body.data.recipes.length).to.equal(1);
          done();
        });
    });
    it('should notify users if there search returned empty array', (done) => {
      server
        .get('/api/v1/recipes?search=title&list=NoTitle')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.status).to.equal('Success');
          expect(res.body.message).to.equal('Recipe(s) retrieved');
          expect(res.body.data.recipes).to.be.an('array');
          expect(res.body.data.recipes.length).to.equal(0);
          done();
        });
    });
  });
  describe('search recipes by ingredients', () => {
    it('should allow a user to search for recipes based on list of ingredients',
      (done) => {
        server
          .get('/api/v1/recipes?search=ingredients&list=rice+salt')
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body.message).to.equal('Recipe(s) found');
            expect(res.body.data.recipes).to.be.an('array');
            expect(res.body.data.recipes.length).to.equal(2);
            done();
          });
      });
    it('should return 200 for a search that has no match', (done) => {
      server
        .get('/api/v1/recipes?search=ingredients&list=meat')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.status).to.equal('Success');
          expect(res.body.message).to.equal('Recipe(s) found');
          expect(res.body.data.recipes).to.be.an('array');
          expect(res.body.data.recipes.length).to.equal(0);
          done();
        });
    });
  });
  describe('search recipes by category', () => {
    it('should allow a user to search for recipes based on category',
      (done) => {
        server
          .get('/api/v1/recipes?search=category&list=lunch')
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body.status).to.equal('Success');
            expect(res.body.message).to.equal('Recipe(s) found');
            expect(res.body.data.recipes).to.be.an('array');
            expect(res.body.data.recipes.length).to.equal(1);
            done();
          });
      });
    it('should return 200 for a search that has no match', (done) => {
      server
        .get('/api/v1/recipes?search=category&list=breakfast')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.status).to.equal('Success');
          expect(res.body.message).to.equal('Recipe(s) found');
          expect(res.body.data.recipes).to.be.an('array');
          expect(res.body.data.recipes.length).to.equal(0);
          done();
        });
    });
  });
  describe('opt-in and test notifications', () => {
    it('should allow a user to opt-in for notifications', (done) => {
      server
        .put('/api/v1/users')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', userToken[0])
        .set('Content-Type', 'application/json')
        .send({ notifications: true })
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.status).to.equal('Success');
          expect(res.body.message).to.equal('User profile updated');
          expect(res.body.data.user.firstName).to.equal('Jessy');
          expect(res.body.data.user.lastName).to.equal('Sanders');
          expect(res.body.data.user.aboutMe).to.equal(null);
          expect(res.body.data.user.userImage).to.equal('user.image.url');
          expect(res.body.data.user.notifications).to.equal(true);
          done();
        });
    });
    it('should allow another user to opt-in for notifications', (done) => {
      server
        .put('/api/v1/users')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', userToken[1])
        .set('Content-Type', 'application/json')
        .send({ notifications: true })
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.message).to.equal('User profile updated');
          expect(res.body.data.user.firstName).to.equal('John');
          expect(res.body.data.user.lastName).to.equal('Scotch');
          expect(res.body.data.user.aboutMe).to.equal('This is my bio');
          expect(res.body.data.user.userImage).to.equal(null);
          expect(res.body.data.user.notifications).to.equal(true);
          done();
        });
    });
    it('should notify user when user recipe gets a review', (done) => {
      server
        .post(`/api/v1/recipes/${recipeId2}/reviews`)
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', userToken[1])
        .set('Content-Type', 'application/json')
        .type('form')
        .send(validReviewSeed[2])
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body.status).to.equal('Success');
          expect(res.body.message).to.equal('Review created');
          expect(res.body.data.review).to.be.an('object');
          expect(res.body.data.review).to.have.a.property('id');
          expect(res.body.data.review).to.have.a.property('userId');
          expect(res.body.data.review).to.have.a.property('User');
          expect(res.body.data.review.content).to
            .equal('A very tasty recipe, so sweet');
          expect(res.body.data.review.recipeId).to.equal(recipeId2);
          expect(res.body.data.review.User.fullName).to.equal('John Scotch');
          done();
        });
    });
    it('should allow a user to opt-out for notifications', (done) => {
      server
        .put('/api/v1/users')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', userToken[0])
        .set('Content-Type', 'application/json')
        .send({ notifications: false })
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.message).to.equal('User profile updated');
          expect(res.body.data.user.firstName).to.equal('Jessy');
          expect(res.body.data.user.lastName).to.equal('Sanders');
          expect(res.body.data.user.aboutMe).to.equal(null);
          expect(res.body.data.user.userImage).to.equal('user.image.url');
          expect(res.body.data.user.notifications).to.equal(false);
          done();
        });
    });
  });
});
