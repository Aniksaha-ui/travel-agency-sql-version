const express = require("express");
const connect = require("../connection");
const router = express.Router();
const db = require("../model");
require("dotenv").config();
const auth = require("../auth/authentication");
const checkRole = require("../auth/checkRole");
const responseFormat = require("../common/response");
const dashboardService = require("../services/dashboard.service");

const e = require("express");






  /** dashboard data report */
  router.get("/", async (req, res) => {
    try{
      const response = responseFormat;
      let query;
      const result = await dashboardService.fetchDashboardInformation();
      res.send({isExecute: true, message: "Dashboard Information",data:result});
    }catch(err){
        console.log(err)
    }
   }
  );

module.exports = router;
