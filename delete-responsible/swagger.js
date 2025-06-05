const swaggerJsdoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",  // Versión de OpenAPI
    info: {
      title: "API para Eliminar Responsable",
      version: "1.0.0",
      description: "API para eliminar un responsable por su ID.",
    },
  },
  apis: ["./routes/responsibleRoutes.js"],  // Archivo donde Swagger leerá las rutas para generar documentación
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = swaggerSpec;
