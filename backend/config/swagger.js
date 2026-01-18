const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'PERN Stack API',
      version: '1.0.0',
      description: 'RESTful API for PERN Stack CRUD Application with JWT Authentication',
      contact: {
        name: 'API Support',
      },
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 5000}`,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter JWT token obtained from /api/auth/login or /api/auth/register',
        },
      },
      schemas: {
        RegisterRequest: {
          type: 'object',
          required: ['username', 'email', 'password'],
          properties: {
            username: {
              type: 'string',
              minLength: 3,
              maxLength: 50,
              example: 'johndoe',
              description: 'Username (3-50 characters)',
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'john@example.com',
              description: 'Valid email address',
            },
            password: {
              type: 'string',
              minLength: 6,
              example: 'password123',
              description: 'Password (minimum 6 characters)',
            },
          },
        },
        LoginRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              example: 'john@example.com',
            },
            password: {
              type: 'string',
              example: 'password123',
            },
          },
        },
        AuthResponse: {
          type: 'object',
          properties: {
            token: {
              type: 'string',
              example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
              description: 'JWT token for authentication',
            },
            user: {
              type: 'object',
              properties: {
                id: {
                  type: 'integer',
                  example: 1,
                },
                username: {
                  type: 'string',
                  example: 'johndoe',
                },
                email: {
                  type: 'string',
                  example: 'john@example.com',
                },
              },
            },
          },
        },
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1,
            },
            username: {
              type: 'string',
              example: 'johndoe',
            },
            email: {
              type: 'string',
              example: 'john@example.com',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '2024-01-01T00:00:00.000Z',
            },
          },
        },
        Item: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1,
            },
            title: {
              type: 'string',
              maxLength: 100,
              example: 'My Item',
              description: 'Item title (max 100 characters)',
            },
            description: {
              type: 'string',
              example: 'Item description',
              description: 'Item description (optional)',
            },
            userId: {
              type: 'integer',
              example: 1,
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '2024-01-01T00:00:00.000Z',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              example: '2024-01-01T00:00:00.000Z',
            },
          },
        },
        CreateItemRequest: {
          type: 'object',
          required: ['title'],
          properties: {
            title: {
              type: 'string',
              minLength: 1,
              maxLength: 100,
              example: 'My New Item',
            },
            description: {
              type: 'string',
              example: 'Description of my item',
            },
          },
        },
        UpdateItemRequest: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
              minLength: 1,
              maxLength: 100,
              example: 'Updated Item Title',
            },
            description: {
              type: 'string',
              example: 'Updated description',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'Error message',
            },
          },
        },
        HealthCheck: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              example: 'ok',
            },
            timestamp: {
              type: 'string',
              format: 'date-time',
              example: '2024-01-01T00:00:00.000Z',
            },
          },
        },
      },
    },
    tags: [
      {
        name: 'Authentication',
        description: 'User authentication endpoints',
      },
      {
        name: 'Items',
        description: 'CRUD operations for items (requires authentication)',
      },
      {
        name: 'Health',
        description: 'Server health check',
      },
    ],
  },
  apis: ['./routes/*.js', './server.js'], // Path to the API routes and server endpoints
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
