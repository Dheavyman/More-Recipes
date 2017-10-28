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
  }],
  invalidRecipeSeed = [{
    title: '   ',
    description: 'Served white and colourful',
    preparationTime: '50',
    ingredients: 'Yam, tomatoes, egg, salt, maggi, pepper',
    directions: 'Slice the yam and prepare the sauce',
  }, {
    title: 'Yam sauce',
    description: '   ',
    preparationTime: '50',
    ingredients: 'Yam, tomatoes, egg, salt, maggi, pepper',
    directions: 'Slice the yam and prepare the sauce',
  }, {
    title: 'Yam sauce',
    description: 'Served white and colourful',
    preparationTime: '  ',
    ingredients: 'Yam, tomatoes, egg, salt, maggi, pepper',
    directions: 'Slice the yam and prepare the sauce',
  }, {
    title: 'Yam sauce',
    description: 'Served white and colourful',
    preparationTime: '50',
    ingredients: '   ',
    directions: 'Slice the yam and prepare the sauce',
  }, {
    title: 'Yam sauce',
    description: 'Served white and colourful',
    preparationTime: '50',
    ingredients: 'Yam, tomatoes, egg, salt, maggi, pepper',
    directions: '   ',
  }],
  validReviewSeed = [{
    content: 'A nice recipe idea',
  }, {
    content: 'I added spinach and it was wonderful',
  }],
  invalidReviewSeed = [{
    content: '  ',
  }];
