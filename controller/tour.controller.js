const express = require("express");
const connect = require("../connection");
const router = express.Router();
const db = require("../model");
require("dotenv").config();
const auth = require("../auth/authentication");
const checkRole = require("../auth/checkRole");
const responseFormat = require("../common/response");
const tourService = require("../services/tours.service");
const e = require("express");


/** get all tour and find by id */
router.post("/",auth.authenticationToken,checkRole.checkRole,
  async (req, res) => {
    try {
      const data = req.body;
      const tourId = req.body.id ? req.body.id : '';
      const action = req.body.action;
      console.log(tourId,"id");
      console.log(action,"action");
      const response = responseFormat;
      let query;
      if(tourId!=='' && action==='singledata'){
         query = await tourService.fetchToursById(tourId);
      } else if(tourId!=='' && action==='delete'){
        query = await tourService.deleteToursById(tourId); //delete
        if(query===0){
            response.message ="No data found"
        }else{
            response.message ="Deleted Successfully"
        }
        response.data = query;
        response.isExecute = true; 
        res.send(response);

      } else if(tourId!=='' && action==='update'){
        query = await tourService.updateToursById(tourId,data);
      }else{
         query = await tourService.fetchTours(); // fetch all
      }

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
             console.log("1")
        }else {
             query = tourService.insertNewTour(data);
             console.log("2");
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
  /** Insert tour end */









module.exports = router;
