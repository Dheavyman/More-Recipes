import swaggerJSDoc from 'swagger-jsdoc';


const swaggerDefinition = {
  info: {
    title: 'More-Recipes API',
    version: '1.0.0',
    description: 'Documentation of more-recipes RESTful API',
  },
  host: process.env.HOST_URL,
  basePath: '/api/v1',
};

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: ['./server/routes/*.js'],
};

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
