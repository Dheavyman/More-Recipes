import 'mocha';
import chai from 'chai';
import supertest from 'supertest';
import app from '../app';

const server = supertest.agent(app),
  expect = chai.expect,
  validRecipeSeed = [{
    title: 'Yam sauce',
    description: 'Served white and colourful',
    preparationTime: '50',
    ingredients: 'Yam, tomatoes, egg, salt, maggi, pepper',
    directions: 'Slice the yam and prepare the sauce',
  }, {
    title: 'Beans',
    description: 'Tasty beans',
    preparationTime: '80',
    ingredients: 'Beans, red oil, onion, salt, maggi, pepper',
    directions: 'Cook the beans and add the ingredients',
  }, {
    title: 'Beans',
    description: 'Tasty and nutricious beans',
    preparationTime: '80',
    ingredients: 'Beans, red oil, onion, salt, maggi, pepper',
    directions: 'Cook the beans and add the ingredients',
  }];

describe('Add recive API', (done) => {
  it('should allow a user to add a recipe', () => {
    server
      .post('/api/recipes')
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(validRecipeSeed[0])
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body.status).to.equal('success');
        expect(res.body.message).to.equal('Recipe created successfully');
        if (err) return done(err);
        done();
      });
  });
});
