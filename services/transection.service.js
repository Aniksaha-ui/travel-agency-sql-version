const express = require("express");
const db = require("../model");
const Transection = db.transection;
require("dotenv").config();
const { QueryTypes } = require('sequelize');

const insertTransection = async(transection,userId,tourId)=>{
    console.log()
    const transectionInfo = {
      ...transection,
      userId,
      tourId,
      status: "p"
    }
    const createdRecord = await Transection.create(transectionInfo);
  }


  const pendingTransection = async () =>{
    const result = await db.sequelize.query("SELECT * FROM `transections` WHERE STATUS = 'p'", { type: QueryTypes.SELECT });
    return result;
    }


  const approvedTransection = async () =>{
    const result = await db.sequelize.query("SELECT * FROM `transections` WHERE STATUS = 'a'", { type: QueryTypes.SELECT });
    return result;
    }

  const rejectTransection = async () =>{
    const result = await db.sequelize.query("SELECT * FROM `transections` WHERE STATUS = 'r'", { type: QueryTypes.SELECT });
    return result;
    }

  const updateTransaction = async(transactionId,status)=>{
    // console.log(status,transactionId,"st");
    const result = await Transection.update(
      { status: status },
      { where: { id: transactionId } }
    );
    return result;
  }

  /** find specific userId transaction history */
  const myTransactionHistoy = async(userId)=>{
    const result = await Transection.findAll({ where: { userId: userId } })
    return result;
1  }

 /**** find single transection  ***************/
    const singleTransectionInfo = async(transectionId) =>{
      const result = await Transection.findAll({ where: { id: transectionId } })
      return result;
    }


const transectionService = {
    insertTransection,
    pendingTransection,
    approvedTransection,
    rejectTransection,
    updateTransaction,
    myTransactionHistoy,
    singleTransectionInfo
};

module.exports = transectionService;
