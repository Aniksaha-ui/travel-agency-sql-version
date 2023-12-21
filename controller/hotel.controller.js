const express = require("express");
const connect = require("../connection");
const router = express.Router();
const db = require("../model");
require("dotenv").config();
const auth = require("../auth/authentication");
const checkRole = require("../auth/checkRole");
const responseFormat = require("../common/response");
const hotelService = require("../services/hotel.service");

const e = require("express");

  /** dashboard data report */
  router.get("/commision", async (req, res) => {
    try{
      let query;
      const result = await hotelService.fetchHotelCommisionInformation();
      res.send({isExecute: true, message: "Hotel Commision Information",data:result});
    }catch(err){
        console.log(err)
    }
   }
  );

module.exports = router;
