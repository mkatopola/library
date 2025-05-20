const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/books.js', './routes/users.js'];

const doc = {
  swagger: '2.0',
  info: {
    title: 'Library Management API',
    description: 'API for managing books and users in a library system',
    version: '1.0.0'
  },
  host: process.env.HOST || 'localhost:3000',
  basePath: '/',
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    { name: 'Books', description: 'Book management endpoints' },
    { name: 'Users', description: 'User management endpoints' }
  ],
  components: {
    schemas: {
      Book: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          author: { type: 'string' },
          ISBN: { type: 'string' },
          genre: { type: 'string' },
          publicationYear: { type: 'number' },
          pageCount: { type: 'number' },
          availability: { type: 'boolean' }
        },
        required: ['title', 'author', 'ISBN']
      },
      User: {
        type: 'object',
        properties: {
          firstname: { type: 'string' },
          lastname: { type: 'string' },
          email: { type: 'string' }
        },
        required: ['firstname', 'lastname', 'email']
      }
    }
  }
};

swaggerAutogen(outputFile, endpointsFiles, doc);