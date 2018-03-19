import 'mocha';
import chai from 'chai';
import supertest from 'supertest';

import app from '../server/app';
import { validSigninSeed } from './__mockData__/user';
import { validRecipeSeed } from './__mockData__/recipes';
import { validReviewSeed, invalidReviewSeed } from './__mockData__/review';

const server = supertest.agent(app);
const expect = chai.expect;
const userToken = [];
let recipeId1;
let recipeId2;
let reviewId1;
let reviewId2;

describe('More-Recipes review test', () => {
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
    it('should allow logged in user to post another recipe', (done) => {
      server
        .post('/api/v1/recipes')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', userToken[0])
        .set('Content-Type', 'application/json')
        .type('form')
        .send(validRecipeSeed[3])
        .end((err, res) => {
          recipeId2 = res.body.data.recipe.id;
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
  });
  describe('review recipe API', () => {
    it('should allow logged in user to post a review for a recipe', (done) => {
      server
        .post(`/api/v1/recipes/${recipeId2}/reviews`)
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', userToken[0])
        .set('Content-Type', 'application/json')
        .type('form')
        .send(validReviewSeed[0])
        .end((err, res) => {
          reviewId1 = res.body.data.review.id;
          expect(res.statusCode).to.equal(201);
          expect(res.body.status).to.equal('Success');
          expect(res.body.message).to.equal('Review created');
          expect(res.body.data.review).to.be.an('object');
          expect(res.body.data.review).to.have.a.property('id');
          expect(res.body.data.review).to.have.a.property('userId');
          expect(res.body.data.review).to.have.a.property('User');
          expect(res.body.data.review.content).to.equal('A nice recipe idea');
          expect(res.body.data.review.recipeId).to.equal(recipeId2);
          expect(res.body.data.review.User.fullName).to.equal('Jessy Sanders');
          done();
        });
    });
    it('should allow another logged in user to post review for a recipe',
      (done) => {
        server
          .post(`/api/v1/recipes/${recipeId2}/reviews`)
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('x-access-token', userToken[1])
          .set('Content-Type', 'application/json')
          .type('form')
          .send(validReviewSeed[1])
          .end((err, res) => {
            reviewId2 = res.body.data.review.id;
            expect(res.statusCode).to.equal(201);
            expect(res.body.status).to.equal('Success');
            expect(res.body.message).to.equal('Review created');
            expect(res.body.data.review).to.be.an('object');
            expect(res.body.data.review).to.have.a.property('id');
            expect(res.body.data.review).to.have.a.property('userId');
            expect(res.body.data.review).to.have.a.property('User');
            expect(res.body.data.review.content).to
              .equal('I added spinach and it was wonderful');
            expect(res.body.data.review.recipeId).to.equal(recipeId2);
            expect(res.body.data.review.User.fullName).to.equal('John Scotch');
            done();
          });
      });
    it('should allow a user to retrieve recipe reviews', (done) => {
      server
        .get(`/api/v1/recipes/${recipeId2}/reviews`)
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', userToken[1])
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.status).to.equal('Success');
          expect(res.body.message).to.equal('Reviews retrieved');
          expect(res.body.data.reviewsCount).to.equal(2);
          done();
        });
    });
    it('should allow logged in user delete his/her review',
      (done) => {
        server
          .delete(`/api/v1/recipes/${recipeId2}/reviews/${reviewId1}`)
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('x-access-token', userToken[0])
          .set('Content-Type', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body.status).to.equal('Success');
            expect(res.body.message).to.equal('Review deleted');
            done();
          });
      });
    it('should return 400 if the reviewId parameter is not integer', (done) => {
      server
        .delete(`/api/v1/recipes/${recipeId2}/reviews/reviewId1`)
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', userToken[0])
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.status).to.equal('Error in parameter');
          expect(res.body).to.have.a.property('message');
          done();
        });
    });
    it('should return 403 if user tries to delete a review not his/hers',
      (done) => {
        server
          .delete(`/api/v1/recipes/${recipeId2}/reviews/${reviewId2}`)
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('x-access-token', userToken[0])
          .set('Content-Type', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(403);
            expect(res.body.status).to.equal('Fail');
            expect(res.body.message).to.equal('Not user\'s review');
            done();
          });
      });
    it('should return 404 for an attempts to delete a non-existing review',
      (done) => {
        server
          .delete(`/api/v1/recipes/${recipeId2}/reviews/${410}`)
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('x-access-token', userToken[0])
          .set('Content-Type', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(404);
            expect(res.body.status).to.equal('Fail');
            expect(res.body.message).to.equal('Review not found');
            done();
          });
      });
    it('should return 400 for empty content', (done) => {
      server
        .post(`/api/v1/recipes/${recipeId1}/reviews`)
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', userToken[0])
        .set('Content-Type', 'application/json')
        .type('form')
        .send(invalidReviewSeed[0])
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.status).to.equal('Fail');
          expect(res.body.message).to.equal('Content cannot be empty');
          done();
        });
    });
    it('should return 404 for attempt to review a recipe that doesn\'t exist',
      (done) => {
        server
          .post(`/api/v1/recipes/${400}/reviews`)
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('x-access-token', userToken[1])
          .set('Content-Type', 'application/json')
          .type('form')
          .send(validReviewSeed[0])
          .end((err, res) => {
            expect(res.statusCode).to.equal(404);
            expect(res.body.status).to.equal('Fail');
            expect(res.body.message).to.equal('Recipe not found');
            done();
          });
      });
    it('should return 404 for attempt to delete a review that doesn\'t exist',
      (done) => {
        server
          .delete(`/api/v1/recipes/${150}/reviews/${reviewId2}`)
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('x-access-token', userToken[1])
          .set('Content-Type', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(404);
            expect(res.body.status).to.equal('Fail');
            expect(res.body.message).to.equal('Recipe not found');
            done();
          });
      });
  });
});
