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
router.post("/",auth.authenticationToken,checkRole.checkRole,
  async (req, res) => {
    try {
      const data = req.body;
      const tourId = req.body.id ? req.body.id : '';
      const action = req.body.action;
      const response = responseFormat;
      let query;
      if(tourId!=='' && action==='singledata'){
         query = await tourService.fetchToursById(tourId); // get by id
      } else if(tourId!=='' && action==='delete'){
        query = await tourService.deleteToursById(tourId); //delete
       } else{
         query = await tourService.fetchTours(); // fetch all
      }
      
      //for delete
      if(query === 0 || 1){
        response.data = query;
        response.isExecute = true; 
        response.message = query===0 ? "No data found" : "Data deleted successfully"
        res.send(response);
      }
      //for delete end

      //for single and fetch all
      if (query.length > 0) {
        response.isExecute = true;
        response.data = query;
        response.message = "Data rerive successfully";
        res.send(response);
      } else {
        response.isExecute = false;
        response.data = "";
        response.message = "No Data Found";
        res.send(response);
      }
      //for single and fetch all

    } catch (err) {
      res.send({ isExecute: false, message: "Internal Server error" });
    }
  }
);
/** get all tour end*/


/** Insert tour */
router.post("/create",auth.authenticationToken,checkRole.checkRole, async (req, res) => {
    try{
      const response = responseFormat;
      let query;
        let data = req.body;
        let action = req.body.action;
        if(action==='insert'){
             query = tourService.insertNewTour(data);
        }else {
             query = tourService.insertNewTour(data);
        }
        if (query) {
            response.data = data;
            response.isExecute= true;
            response.message=`${data.tour_name} is inserted successfully`;
          res.send(response);
        } else {
          response.data = data;
          response.isExecute= true;
          response.message=`${data.tour_name} can not be inserted`;
          res.send(response);
        }
    }catch(err){
        response.isExecute= false;
        response.message=err;
        res.send(response);
    }
   }
  );
  /** Insert tour en */


  /** booking a tour */
  router.post("/booking",auth.authenticationToken,checkRole.checkRole, async (req, res) => {
    try{
      const response = responseFormat;
      let query;
        let data = req.body;
        const {tour,person,seat,hotel,userId,transection} = data;
        const lastInserted = await tourService.insertBooking(tour,userId,seat);
        const personInformation = await bookingService.insertIntoBookingPerson(person,lastInserted,tour.tourId,userId);
        const insertIntoHotel = await bookingService.insertIntoHotel(tour.tourId,userId,lastInserted,hotel);
        const totalCosting = {
          tour_costing : tour.cost,
          hotel_costing : hotel.cost,
          total_costing : parseInt(tour.cost)*(seat) + parseInt(hotel.cost)
        }
        const insertIntoTotalCosting = await bookingService.insertTotalCosting(tour.tourId,userId,lastInserted,totalCosting);
        const insertIntoTransection = await transectionService.insertTransection(transection,userId,tour.tourId);

        res.send({isExecute: true, message: "Thanks for booking",data:{}});
    }catch(err){
        console.log(err)
    }
   }
  );

  /** tourwise profit report */
  router.get("/profit",auth.authenticationToken,checkRole.checkRole, async (req, res) => {
    try{
      const response = responseFormat;
      let query;
      const result = await tourService.tourWiseProfit();
      if(result.length>0){
        res.send({isExecute: true, message: "Tour wise profit",data:result});
      }
      res.send({isExecute: true, message: "No data found",data:result});
    }catch(err){
        console.log(err)
    }
   }
  );

  /** tour search */
  router.post("/search",auth.authenticationToken,checkRole.checkRole, async (req, res) => {
    try{
      const response = responseFormat;
      const data = {
        tourName: req.body.tourName ? req.body.tourName : ''
      }
      let query;
      const result = await tourService.searchByName(data);
      if(result.length>0){
        res.send({isExecute: true, message: "Search Result",data:result});
      }
      res.send({isExecute: true, message: "No data found",data:result});
    }catch(err){
        console.log(err)
    }
   }
  );

module.exports = router;
