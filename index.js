const express = require("express");
const cors = require("cors");
const connection = require("./connection");
const userController = require("./controller/users");
const categoryController = require("./controller/categories.controller");
const tourController = require("./controller/tour.controller");
const transectionController = require("./controller/transection.controller");
const dashboardController = require("./controller/dashboard.controller");
const hotelController = require("./controller/hotel.controller");
const bookingController = require("./controller/booking.controller");
const accountController = require("./controller/account.controller");
const batchController = require("./controller/currentBatch.controller");
const depositeController = require("./controller/deposite.controller");
const defaultCommisionAccountController = require("./controller/hotelCommisionDefaultAccount.controller");
const hotelCommisionInformationController = require("./controller/hotelCommision.controller");
const app = express();

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const depositeService = require("./services/deposit.service");

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
app.use("/transection", transectionController);
app.use("/dashboard", dashboardController);
app.use("/hotel", hotelController);
app.use("/booking", bookingController);
app.use("/account", accountController);
app.use("/batch", batchController);
app.use("/deposite",depositeController)
app.use("/defaultCommsionAccount",defaultCommisionAccountController);
app.use("/hotelCommisionInformation",hotelCommisionInformationController)
module.exports = app;
