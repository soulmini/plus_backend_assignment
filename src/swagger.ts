import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Project Management API Docs',
      version: '1.0.0',
      description: 'This API provides endpoints for managing projects, timesheets, and employees within an organization. It includes functionality for creating, reading, updating, and deleting projects and timesheets. Additionally, it supports user authentication with JWT and offers detailed documentation for all available routes and operations.',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT authorization header using the Bearer scheme. Example: "Authorization: Bearer {token}"',
        },
      },
    },
  },
  apis: ['./src/swaggers/*.ts', './src/swaggers/authSwagger/*.ts', './src/swaggers/routesSwagger/*.ts'], // Path to your API files
};

const specs = swaggerJsdoc(options);

const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
    explorer: true, 
  }));
};

export default setupSwagger;
