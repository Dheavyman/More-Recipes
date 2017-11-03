import 'mocha';
import chai from 'chai';
import supertest from 'supertest';
import app from '../server/app';

const server = supertest.agent(app),
  expect = chai.expect,
  validSignupSeed = [{
    username: 'Scotch',
    password: 'scotchpassword',
    email: 'scotch@example.com',
    firstName: 'John',
    lastName: 'Scoth',
    gender: 'Male'
  }, {
    username: 'Jessy',
    password: 'jessypassword',
    email: 'jessy@example.com',
    firstName: 'Jessy',
    lastName: 'Sanders',
    gender: 'Female'
  }, {
    username: 'Vincent',
    password: 'vincentpassword',
    email: 'scotch@example.com',
    firstName: 'Vincent',
    lastName: 'Cross',
    gender: 'Male'
  }],
  invalidSignupSeed = [{
    username: '  ',
    password: 'awesome',
    email: '@example.com',
    firstName: 'Alex',
    lastName: 'Scotch',
    gender: 'Male'
  }, {
    username: 'Paul',
    password: '  ',
    email: 'paul@example.com',
    firstName: 'Paul',
    lastName: 'Sunders',
    gender: 'male'
  }, {
    username: 'Paul',
    password: 'awesome',
    email: '   ',
    firstName: 'Paul',
    lastName: 'Sunders',
    gender: 'male'
  }, {
    username: 'Paul',
    password: 'awesome',
    email: 'paul@example.com',
    firstName: '   ',
    lastName: 'Sunders',
    gender: 'male'
  }, {
    username: 'Paul',
    password: 'awesome',
    email: 'paul@example.com',
    firstName: 'Paul',
    lastName: '  ',
    gender: 'male'
  }, {
    username: 'Paul',
    password: 'awesome',
    email: 'paul@example.com',
    firstName: 'Paul',
    lastName: 'Sunders',
    gender: '   '
  }, {
    username: 'Paul#',
    password: 'awesome',
    email: 'paul@example.com',
    firstName: 'Paul',
    lastName: 'Sunders',
    gender: 'male'
  }, {
    username: 'paul',
    password: 'awesome',
    email: 'paulexample.com',
    firstName: 'Paul',
    lastName: 'Sunders',
    gender: 'male'
  }],
  validSigninSeed = [{
    username: 'Jessy',
    password: 'jessypassword',
  }, {
    username: 'scotch',
    password: 'scotchpassword',
  }],
  invalidSigninSeed = [{
    username: '  ',
    password: 'jessypassword',
  }, {
    username: 'Jessy',
    password: '   ',
  }, {
    username: 'notJessy',
    password: 'jessypassword',
  }, {
    username: 'Jessy',
    password: 'notjessypassword',
  }],
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
  }],
  userToken = [];
let userId1,
  userId2,
  recipeId1,
  recipeId2,
  reviewId1,
  reviewId2;

