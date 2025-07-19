import swaggerJsdoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'RCIC Backend API',
    version: '1.0.0',
    description: 'Auto‑generated API docs for all endpoints',
  },
  servers: [
    { url: `http://localhost:${process.env.PORT || 5100}`, description: 'Local dev' },
  ],
};

export const swaggerSpec = swaggerJsdoc({
  swaggerDefinition,
  apis: [
    './src/routes/*.ts',        // your route JSDoc comments
    './src/controllers/*.ts',   // controller JSDoc if you annotate there
  ],
});
