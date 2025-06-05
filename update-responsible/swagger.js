const swaggerJsdoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",  // Versión de OpenAPI
    info: {
      title: "API para Actualizar Responsable",
      version: "1.0.0",
      description: "API que permite actualizar la información de un responsable",
    },
  },
  apis: ["./routes/responsibleRoutes.js"],  // Ruta de las rutas a documentar
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = swaggerSpec;
