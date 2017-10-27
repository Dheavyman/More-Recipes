import 'mocha';
import chai from 'chai';
import supertest from 'supertest';
import app from '../app';

const server = supertest.agent(app),
  expect = chai.expect,
  validRecipeSeed = [{
    title: 'Beans',
    description: 'Tasty beans',
    preparationTime: '65',
    ingredients: 'Beans, red oil, onion, salt, maggi, pepper',
    directions: 'Cook the beans and add the ingredients',
  }, {
    title: 'Yam sauce',
    description: 'Served white and colourful',
    preparationTime: '50',
    ingredients: 'Yam, tomatoes, egg, salt, maggi, pepper',
    directions: 'Slice the yam and prepare the sauce',
  }, {
    title: 'Beans',
    description: 'Tasty and nutricious beans',
    preparationTime: '80',
    ingredients: 'Beans, red oil, onion, salt, maggi, pepper',
    directions: 'Cook the beans and add the ingredients',
  }];
let recipeId1,
  recipeId2;

describe('More Recipes', () => {
  describe('add recipe API', () => {
    it('should allow a user to add a recipe', (done) => {
      server
        .post('/api/recipes')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(validRecipeSeed[0])
        .end((err, res) => {
          recipeId1 = res.body.recipeId;
          expect(res.statusCode).to.equal(201);
          expect(res.body.status).to.equal('Success');
          expect(res.body.message).to.equal('Recipe added successfully');
          if (err) return done(err);
          done();
        });
    });
    it('should allow a user to add another recipe', (done) => {
      server
        .post('/api/recipes')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(validRecipeSeed[1])
        .end((err, res) => {
          recipeId2 = res.body.recipeId;
          expect(res.statusCode).to.equal(201);
          expect(res.body.status).to.equal('Success');
          expect(res.body.message).to.equal('Recipe added successfully');
          if (err) return done(err);
          done();
        });
    });
  });
  describe('modify recipe API', () => {
    it('should allow a user to modify a recipe', (done) => {
      server
        .put(`/api/recipes/${recipeId1}`)
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(validRecipeSeed[2])
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body.status).to.equal('Success');
          expect(res.body.message).to.equal('Recipe modified successfully');
          expect(res.body.description).to.equal('Tasty and nutricious beans');
          if (err) return done(err);
          done();
        });
    });
    it('should return 404 for attempt to modify a recipe that doesn\'t exist',
      (done) => {
        server
          .put(`/api/recipes/${500}`)
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .type('form')
          .send(validRecipeSeed[2])
          .end((err, res) => {
            expect(res.statusCode).to.equal(404);
            expect(res.body.status).to.equal('Fail');
            expect(res.body.message).to.equal('Recipe not found');
            if (err) return done(err);
            done();
          });
      });
  });
  describe('retrieve recipe API', () => {
    it('should allow a user to get all the recipes in the catalog',
      (done) => {
        server
          .get('/api/recipes')
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body.recipes).to.be.an('array');
            if (err) return done(err);
            done();
          });
      });
    it('should allow a user to get a single recipe in the catalog',
      (done) => {
        server
          .get(`/api/recipes/${recipeId2}`)
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body.recipe).to.be.an('object');
            if (err) return done(err);
            done();
          });
      });
  });
  describe('delete recipe API', () => {
    it('should allow a user to delete a recipe', (done) => {
      server
        .delete(`/api/recipes/${recipeId2}`)
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .type('form')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.status).to.equal('Success');
          expect(res.body.message).to.equal('Recipe deleted successfully');
          if (err) return done(err);
          done();
        });
    });
    it('should return 404 for attempt to delete a recipe that doesn\'t exist',
      (done) => {
        server
          .delete(`/api/recipes/${5000}`)
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .type('form')
          .end((err, res) => {
            expect(res.statusCode).to.equal(404);
            expect(res.body.status).to.equal('Fail');
            expect(res.body.message).to.equal('Recipe not found');
            if (err) return done(err);
            done();
          });
      });
  });
});
