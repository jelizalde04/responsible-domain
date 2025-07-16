const swaggerJsdoc = require("swagger-jsdoc");

// Configuración de Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API para Eliminar Responsable",
      version: "1.0.0",
      description: "API para eliminar un responsable por su ID.",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./routes/responsibleRoutes.js"], // Ruta del archivo con anotaciones Swagger
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = swaggerSpec;
