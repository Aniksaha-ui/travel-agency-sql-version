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

  /** booking a tour */
  router.get("/pending",auth.authenticationToken,checkRole.checkRole, async (req, res) => {
    try{
      const response = responseFormat;
      let query;
      const result = await transectionService.pendingTransection();
      if(result.length>0){
        res.send({isExecute: true, message: "Transection Data",data:result});
      }
      res.send({isExecute: true, message: "No data found",data:result});

    }catch(err){
        console.log(err)
    }
   }
  );


   /** get approved transection */
   router.get("/approved",auth.authenticationToken,checkRole.checkRole, async (req, res) => {
    try{
      const response = responseFormat;
      let query;
      const result = await transectionService.pendingTransection();
      if(result.length>0){
        res.send({isExecute: true, message: "Transection Data",data:result});
      }
      res.send({isExecute: true, message: "No data found",data:result});
    }catch(err){
        console.log(err)
    }
   }
  );

  /** get reject transection */
  router.get("/reject",auth.authenticationToken,checkRole.checkRole, async (req, res) => {
    try{
      const response = responseFormat;
      let query;
      const result = await transectionService.rejectTransection();
      if(result.length>0){
        res.send({isExecute: true, message: "Transection Data",data:result});
      }
      res.send({isExecute: true, message: "No data found",data:result});

    }catch(err){
        console.log(err)
    }
   }
  );




module.exports = router;
