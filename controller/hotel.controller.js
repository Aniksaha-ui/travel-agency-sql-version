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
  router.get("/commision", auth.authenticationToken,checkRole.checkRole,async (req, res) => {
    try{
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

    /** get all hotel and find by id */
  router.post("/",auth.authenticationToken,checkRole.checkRoleForUser,
  async (req, res) => {
    try {
      const response = responseFormat;
      let query;
      query = await hotelService.fetchHotel(); 
      //for single and fetch all
      if (query.length > 0) {
        response.isExecute = true;
        response.data = query;
        response.message = "Data retrive successfully";
        res.status(200).json(response);
      } else {
        response.isExecute = false;
        response.data = "";
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
  /** get all tour end*/
  
  /** get single hotel */
  router.get("/:id",auth.authenticationToken,checkRole.checkRoleForUser,async(req,res)=>{
    try{
        const response = responseFormat;
        const id = req.params.id;
        query = await hotelService.fetchHotelById(id); 
        if (query.length > 0) {
          response.isExecute = true;
          response.data = query;
          response.message = "Data retrive successfully";
          res.status(200).json(response);
        } else {
          response.isExecute = false;
          response.data = "";
          response.message = "No Data Found";
          res.status(200).json(response);
        }
    }catch(err){
      res.status(500).json({ isExecute: false, message: "Internal Server error" });
    }
  })

  /** delete hotel */
  router.delete("/:id",auth.authenticationToken,checkRole.checkRole,async(req,res)=>{
    try{
        const response = responseFormat;
        const id = req.params.id;
        query = await hotelService.deleteHotelById(id); 
      if(query===1){
        response.isExecute = true;
        response.data = query;
        response.message = "Data deleted Successfully";
        res.status(200).json(response);
      }else {
        response.isExecute = false;
        response.data = "";
        response.message = "No data found";
        res.status(200).json(response);
      }
    }catch(err){
      res.status(500).json({ isExecute: false, message: "Internal Server error" });
    }
  })


module.exports = router;
