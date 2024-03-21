const express = require("express");
const router = express.Router();
require("dotenv").config();
const auth = require("../auth/authentication");
const checkRole = require("../auth/checkRole");
const responseFormat = require("../common/response");

const currentBatchService = require("../services/currentBatch.service");
const e = require("express");

  /**Get All Information */
  router.get("/",auth.authenticationToken,checkRole.checkRoleForUser, async (req, res) => {
      try{
          const result = await currentBatchService.fetchAllBatch();
          if(result.length > 0){
            res.status(200).json({isExecute: true, message: "Data retrived successfully",data: result});
          }
          res.status(200).json({isExecute: true, message: "No data found", data: []})
     }catch(err){
        res.status(500).json({isExecute: false,message: "Internal Server Error"})
      }
  });

  /**All current batch list */
  router.post("/active",auth.authenticationToken,checkRole.checkRoleForUser, async (req, res) => {
    try{  
      const tourId = req.body.tourId;
      const result = await currentBatchService.fetchAllActiveBatch(tourId);
      if(result.length>0){
        res.status(200).json({isExecute: true, message: "All Active batch",data:result});
      }
      res.status(200).json({isExecute: true, message: "No data found",data:result});
    }catch(err){
        console.log(err)
    }
   }
  );

  router.post("/create",auth.authenticationToken,checkRole.checkRoleForUser, async (req, res) => {
    try{  
      const newBatch = req.body;
      const result = await currentBatchService.insertNewBatch(newBatch);
      if(result){
        res.status(200).json({isExecute: true, message: "Create New Batch",data:result});
      }
      res.status(200).json({isExecute: true, message: "Batch can not be inserted"});
    }catch(err){
        res.status(500).json({isExecute: true, message: "Internal Server error"});
    }
   }
  );



  router.get("/:id",auth.authenticationToken,checkRole.checkRoleForUser, async (req, res) => {
    try{  
      const batchId = req.params.id;
      const result = await currentBatchService.fetchBatchId(batchId);
      if(result.length > 0){
        res.status(200).json({isExecute: true, message: "Single Batch Information",data:result});
      }
      res.status(200).json({isExecute: true, message: "No Batch Found"});
    }catch(err){
        res.status(500).json({isExecute: true, message: "Internal Server error"});
    }
   }
  );



  router.delete("/:id",auth.authenticationToken,checkRole.checkRoleForUser, async (req, res) => {
    try{  
      const batchId = req.params.id;
      const result = await currentBatchService.deleteBatchById(batchId);
      if(result===1){
        res.status(200).json({isExecute: true, message: "Batch deleted successfully",data:result});
      }
      res.status(200).json({isExecute: true, message: "No Batch Found"});
    }catch(err){
        res.status(500).json({isExecute: true, message: "Internal Server error"});
    }
   }
  );


  router.post("/update",auth.authenticationToken,checkRole.checkRoleForUser, async (req, res) => {
    try{  
      const batchInfo = req.body;
      const result = await currentBatchService.updateBatch(batchInfo.batchId,batchInfo.status);
      if(result){
        res.status(200).json({isExecute: true, message: "Batch Information updated"});
      }
      res.status(200).json({isExecute: true, message: "Batch can not be updated"});
    }catch(err){
        res.status(500).json({isExecute: true, message: "Internal Server error"});
    }
   }
  );
  

   



module.exports = router;
