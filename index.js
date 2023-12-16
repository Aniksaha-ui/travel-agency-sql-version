const express = require("express");
const cors = require("cors");
const connection = require("./connection");
const userController = require("./controller/users");
const categoryController = require("./controller/categories.controller");
const tourController = require("./controller/tour.controller");

const app = express();

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Node JS API FOR SEQULIZER",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:8080/",
      },
    ],
  },
  apis: ["./index.js"],
};

const swaggerSpec = swaggerJsDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/user", userController);
app.use("/category", categoryController);
app.use("/tour", tourController);

module.exports = app;
