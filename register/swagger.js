const swaggerJsdoc = require("swagger-jsdoc");

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0", // Usamos OpenAPI 3.0
    info: {
      title: "API para Registro de Responsables", // Título de la API
      version: "1.0.0", // Versión de la API
      description: "API para gestionar los responsables del sistema de mascotas", // Descripción
    },
    },
  apis: ["./routes/responsibleRoutes.js"], // Ruta de las rutas que contienen la documentación Swagger
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = swaggerSpec;
