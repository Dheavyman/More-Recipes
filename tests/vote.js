import 'mocha';
import chai from 'chai';
import supertest from 'supertest';

import app from '../server/app';
import { validSigninSeed } from './__mockData__/user';
import { validRecipeSeed } from './__mockData__/recipes';

const server = supertest.agent(app);
const expect = chai.expect;
const userToken = [];
let recipeId2;

describe('More Recipes', () => {
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
    it('should allow logged in user to post another recipe', (done) => {
      server
        .post('/api/v1/recipes')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', userToken[1])
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
  describe('vote recipe API', () => {
    it('should allow a user to upvote a recipe', (done) => {
      server
        .put(`/api/v1/recipes/${recipeId2}/upvotes`)
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', userToken[0])
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.status).to.equal('Success');
          expect(res.body.message).to.equal('Upvote recorded');
          expect(res.body.data).to.have.a.property('upvotes').that.equals(1);
          expect(res.body.data).to.have.a.property('downvotes').that.equals(0);
          done();
        });
    });
    it('should allow a user to downvote a recipe', (done) => {
      server
        .put(`/api/v1/recipes/${recipeId2}/downvotes`)
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', userToken[1])
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.status).to.equal('Success');
          expect(res.body.message).to.equal('Downvote recorded');
          expect(res.body.data).to.have.a.property('upvotes').that.equals(1);
          expect(res.body.data).to.have.a.property('downvotes').that.equals(1);
          done();
        });
    });
    it('should allow a user to downvote a recipe previously upvoted',
      (done) => {
        server
          .put(`/api/v1/recipes/${recipeId2}/downvotes`)
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('x-access-token', userToken[0])
          .set('Content-Type', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body.status).to.equal('Success');
            expect(res.body.message).to
              .equal('Downvote recorded and upvote removed');
            expect(res.body.data).to.have.a.property('upvotes').that.equals(0);
            expect(res.body.data).to.have.a.property('downvotes').that
              .equals(2);
            done();
          });
      });
    it('should allow a user to remove his/her vote', (done) => {
      server
        .put(`/api/v1/recipes/${recipeId2}/downvotes`)
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', userToken[0])
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.status).to.equal('Success');
          expect(res.body.message).to.equal('Downvote removed');
          expect(res.body.data).to.have.a.property('upvotes').that.equals(0);
          expect(res.body.data).to.have.a.property('downvotes').that.equals(1);
          done();
        });
    });
    it('should allow a user to upvote a recipe previously downvoted',
      (done) => {
        server
          .put(`/api/v1/recipes/${recipeId2}/upvotes`)
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('x-access-token', userToken[1])
          .set('Content-Type', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body.status).to.equal('Success');
            expect(res.body.message).to
              .equal('Upvote recorded and downvote removed');
            expect(res.body.data).to.have.a.property('upvotes').that.equals(1);
            expect(res.body.data).to.have.a.property('downvotes').that
              .equals(0);
            done();
          });
      });
    it('should allow a user to remove his/her vote', (done) => {
      server
        .put(`/api/v1/recipes/${recipeId2}/upvotes`)
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', userToken[1])
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.status).to.equal('Success');
          expect(res.body.message).to.equal('Upvote removed');
          expect(res.body.data).to.have.a.property('upvotes').that.equals(0);
          expect(res.body.data).to.have.a.property('downvotes').that.equals(0);
          done();
        });
    });
    it('should return 404 for attempt to upvote a recipe that doesn\'t exist',
      (done) => {
        server
          .put(`/api/v1/recipes/${410}/upvotes`)
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
    it('should return 404 for attempt to downvote a recipe that doesn\'t exist',
      (done) => {
        server
          .put(`/api/v1/recipes/${250}/downvotes`)
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
