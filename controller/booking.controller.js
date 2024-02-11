const express = require("express");
const router = express.Router();
require("dotenv").config();
const auth = require("../auth/authentication");
const checkRole = require("../auth/checkRole");
const responseFormat = require("../common/response");

const bookingService = require("../services/booking.service");
const e = require("express");

  /**All booking list */

  router.get("/",auth.authenticationToken,checkRole.checkRoleForUser, async (req, res) => {
    try{  
      const result = await bookingService.fetchAllBookingList();
      if(result.length>0){
        res.status(200).json({isExecute: true, message: "All Bookings",data:result});
      }
      res.status(200).json({isExecute: true, message: "No data found",data:result});
    }catch(err){
        console.log(err)
    }
   }
  );

  /** booking a tour */
  router.post("/my-tour-history",auth.authenticationToken,checkRole.checkRoleForUser, async (req, res) => {
    try{  
      const id = req.body.id ? req.body.id : '';
      const result = await bookingService.fetchUserHistoryById(id);
      if(result.length>0){
        res.status(200).json({isExecute: true, message: "Information of tour history",data:result});
      }
      res.status(200).json({isExecute: true, message: "No data found",data:result});
    }catch(err){
        console.log(err)
    }
   }
  );

  router.post("/tour-details",auth.authenticationToken,checkRole.checkRoleForUser, async (req, res) => {
    try{  
      const userId = req.body.id ? req.body.id : '';
      const tourId = req.body.tourId ? req.body.tourId : '';
      const bookingId = req.body.bookingId ? req.body.bookingId : '';
      const result = await bookingService.fetchUserTourDetails(userId,tourId,bookingId);
      if(result){
        res.status(200).json({isExecute: true, message: "Information of tour history",data:result});
      }
      res.status(200).json({isExecute: true, message: "No data found",data:result});
    }catch(err){
        console.log(err)
    }
   }
  );


  router.get("/:tourId",auth.authenticationToken,checkRole.checkRoleForUser, async (req, res) => {
    try{  
      const tourId = req.params.tourId ? req.params.tourId : '';
      const result = await bookingService.fetchBookingsByTourId(tourId);
      if(result.length>0){
        res.status(200).json({isExecute: true, message: "Booking Details by tourId",data:result});
      }
      res.status(200).json({isExecute: true, message: "No data found",data:result});
    }catch(err){
        console.log(err)
    }
   }
  );

   



module.exports = router;
