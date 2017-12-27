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
  }, {
    username: 'Jessy',
    password: 'jessypassword',
    email: 'jessy@example.com',
    firstName: 'Jessy',
    lastName: 'Sanders',
  }, {
    username: 'Vincent',
    password: 'vincentpassword',
    email: 'scotch@example.com',
    firstName: 'Vincent',
    lastName: 'Cross',
  }],
  invalidSignupSeed = [{
    username: '  ',
    password: 'awesome',
    email: '@example.com',
    firstName: 'Alex',
    lastName: 'Scotch',
  }, {
    username: 'Paul',
    password: '  ',
    email: 'paul@example.com',
    firstName: 'Paul',
    lastName: 'Sunders',
  }, {
    username: 'Paul',
    password: 'awesome',
    email: '   ',
    firstName: 'Paul',
    lastName: 'Sunders',
  }, {
    username: 'Paul',
    password: 'awesome',
    email: 'paul@example.com',
    firstName: '   ',
    lastName: 'Sunders',
  }, {
    username: 'Paul',
    password: 'awesome',
    email: 'paul@example.com',
    firstName: 'Paul',
    lastName: '  ',
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
    category: 'Dessert',
    description: 'Tasty beans',
    preparationTime: 65,
    ingredients: 'Beans, red oil, onion, salt, maggi, pepper',
    directions: 'Cook the beans and add the ingredients',
    recipeImage: 'Url',
  }, {
    title: 'Yam sauce',
    category: 'Lunch',
    description: 'Served white and colourful',
    preparationTime: 50,
    ingredients: 'Yam, tomatoes, egg, salt, maggi, pepper',
    directions: 'Slice the yam and prepare the sauce',
    recipeImage: 'Url',
  }, {
    title: 'Beans',
    category: 'Appetizer',
    description: 'Tasty and nutricious beans',
    preparationTime: 80,
    ingredients: 'Beans, red oil, onion, salt, maggi, pepper',
    directions: 'Cook the beans and add the ingredients',
    recipeImage: 'Url',
  }, {
    title: 'Egusi soup',
    category: 'Dinner',
    description: 'Tasty and nutricious soup',
    preparationTime: 65,
    ingredients: 'Egusi, stock fish, red oil, onion, salt, maggi, pepper',
    directions: 'Cook the egusi and add the ingredients',
    recipeImage: 'Url',
  }, {
    title: 'Yam sauce',
    category: 'Lunch',
    description: 'Served white and colourful',
    preparationTime: 50,
    ingredients: 'Yam, tomatoes, vegetable oil, egg, salt, maggi, pepper',
    directions: 'Slice the yam and prepare the sauce',
    recipeImage: 'Url',
  }],
  invalidRecipeSeed = [{
    title: '   ',
    category: 'Lunch',
    description: 'Served white and colourful',
    preparationTime: 50,
    ingredients: 'Yam, tomatoes, egg, salt, maggi, pepper',
    directions: 'Slice the yam and prepare the sauce',
    recipeImage: 'Url',
  }, {
    title: 'Yam sauce',
    category: 'Breakfast',
    description: '   ',
    preparationTime: 50,
    ingredients: 'Yam, tomatoes, egg, salt, maggi, pepper',
    directions: 'Slice the yam and prepare the sauce',
    recipeImage: 'Url',
  }, {
    title: 'Yam sauce',
    category: 'Main',
    description: 'Served white and colourful',
    preparationTime: null,
    ingredients: 'Yam, tomatoes, egg, salt, maggi, pepper',
    directions: 'Slice the yam and prepare the sauce',
    recipeImage: 'Url',
  }, {
    title: 'Yam sauce',
    category: 'Dinner',
    description: 'Served white and colourful',
    preparationTime: 50,
    ingredients: '   ',
    directions: 'Slice the yam and prepare the sauce',
    recipeImage: 'Url',
  }, {
    title: 'Yam sauce',
    category: 'Breakfast',
    description: 'Served white and colourful',
    preparationTime: 50,
    ingredients: 'Yam, tomatoes, egg, salt, maggi, pepper',
    directions: '   ',
    recipeImage: 'Url',
  }, {
    title: 'Spaghetti',
    category: '  ',
    description: 'Served white and colourful',
    preparationTime: 50,
    ingredients: 'Yam, tomatoes, egg, salt, maggi, pepper',
    directions: 'Slice the yam and prepare the sauce',
    recipeImage: 'Url',
  }, {
    title: 'Spaghetti',
    category: 'Dinner',
    description: 'Served white and colourful',
    preparationTime: 50,
    ingredients: 'Yam, tomatoes, egg, salt, maggi, pepper',
    directions: 'Slice the yam and prepare the sauce',
    recipeImage: '   ',
  }],
  validReviewSeed = [{
    content: 'A nice recipe idea',
  }, {
    content: 'I added spinach and it was wonderful',
  }, {
    content: 'A very tasty recipe, so sweet',
  }],
  invalidReviewSeed = [{
    content: '  ',
  }],
  userFavoriteCategory = [{
    category: 'Lunch',
  }],
  userToken = [];
