import 'mocha';
import chai from 'chai';
import supertest from 'supertest';

import app from '../server/app';
import {
  validSignupSeed,
  invalidSignupSeed,
  validSigninSeed,
  invalidSigninSeed,
  validUserSeed
} from './__mockData__/user';

const server = supertest.agent(app);
const expect = chai.expect;
const userToken = [];
let userId1;

describe('More-Recipes user test', () => {
  describe('Test Server Connection', () => {
    it('status code 200', (done) => {
      server
        .get('/api/v1/swagger.json')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect('Content-Type', 'application/json');
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
          userId1 = res.body.data.user.id;
          expect(res.statusCode).to.equal(201);
          expect(res.body.status).to.equal('Success');
          expect(res.body.message).to.equal('User created');
          expect(res.body.data.user.username).to.equal('scotch');
          expect(res.body.data.user.fullName).to.equal('John Scotch');
          expect(res.body.data.user.email).to.equal('scotch@example.com');
          expect(res.body.data.user.notifications).to.equal(false);
          expect(res.body.data.user.token).to.be.a('string');
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
          expect(res.body.data.user.username).to.equal('jessy');
          expect(res.body.data.user.fullName).to.equal('Jessy Sanders');
          expect(res.body.data.user.email).to.equal('jessy@example.com');
          expect(res.body.data.user.notifications).to.equal(false);
          expect(res.body.data.user.token).to.be.a('string');
          done();
        });
    });
    it('should allow another user to create an account', (done) => {
      server
        .post('/api/v1/users/signup')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(validSignupSeed[3])
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body.status).to.equal('Success');
          expect(res.body.message).to.equal('User created');
          expect(res.body.data.user.username).to.equal('francis');
          expect(res.body.data.user.fullName).to.equal('Francis Johnson');
          expect(res.body.data.user.email).to.equal('francis@example.com');
          expect(res.body.data.user.notifications).to.equal(false);
          expect(res.body.data.user.token).to.be.a('string');
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
    it('should return 400 for empty first name', (done) => {
      server
        .post('/api/v1/users/signup')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(invalidSignupSeed[3])
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.message).to.equal('First name required');
          done();
        });
    });
    it('should return 400 for empty last name', (done) => {
      server
        .post('/api/v1/users/signup')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(invalidSignupSeed[4])
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.message).to.equal('Last name required');
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
          expect('Content-Type', 'application/json');
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
          userToken[0] = res.body.data.user.token;
          expect('Content-Type', 'application/json');
          expect(res.statusCode).to.equal(200);
          expect(res.body.status).to.equal('Success');
          expect(res.body.message).to.equal('User logged in');
          expect(res.body.data.user.fullName).to.equal('Jessy Sanders');
          expect(res.body.data.user.userImage).to.equal(null);
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
    it('should allow another user to login', (done) => {
      server
        .post('/api/v1/users/signin')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(validSigninSeed[2])
        .end((err, res) => {
          userToken[2] = res.body.data.user.token;
          expect('Content-Type', 'application/json');
          expect(res.statusCode).to.equal(200);
          expect(res.body.status).to.equal('Success');
          expect(res.body.message).to.equal('User logged in');
          expect(res.body.data.user.fullName).to.equal('Francis Johnson');
          expect(res.body.data.user.userImage).to.equal(null);
          expect(res.body.data.user.token).to.be.a('string');
          done();
        });
    });
  });
  describe('retrieve user profile api', () => {
    it('should allow users to retrieve profile of users', (done) => {
      server
        .get(`/api/v1/users/${userId1}`)
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', userToken[0])
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.status).to.equal('Success');
          expect(res.body.message).to.equal('User profile retrieved');
          expect(res.body.data.user.username).to.equal('scotch');
          expect(res.body.data.user.fullName).to.equal('John Scotch');
          expect(res.body.data.user.firstName).to.equal('John');
          expect(res.body.data.user.lastName).to.equal('Scotch');
          expect(res.body.data.user.email).to.equal('scotch@example.com');
          expect(res.body.data.user.userImage).to.equal(null);
          expect(res.body.data.user.aboutMe).to.equal(null);
          expect(res.body.data.user.notifications).to.equal(false);
          done();
        });
    });
    it('should return 400 if the userId parameter is not integer', (done) => {
      server
        .get('/api/v1/users/userId1')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', userToken[0])
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.status).to.equal('Error in parameter');
          done();
        });
    });
  });
  describe('edit user profile API', () => {
    it('should allow a user to edit his/her profile details', (done) => {
      server
        .put('/api/v1/users')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', userToken[1])
        .set('Content-Type', 'application/json')
        .type('form')
        .send(validUserSeed[0])
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.message).to.equal('User profile updated');
          expect(res.body.data.user.firstName).to.equal('John');
          expect(res.body.data.user.lastName).to.equal('Scotch');
          expect(res.body.data.user.aboutMe).to.equal('This is my bio');
          expect(res.body.data.user.userImage).to.equal(null);
          expect(res.body.data.user.notifications).to.equal(false);
          done();
        });
    });
    it('should allow a user to update his/her profile image', (done) => {
      server
        .put('/api/v1/users')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', userToken[0])
        .set('Content-Type', 'application/json')
        .type('form')
        .send(validUserSeed[1])
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
