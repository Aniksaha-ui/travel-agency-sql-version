const express = require("express");
const connect = require("../connection");
const router = express.Router();
const db = require("../model");
require("dotenv").config();
const auth = require("../auth/authentication");
const checkRole = require("../auth/checkRole");
const responseFormat = require("../common/response");
const tourService = require("../services/tours.service");
const bookingService = require("../services/booking.service");
const transectionService = require("../services/transection.service");
const e = require("express");

/** get all tour and find by id */
router.post(
  "/",
  auth.authenticationToken,
  checkRole.checkRoleForUser,
  async (req, res) => {
    try {
      const data = req.body;
      const response = responseFormat;
      let query;
      query = await tourService.fetchTours();
      if (query.length > 0) {
        response.isExecute = true;
        response.data = query;
        response.message = "Data rerive successfully";
        res.send(response);
      } else {
        response.isExecute = false;
        response.data = [];
        response.message = "No Data Found";
        res.send(response);
      }
    } catch (err) {
      res.send({ isExecute: false, message: "Internal Server error" });
    }
  }
);
/** get all tour end*/

/** Insert tour */
router.post(
  "/create",
  auth.authenticationToken,
  checkRole.checkRole,
  async (req, res) => {
    try {
      const response = responseFormat;
      let query;
      let data = req.body;
      let action = req.body.action;
      if (action === "insert") {
        query = tourService.insertNewTour(data);
      } else {
        query = tourService.updateTour(data, data.id);
      }
      if (query) {
        response.data = data;
        response.isExecute = true;
        response.message = `${data.tour_name} is ${data.action} successfully`;
        res.send(response);
      } else {
        response.data = data;
        response.isExecute = true;
        response.message = `${data.tour_name} can not be ${data.action}`;
        res.send(response);
      }
    } catch (err) {
      response.isExecute = false;
      response.message = err;
      res.send(response);
    }
  }
);

/** booking a tour */
router.post("/booking",auth.authenticationToken,checkRole.checkRoleForUser,async (req, res) => {
    try {
      const response = responseFormat;
      let query;
      let data = req.body;
      const { tour, person, seat, hotel, userId, transection, batchId } = data;
      const lastInserted = await tourService.insertBooking(tour, userId, seat,batchId);
      const personInformation = await bookingService.insertIntoBookingPerson(
        person,
        lastInserted,
        tour.tourId,
        userId
      );
      const insertIntoHotel = await bookingService.insertIntoHotel(
        tour.tourId,
        userId,
        lastInserted,
        hotel
      );
      const totalCosting = {
        tour_costing: tour.cost,
        hotel_costing: hotel.cost,
        total_costing: parseInt(tour.cost) * seat + parseInt(hotel.cost),
      };
      const insertIntoTotalCosting = await bookingService.insertTotalCosting(
        tour.tourId,
        userId,
        lastInserted,
        totalCosting
      );
      const insertIntoTransection = await transectionService.insertTransection(
        transection,
        userId,
        tour.tourId
      );
    
      res.send({ isExecute: true, message: "Thanks for booking", data: {} });
    } catch (err) {
      console.log(err);
    }
  }
);

/** tourwise profit report */
router.get("/profit", auth.authenticationToken,checkRole.checkRole,async (req, res) => {
    try {
      const response = responseFormat;
      let query;
      const result = await tourService.tourWiseProfit();
      if (result.length > 0) {
        res.send({
          isExecute: true,
          message: "Tour wise profit",
          data: result,
        });
      }
      res.send({ isExecute: true, message: "No data found", data: result });
    } catch (err) {
      console.log(err);
    }
  }
);

router.get("/selling-seat",auth.authenticationToken,checkRole.checkRoleForUser,async (req, res) => {
    try {
      console.log("hitted");
      const result = await tourService.fetchTourWiseSeatSell();
      console.log(result)
      if (result.length > 0) {
        res.send({ isExecute: true, message: "Search Result", data: result });
      }
      res.send({ isExecute: true, message: "No data found", data: result });
    } catch (err) {
      console.log(err);
    }
  }
);

/** tour search */
router.post("/search",auth.authenticationToken,checkRole.checkRoleForUser,async (req, res) => {
    try {
      const response = responseFormat;
      const data = {
        tourName: req.body.tourName ? req.body.tourName : "",
      };
      let query;
      const result = await tourService.searchByName(data);
      if (result.length > 0) {
        res.send({ isExecute: true, message: "Search Result", data: result });
      }
      res.send({ isExecute: true, message: "No data found", data: result });
    } catch (err) {
      console.log(err);
    }
  }
);

/** get single tour */
router.get("/:id",auth.authenticationToken,checkRole.checkRoleForUser,async (req, res) => {
  try {
    const response = responseFormat;
    const id = req.params.id;
    query = await tourService.fetchToursById(id);
    let transections = await tourService.fetchTrasectionByTour(id);

    if (query.length > 0) {
      response.isExecute = true;
      response.data = { tour: query, transections: transections };
      response.message = "Data retrive successfully";
      res.status(200).json(response);
    } else {
      response.isExecute = true;
      response.data = [];
      response.message = "No Data Found";
      res.status(200).json(response);
    }
  } catch (err) {
    res
      .status(500)
      .json({ isExecute: false, message: "Internal Server error" });
  }
}
);

/** delete tour */
router.delete("/:id",auth.authenticationToken,checkRole.checkRole,async (req, res) => {
    try {
      const response = responseFormat;
      const id = req.params.id;
      query = await tourService.deleteToursById(id);
      if (query === 1) {
        response.isExecute = true;
        response.data = query;
        response.message = "Data deleted Successfully";
        res.status(200).json(response);
      } else {
        response.isExecute = false;
        response.data = [];
        response.message = "No data found";
        res.status(200).json(response);
      }
    } catch (err) {
      res
        .status(500)
        .json({ isExecute: false, message: "Internal Server error" });
    }
  }
);


/**** get tour available seat */
router.get("/get-available-seat/:id",auth.authenticationToken,checkRole.checkRoleForUser,async (req, res) => {
  try {
    const response = responseFormat;
    const id = req.params.id;
    query = await tourService.fetchToursAvailableSeatById(id);
    if (query) {
      response.isExecute = true;
      response.data =  query ;
      response.message = "Data retrive successfully";
      res.status(200).json(response);
    } else {
      response.isExecute = true;
      response.data = [];
      response.message = "No Data Found";
      res.status(200).json(response);
    }
  } catch (err) {
    res.status(500).json({ isExecute: false, message: err });
  }
}
);



module.exports = router;
