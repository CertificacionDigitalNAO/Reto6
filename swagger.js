const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Configuración de Swagger
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API de Restaurantes",
    version: "1.0.0",
    description: "Documentación de la API de Restaurantes",
  },
  servers: [
    {
      url: "http://localhost:3000/api",
      description: "Servidor de desarrollo",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./routes/*.js", "./controllers/*.js"], // Archivos que contienen anotaciones Swagger
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