describe('More Recipes', () => {
  describe('Test Server Connection', () => {
    it('should respond with welcome message and status code 200', (done) => {
      server
        .get('/api/v1')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect('Content-Type', /json/);
          expect(res.body.message).to.equal('Welcome to the Users API!');
          expect(res.statusCode).to.equal(200);
          done();
        });
    });
  });
  describe('signup API', () => {
    it('should allow user to create an account', (done) => {
      server
        .post('/api/v1/users/signup')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(validSignupSeed[0])
        .end((err, res) => {
          userId1 = res.body.userId;
          expect(res.statusCode).to.equal(201);
          expect(res.body.status).to.equal('Success');
          expect(res.body.message).to.equal('User created');
          done();
        });
    });
    it('should return 409 for an existing username', (done) => {
      server
        .post('/api/v1/users/signup')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(validSignupSeed[0])
        .end((err, res) => {
          expect(res.statusCode).to.equal(409);
          expect(res.body.status).to.equal('Fail');
          expect(res.body.message).to.equal('Username already exist');
          done();
        });
    });
    it('should return 409 for an existing email', (done) => {
      server
        .post('/api/v1/users/signup')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(validSignupSeed[2])
        .end((err, res) => {
          expect(res.statusCode).to.equal(409);
          expect(res.body.status).to.equal('Fail');
          expect(res.body.message).to.equal('Email already exist');
          done();
        });
    });
    it('should allow another user to create an account', (done) => {
      server
        .post('/api/v1/users/signup')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(validSignupSeed[1])
        .end((err, res) => {
          userId2 = res.body.userId;
          expect(res.statusCode).to.equal(201);
          expect(res.body.status).to.equal('Success');
          expect(res.body.message).to.equal('User created');
          done();
        });
    });
    it('should return 400 for empty username', (done) => {
      server
        .post('/api/v1/users/signup')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(invalidSignupSeed[0])
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.message).to.equal('Username required');
          done();
        });
    });
    it('should return 400 for empty password', (done) => {
      server
        .post('/api/v1/users/signup')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(invalidSignupSeed[1])
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.message).to.equal('Password required');
          done();
        });
    });
    it('should return 400 for empty email', (done) => {
      server
        .post('/api/v1/users/signup')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(invalidSignupSeed[2])
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.message).to.equal('Email required');
          done();
        });
    });
    it('should return 400 for empty firstname', (done) => {
      server
        .post('/api/v1/users/signup')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(invalidSignupSeed[3])
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.message).to.equal('Firstname required');
          done();
        });
    });
    it('should return 400 for empty lastname', (done) => {
      server
        .post('/api/v1/users/signup')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(invalidSignupSeed[4])
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.message).to.equal('Lastname required');
          done();
        });
    });
    it('should return 400 for empty gender', (done) => {
      server
        .post('/api/v1/users/signup')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(invalidSignupSeed[5])
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.message).to.equal('Gender required');
          done();
        });
    });
    it('should return 400 for invalid username', (done) => {
      server
        .post('/api/v1/users/signup')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(invalidSignupSeed[6])
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.message).to
            .equal('Invalid username, only alphabets and numbers allowed');
          done();
        });
    });
    it('should return 400 for invalid email', (done) => {
      server
        .post('/api/v1/users/signup')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(invalidSignupSeed[7])
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.message).to
            .equal('Invalid email address format');
          done();
        });
    });
  });
  describe('signin API', () => {
    it('should return 400 for empty username', (done) => {
      server
        .post('/api/v1/users/signin')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(invalidSigninSeed[0])
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
          expect(res.body.message).to.equal('Username required');
          done();
        });
    });
    it('should return 400 for empty password', (done) => {
      server
        .post('/api/v1/users/signin')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(invalidSigninSeed[1])
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
          expect(res.body.message).to.equal('Password required');
          done();
        });
    });
    it('should return 401 for invalid username', (done) => {
      server
        .post('/api/v1/users/signin')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(invalidSigninSeed[2])
        .end((err, res) => {
          expect('Content-Type', 'applicaton/json');
          expect(res.statusCode).to.equal(401);
          expect(res.body.status).to.equal('Fail');
          expect(res.body.message).to
            .equal('User does not exist');
          done();
        });
    });
    it('should return 401 for invalid password', (done) => {
      server
        .post('/api/v1/users/signin')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(invalidSigninSeed[3])
        .end((err, res) => {
          expect('Content-Type', 'application/json');
          expect(res.statusCode).to.equal(401);
          expect(res.body.status).to.equal('Fail');
          expect(res.body.message).to.equal('Invalid password');
          done();
        });
    });
    it('should allow a user to login', (done) => {
      server
        .post('/api/v1/users/signin')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(validSigninSeed[0])
        .end((err, res) => {
          userToken[0] = res.body.token;
          expect('Content-Type', 'application/json');
          expect(res.statusCode).to.equal(200);
          expect(res.body.status).to.equal('Success');
          expect(res.body.message).to.equal('Login successful');
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
          userToken[1] = res.body.token;
          expect('Content-Type', 'application/json');
          expect(res.statusCode).to.equal(200);
          expect(res.body.status).to.equal('Success');
          expect(res.body.message).to.equal('Login successful');
          done();
        });
    });
  });
  describe('add recipe API', () => {
    it('should return 403 for unauthenticated access', (done) => {
      server
        .post('/api/v1/recipes')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', '')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(validRecipeSeed[0])
        .end((err, res) => {
          expect(res.statusCode).to.equal(403);
          expect(res.body.status).to.equal('Fail');
          expect(res.body.message).to
            .equal('Unauthenticated access, no token provided');
          done();
        });
    });
    it('should return 403 for unverified token', (done) => {
      server
        .post('/api/v1/recipes')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', 'abc.123.xyz')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(validRecipeSeed[0])
        .end((err, res) => {
          expect(res.statusCode).to.equal(403);
          expect(res.body).to.have.a.property('message');
          expect(res.body.message).to.equal('Invalid token');
          done();
        });
    });
    it('should allow a user to add a recipe', (done) => {
      server
        .post('/api/v1/recipes')
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
        .post('/api/v1/recipes')
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
        .post('/api/v1/recipes')
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
        .post('/api/v1/recipes')
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
        .post('/api/v1/recipes')
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
        .post('/api/v1/recipes')
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
        .post('/api/v1/recipes')
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
        .put(`/api/v1/recipes/${recipeId1}`)
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
          .put(`/api/v1/recipes/${500}`)
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
          .get('/api/v1/recipes')
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
          .get(`/api/v1/recipes/${recipeId2}`)
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
          .get(`/api/v1/recipes/${250}`)
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
        .delete(`/api/v1/recipes/${recipeId2}`)
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
          .delete(`/api/v1/recipes/${5000}`)
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
        .post(`/api/v1/recipes/${recipeId1}/reviews`)
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
        .post(`/api/v1/recipes/${recipeId1}/reviews`)
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
        .post(`/api/v1/recipes/${recipeId1}/reviews`)
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
          .post(`/api/v1/recipes/${400}/reviews`)
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
        .delete(`/api/v1/recipes/${recipeId1}/reviews/${reviewId1}`)
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
          .delete(`/api/v1/recipes/${recipeId1}/reviews/${1000}`)
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
          .delete(`/api/v1/recipes/${150}/reviews/${reviewId2}`)
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
        .get(`/api/v1/recipes/${recipeId1}`)
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
        .put(`/api/v1/recipes/${recipeId1}/upvote`)
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
        .put(`/api/v1/recipes/${recipeId1}/downvote`)
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
          .put(`/api/v1/recipes/${410}/upvote`)
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
          .put(`/api/v1/recipes/${250}/downvote`)
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
  describe('retrieve recipe API', () => {
    it('should allow user get recipes with most upvotes in descending order',
      (done) => {
        server
          .get('/api/v1/recipes?sort=upvotes&order=descending')
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body.status).to.equal('Success');
            expect(res.body.sortedRecipes).to.be.an('array');
            if (err) return done(err);
            done();
          });
      });
    it('should return 404 for unmatched query strings', (done) => {
      server
        .get('/api/v1/recipes?sort=upvotes&match=unordered')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body.message).to.equal('Oops! 404. Page not Found');
          if (err) return done(err);
          done();
        });
    });
    it('should return 404 for unmatched query strings', (done) => {
      server
        .get('/api/v1/recipes?sort=upvotes&order=unordered')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body.message).to.equal('Oops! 404. Page not Found');
          if (err) return done(err);
          done();
        });
    });
  });
});
