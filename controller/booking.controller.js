const express = require("express");
const router = express.Router();
require("dotenv").config();
const auth = require("../auth/authentication");
const checkRole = require("../auth/checkRole");
const responseFormat = require("../common/response");

const bookingService = require("../services/booking.service");
const e = require("express");

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







module.exports = router;