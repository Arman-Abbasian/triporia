import swaggerJSDoc from 'swagger-jsdoc'

const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Triorpia API Docs',
      version: '1.0.0',
      description: 'API documentation for triporia app',
    },
    servers: [
      {
        url: 'http://localhost:5000/api',
      },
    ],
    components: {
      schemas: {
        SuccessResponse: {
          type: 'object',
          properties: {
            isSuccess: { type: 'boolean', example: true },
            message: { type: 'string', example: 'Operation successful' },
            data: {
              type: 'object',
              additionalProperties: true,
              example: { id: 1, username: 'arman' },
            },
            error: { type: 'null', example: null },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            isSuccess: { type: 'boolean', example: false },
            message: { type: 'string', example: 'Validation failed' },
            data: { type: 'null', example: null },
            error: {
              type: 'object',
              additionalProperties: true,
              example: { field: 'username', issue: 'Required field' },
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'],
}

export const swaggerSpec = swaggerJSDoc(swaggerOptions)
