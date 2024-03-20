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
const depositeService = require("../services/deposit.service");
const batchService = require("../services/currentBatch.service");
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
      const result = await transectionService.approvedTransection();
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


  /** update transaction and confirm booking*/
  router.post("/update",auth.authenticationToken,checkRole.checkRole,async(req,res)=>{
    try{
      const status = req.body.status;
      const transactionId = req.body.id;
      const transactionInfo = await transectionService.singleTransectionInfo(transactionId);
      const batchId = req.body.batchId;
      const bankDeposit = {
        accountInfoId: transactionInfo[0].bankname,
        customer_card_no : transactionInfo[0].cardNo,
        amount : transactionInfo[0].amount,
        remarks : req.body.remarks,
        purpose : "tour" 
      }

      if(status!=='r'){
        const storeDeposit = await depositeService.insertNewDeposit(bankDeposit);
        const updateSeat = await batchService.updateSeat(batchId,transactionInfo[0].seat);
      }

      const result = await transectionService.updateTransaction(transactionId,status);
      
     if(result[0]===1){
      res.send({isExecute: true, message: "Transaction Information Updated"});
     }
     res.send({isExecute: true, message: "No data found"});
  
    }catch(err){
      console.log(err);
     res.send({isExecute: false, message: err});

    }
  })


  /** user transection history */
  router.post("/my-transaction-history",auth.authenticationToken,checkRole.checkRole,async(req,res)=>{
    try{
      const userId = req.body.userId;
      const result = await transectionService.myTransactionHistoy(userId);
      console.log(result);
     if(result.length>0){
      res.send({isExecute: true, message: "Transaction history",data: result});
     }  
     res.send({isExecute: true, message: "No data found"});
  
    }catch(err){
     res.send({isExecute: false, message: "Internal Server Error",data:result});

    }
  })

  /*** get single transection information */
  router.get("/:transectionId",auth.authenticationToken,checkRole.checkRole, async (req, res) => {
    try{
      const response = responseFormat;
      let query;
      const {transectionId} = req.params;
      const result = await transectionService.singleTransectionInfo(transectionId);
      if(result.length>0){
        res.send({isExecute: true, message: "Single Transection Data",data:result});
      }
      res.send({isExecute: true, message: "No data found",data:result});

    }catch(err){
        console.log(err)
    }
   }
  );


module.exports = router;
