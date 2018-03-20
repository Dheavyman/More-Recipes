import 'mocha';
import chai from 'chai';
import supertest from 'supertest';
import jwt from 'jsonwebtoken';

import app from '../server/app';
import { validSigninSeed } from './__mockData__/user';
import { validRecipeSeed, userFavoriteCategory } from './__mockData__/recipes';

const server = supertest.agent(app);
const expect = chai.expect;
const userToken = [];
let userId1;
let recipeId1;
let recipeId2;

describe('More-Recipes favorite test', () => {
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
    it('should allow logged in user to post a recipe', (done) => {
      server
        .post('/api/v1/recipes')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', userToken[1])
        .set('Content-Type', 'application/json')
        .type('form')
        .send(validRecipeSeed[4])
        .end((err, res) => {
          recipeId1 = res.body.data.recipe.id;
          expect(res.statusCode).to.equal(201);
          expect(res.body.status).to.equal('Success');
          expect(res.body.message).to.equal('Recipe created');
          expect(res.body.data.recipe.title).to.equal('Yam sauce');
          expect(res.body.data.recipe.category).to.equal('Lunch');
          expect(res.body.data.recipe.description).to
            .equal('Served white and colorful');
          expect(res.body.data.recipe.preparationTime).to.equal(50);
          expect(res.body.data.recipe.ingredients).to
            .equal('Yam, tomatoes, vegetable oil, egg, salt, maggi, pepper');
          expect(res.body.data.recipe.directions).to
            .equal('Slice the yam and prepare the sauce');
          expect(res.body.data.recipe.recipeImage).to.equal('Url');
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
        .send(validRecipeSeed[5])
        .end((err, res) => {
          recipeId2 = res.body.data.recipe.id;
          expect(res.statusCode).to.equal(201);
          expect(res.body.status).to.equal('Success');
          expect(res.body.message).to.equal('Recipe created');
          expect(res.body.data.recipe.title).to.equal('Ogbono soup');
          expect(res.body.data.recipe.category).to.equal('Main');
          expect(res.body.data.recipe.description).to
            .equal('Tasty ogbono soup');
          expect(res.body.data.recipe.preparationTime).to.equal(60);
          expect(res.body.data.recipe.ingredients).to
            .equal('Ogbono, palm oil, salt, stock fish');
          expect(res.body.data.recipe.directions).to
            .equal('Do this, do this. do that');
          expect(res.body.data.recipe.recipeImage).to.equal('Ogbono URL');
          done();
        });
    });
  });
  describe('favorite recipe API', () => {
    it('should return 200 if a user has no favorite recipe', (done) => {
      server
        .get(`/api/v1/users/${userId1}/recipes`)
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', userToken[1])
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.status).to.equal('Success');
          expect(res.body.message).to.equal(
            'User has not favorited any recipe');
          done();
        });
    });
    it('should allow logged in user add a recipe to his/her favorites',
      (done) => {
        server
          .post(`/api/v1/recipes/${recipeId2}/favorites`)
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('x-access-token', userToken[0])
          .set('Content-Type', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(201);
            expect(res.body.status).to.equal('Success');
            expect(res.body.message).to.equal('Recipe added to favorites');
            expect(res.body.data.favorites).to.equal(1);
            done();
          });
      });
    it('should allow logged in user add another recipe to his/her favorites',
      (done) => {
        server
          .post(`/api/v1/recipes/${recipeId1}/favorites`)
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('x-access-token', userToken[0])
          .set('Content-Type', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(201);
            expect(res.body.status).to.equal('Success');
            expect(res.body.message).to.equal('Recipe added to favorites');
            expect(res.body.data.favorites).to.equal(1);
            done();
          });
      });
    it('should allow another logged in user add a recipe to his/her favorites',
      (done) => {
        server
          .post(`/api/v1/recipes/${recipeId2}/favorites`)
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('x-access-token', userToken[1])
          .set('Content-Type', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(201);
            expect(res.body.status).to.equal('Success');
            expect(res.body.message).to.equal('Recipe added to favorites');
            expect(res.body.data.favorites).to.equal(2);
            done();
          });
      });
    it('should return 404 while getting user favorites if user does not exist',
      (done) => {
        server
          .get(`/api/v1/users/${15}/recipes`)
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('x-access-token', userToken[0])
          .set('Content-Type', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(404);
            expect(res.body.status).to.equal('Fail');
            expect(res.body.message).to.equal('User does not exist');
            done();
          });
      });
    it('should allow logged in user to get all his/her favorite recipes',
      (done) => {
        server
          .get(`/api/v1/users/${userId1}/recipes`)
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('x-access-token', userToken[0])
          .set('Content-Type', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body.status).to.equal('Success');
            expect(res.body.message).to.equal('Favorites retrieved');
            expect(res.body.data.favorites).to.be.an('array');
            expect(res.body.data.favoritesCount).to.equal(2);
            done();
          });
      });
    it('should allow logged in user delete a recipe from his/her favorites',
      (done) => {
        server
          .post(`/api/v1/recipes/${recipeId2}/favorites`)
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('x-access-token', userToken[0])
          .set('Content-Type', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body.status).to.equal('Success');
            expect(res.body.message).to.equal('Recipe removed from favorites');
            done();
          });
      });
  });
  describe('create user favorite category API', () => {
    it('should allow a user to create category for user favorite recipes',
      (done) => {
        server
          .put(`/api/v1/users/recipes/${recipeId1}`)
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('x-access-token', userToken[0])
          .set('Content-Type', 'application/json')
          .send(userFavoriteCategory[0])
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body.status).to.equal('Success');
            expect(res.body.message).to.equal('Favorite recipe category added');
            done();
          });
      });
    it('should return 404 for a recipe not a users favorite', (done) => {
      server
        .put(`/api/v1/users/recipes/${recipeId2}`)
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', userToken[0])
        .set('Content-Type', 'application/json')
        .send(userFavoriteCategory[0])
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body.status).to.equal('Fail');
          expect(res.body.message).to.equal('Favorite recipe not found');
          done();
        });
    });
  });
  describe('test notification for favorite recipe', () => {
    it('should notify users when their favorite recipes get modified',
      (done) => {
        server
          .put(`/api/v1/recipes/${recipeId2}`)
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('x-access-token', userToken[0])
          .set('Content-Type', 'application/json')
          .type('form')
          .send(validRecipeSeed[4])
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body.status).to.equal('Success');
            expect(res.body.message).to.equal('Recipe modified');
            done();
          });
      });
  });
});
