const express = require("express");
const connect = require("../connection");
const router = express.Router();
const db = require("../model");
require("dotenv").config();
const auth = require("../auth/authentication");
const checkRole = require("../auth/checkRole");
const responseFormat = require("../common/response");
const hotelCommisionDetailsSevrice = require("../services/hotelCommisionDetails.service");

const e = require("express");
const response = responseFormat;



/** get all hotel Commision*/
router.get("/hotel-commision",auth.authenticationToken,checkRole.checkRoleForUser,async (req, res) => {
    try {
      let query;
      query = await hotelCommisionDetailsSevrice.gethotelCommisionInformation();
      //for single and fetch all
      if (query.length > 0) {
        response.isExecute = true;
        response.data = query;
        response.message = "Data retrive successfully";
        res.status(200).json(response);
      } else {
        response.isExecute = false;
        response.data = [];
        response.message = "No Data Found";
        res.status(200).json(response);
      }
      //for single and fetch all
    } catch (err) {
      // console.log(err);
      res.status(200).json({ isExecute: false, message: "Internal Server error" });
    }
  }
);
/** get all hotel commision */

/** get single default account */
router.get("/single/:id",auth.authenticationToken,checkRole.checkRoleForUser,async (req, res) => {

    try {
      const id = req.params.id;
      query = await hotelCommisionDetailsSevrice.getSingleHotelCommision(id);
      if (query.length > 0) {
        response.isExecute = true;
        response.data = query;
        response.message = "Data retrive successfully";
        res.status(200).json(response);
      } else {
        response.isExecute = false;
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


module.exports = router;