let recipeId1,
  recipeId2,
  reviewId1,
  reviewId2;

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
          recipeId1 = res.body.recipe.id;
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
          recipeId2 = res.body.recipe.id;
          expect(res.statusCode).to.equal(201);
          expect(res.body.status).to.equal('Success');
          expect(res.body.message).to.equal('Recipe added successfully');
          if (err) return done(err);
          done();
        });
    });
    it('should return 406 for an empty title', (done) => {
      server
        .post('/api/recipes')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(invalidRecipeSeed[0])
        .end((err, res) => {
          expect(res.statusCode).to.equal(406);
          expect(res.body.status).to.equal('Fail');
          expect(res.body.message).to.equal('Title cannot be empty');
          if (err) return done(err);
          done();
        });
    });
    it('should return 406 for empty description', (done) => {
      server
        .post('/api/recipes')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(invalidRecipeSeed[1])
        .end((err, res) => {
          expect(res.statusCode).to.equal(406);
          expect(res.body.status).to.equal('Fail');
          expect(res.body.message).to.equal('Description cannot be empty');
          if (err) return done(err);
          done();
        });
    });
    it('should return 406 for empty preparation time', (done) => {
      server
        .post('/api/recipes')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(invalidRecipeSeed[2])
        .end((err, res) => {
          expect(res.statusCode).to.equal(406);
          expect(res.body.status).to.equal('Fail');
          expect(res.body.message).to.equal('Preparation time cannot be empty');
          if (err) return done(err);
          done();
        });
    });
    it('should return 406 for empty ingredients', (done) => {
      server
        .post('/api/recipes')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(invalidRecipeSeed[3])
        .end((err, res) => {
          expect(res.statusCode).to.equal(406);
          expect(res.body.status).to.equal('Fail');
          expect(res.body.message).to.equal('Ingredients cannot be empty');
          if (err) return done(err);
          done();
        });
    });
    it('should return 406 for empty directions', (done) => {
      server
        .post('/api/recipes')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(invalidRecipeSeed[4])
        .end((err, res) => {
          expect(res.statusCode).to.equal(406);
          expect(res.body.status).to.equal('Fail');
          expect(res.body.message).to.equal('Directions cannot be empty');
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
          expect(res.body.recipe.description).to
            .equal('Tasty and nutricious beans');
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
    it('should return 404 for attempt to get a recipe that doesn\'t exist',
      (done) => {
        server
          .get(`/api/recipes/${250}`)
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(404);
            expect(res.body.status).to.equal('Fail');
            expect(res.body.message).to.equal('Recipe not found');
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
  describe('review recipe API', () => {
    it('should allow a user add a review for a recipe', (done) => {
      server
        .post(`/api/recipes/${recipeId1}/reviews`)
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(validReviewSeed[0])
        .end((err, res) => {
          reviewId1 = res.body.review.id;
          expect(res.statusCode).to.equal(201);
          expect(res.body.status).to.equal('Success');
          expect(res.body.message).to.equal('Review added successfully');
          expect(res.body.review).to.be.an('object');
          if (err) return done(err);
          done();
        });
    });
    it('should allow a user add a review for a recipe', (done) => {
      server
        .post(`/api/recipes/${recipeId1}/reviews`)
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(validReviewSeed[1])
        .end((err, res) => {
          reviewId2 = res.body.review.id;
          expect(res.statusCode).to.equal(201);
          expect(res.body.status).to.equal('Success');
          expect(res.body.message).to.equal('Review added successfully');
          expect(res.body.review).to.be.an('object');
          if (err) return done(err);
          done();
        });
    });
    it('should return 406 for empty content', (done) => {
      server
        .post(`/api/recipes/${recipeId1}/reviews`)
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(invalidReviewSeed[0])
        .end((err, res) => {
          expect(res.statusCode).to.equal(406);
          expect(res.body.status).to.equal('Fail');
          expect(res.body.message).to.equal('Content cannot be empty');
          if (err) return done(err);
          done();
        });
    });
    it('should return 404 for attempt to review a recipe that doesn\'t exist',
      (done) => {
        server
          .post(`/api/recipes/${400}/reviews`)
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .type('form')
          .send(validReviewSeed[0])
          .end((err, res) => {
            expect(res.statusCode).to.equal(404);
            expect(res.body.status).to.equal('Fail');
            expect(res.body.message).to.equal('Recipe not found');
            if (err) return done(err);
            done();
          });
      });
    it('should allow a user to delete a review', (done) => {
      server
        .delete(`/api/recipes/${recipeId1}/reviews/${reviewId1}`)
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.status).to.equal('Success');
          expect(res.body.message).to.equal('Review deleted successfully');
          if (err) return done(err);
          done();
        });
    });
    it('should return 404 for attempt to delete a review that doesn\'t exist',
      (done) => {
        server
          .delete(`/api/recipes/${recipeId1}/reviews/${1000}`)
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(404);
            expect(res.body.status).to.equal('Fail');
            expect(res.body.message).to.equal('Review not found');
            if (err) return done(err);
            done();
          });
      });
    it('should return 404 for attempt to delete a review that doesn\'t exist',
      (done) => {
        server
          .delete(`/api/recipes/${150}/reviews/${reviewId2}`)
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(404);
            expect(res.body.status).to.equal('Fail');
            expect(res.body.message).to.equal('Review not found');
            if (err) return done(err);
            done();
          });
      });
  });
  describe('get single recipe API', () => {
    it('should return recipe with its reviews', (done) => {
      server
        .get(`/api/recipes/${recipeId1}`)
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
  describe('vote recipe API', () => {
    it('should allow a user to upvote a recipe', (done) => {
      server
        .put(`/api/recipes/${recipeId1}/upvote`)
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.status).to.equal('Success');
          expect(res.body.message).to.equal('Upvote recorded');
          if (err) return done(err);
          done();
        });
    });
    it('should allow a user to downvote a recipe', (done) => {
      server
        .put(`/api/recipes/${recipeId1}/downvote`)
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.status).to.equal('Success');
          expect(res.body.message).to.equal('Downvote recorded');
          if (err) return done(err);
          done();
        });
    });
    it('should return 404 for attempt to upvote a recipe that doesn\'t exist',
      (done) => {
        server
          .put(`/api/recipes/${410}/upvote`)
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(404);
            expect(res.body.status).to.equal('Fail');
            expect(res.body.message).to.equal('Recipe not found');
            if (err) return done(err);
            done();
          });
      });
    it('should return 404 for attempt to upvote a recipe that doesn\'t exist',
      (done) => {
        server
          .put(`/api/recipes/${250}/downvote`)
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
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
