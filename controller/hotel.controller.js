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

  /** new hotel create */
  router.post("/create",auth.authenticationToken,checkRole.checkRole, async (req, res) => {
    try{
      const response = responseFormat;
      let query;
        let data = req.body;
        let action = req.body.action;
        if(action==='insert'){
             query = hotelService.insertNewHotel(data);
        }else {
             query = hotelService.updateHotel(data,data.id);
        }
        if (query) {
            response.data = data;
            response.isExecute= true;
            response.message=`${req.body.hotel_name} is ${data.action} successfully`;
          res.send(response);
        } else {
          response.data = data;
          response.isExecute= true;
          response.message=`${data.hotel_name} can not be ${data.action}`;
          res.send(response);
        }
    }catch(err){
        response.isExecute= false;
        response.message=err;
        res.send(response);
    }
   }
  );


  /** get all hotel */



  /** find hotel by Id */
  

module.exports = router;
