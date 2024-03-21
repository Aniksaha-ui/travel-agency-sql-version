const express = require("express");
const router = express.Router();
require("dotenv").config();
const auth = require("../auth/authentication");
const checkRole = require("../auth/checkRole");
const responseFormat = require("../common/response");

const depositeService = require("../services/deposit.service");
const e = require("express");

  /**Get All Information */
  router.get("/",auth.authenticationToken,checkRole.checkRoleForUser, async (req, res) => {
      try{
          const result = await depositeService.fetchAllDeposite();
          if(result.length > 0){
            res.status(200).json({isExecute: true, message: "Data retrived successfully",data: result});
          }
          res.status(200).json({isExecute: true, message: "No data found", data: []})
     }catch(err){
        res.status(500).json({isExecute: false,message: "Internal Server Error"})
      }
  });

module.exports = router;