let userId1,
  recipeId1,
  recipeId2,
  recipeId3,
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
          userId1 = res.body.data.id;
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
    it('should return 400 for invalid username', (done) => {
      server
        .post('/api/v1/users/signup')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(invalidSignupSeed[5])
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
        .send(invalidSignupSeed[6])
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
          expect(res.statusCode).to.equal(400);
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
          expect(res.statusCode).to.equal(400);
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
            .equal('Username or password incorrect');
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
          expect(res.body.message).to.equal('Username or password incorrect');
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
          userToken[0] = res.body.data.token;
          expect('Content-Type', 'application/json');
          expect(res.statusCode).to.equal(200);
          expect(res.body.status).to.equal('Success');
          expect(res.body.message).to.equal('User logged in');
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
          userToken[1] = res.body.data.token;
          expect('Content-Type', 'application/json');
          expect(res.statusCode).to.equal(200);
          expect(res.body.status).to.equal('Success');
          expect(res.body.message).to.equal('User logged in');
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
          recipeId3 = res.body.data.recipe.id;
          expect(res.statusCode).to.equal(201);
          expect(res.body.status).to.equal('Success');
          expect(res.body.message).to.equal('Recipe created');
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
    it('should return 400 for an empty recipe image', (done) => {
      server
        .post('/api/v1/recipes')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', userToken[0])
        .set('Content-Type', 'application/json')
        .type('form')
        .send(invalidRecipeSeed[6])
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.status).to.equal('Fail');
          expect(res.body.message).to.equal('Recipe image cannot be empty');
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
          expect(res.body.data.recipe.description).to
            .equal('Tasty and nutricious beans');
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
  describe('favorite recipe API', () => {
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
            done();
          });
      });
    it('should allow logged in user add another recipe to his/her favorites',
      (done) => {
        server
          .post(`/api/v1/recipes/${recipeId3}/favorites`)
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('x-access-token', userToken[0])
          .set('Content-Type', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(201);
            expect(res.body.status).to.equal('Success');
            expect(res.body.message).to.equal('Recipe added to favorites');
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
            done();
          });
      });
    it('should allow logged in user delete a recipe from his/her favorites',
      (done) => {
        server
          .post(`/api/v1/recipes/${recipeId3}/favorites`)
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
          expect(res.body.message).to.equal('Vote removed');
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
          expect(res.body.message).to.equal('Vote removed');
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
            done();
          });
      });
    it('should return 404 for a searvh that has no match', (done) => {
      server
        .get('/api/v1/recipes?search=ingredients&list=meat')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body.message).to.equal('No recipe matched your search');
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
            expect(res.body.message).to.equal('Recipe(s) found');
            done();
          });
      });
    it('should return 404 for a search that has no match', (done) => {
      server
        .get('/api/v1/recipes?search=category&list=breakfast')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body.message).to.equal('No recipe matched your search');
          done();
        });
    });
  });
  describe('create user favorite category API', () => {
    it('should allow a user to create category for user favorite recipes',
      (done) => {
        server
          .put(`/api/v1/users/${userId1}/recipes/${recipeId2}`)
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('x-access-token', userToken[0])
          .set('Content-Type', 'application/json')
          .send(userFavoriteCategory[0])
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body.message).to.equal('Favorite recipe category added');
            done();
          });
      });
    it('should return 404 for a recipe not a users favorite', (done) => {
      server
        .put(`/api/v1/users/${userId1}/recipes/${recipeId3}`)
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', userToken[0])
        .set('Content-Type', 'application/json')
        .send(userFavoriteCategory[0])
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body.message).to.equal('Favorite recipe not found');
          done();
        });
    });
  });
  describe('opt-in and test notifications', () => {
    it('should allow a user to opt-in for notifications', (done) => {
      server
        .put('/api/v1/users/enable')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', userToken[0])
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.message).to.equal('Notifications enabled');
          done();
        });
    });
    it('should allow another user to opt-in for notifications', (done) => {
      server
        .put('/api/v1/users/enable')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', userToken[1])
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.message).to.equal('Notifications enabled');
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
          reviewId2 = res.body.data.id;
          expect(res.statusCode).to.equal(201);
          expect(res.body.status).to.equal('Success');
          expect(res.body.message).to.equal('Review created');
          done();
        });
    });
    it('should notify users when their favorite recipe get modified',
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
    it('should allow a user to opt-out for notifications', (done) => {
      server
        .put('/api/v1/users/disable')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', userToken[0])
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.message).to.equal('Notifications disabled');
          done();
        });
    });
  });
});
