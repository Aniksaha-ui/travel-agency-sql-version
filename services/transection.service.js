const express = require("express");
const db = require("../model");
const Transection = db.transection;
const Deposite = db.bankDeposite;
require("dotenv").config();
const { QueryTypes } = require("sequelize");

const insertTransection = async (transection, userId, tourId) => {
  const transectionInfo = {
    ...transection,
    userId,
    tourId,
    status: "p",
  };
  const createdRecord = await Transection.create(transectionInfo);
  console.log(createdRecord);
};

const pendingTransection = async () => {
  const result = await db.sequelize.query(
    "SELECT * FROM `transections` WHERE STATUS = 'p'",
    { type: QueryTypes.SELECT }
  );
  return result;
};

const approvedTransection = async () => {
  const result = await db.sequelize.query(
    "SELECT * FROM `transections` WHERE STATUS = 'a'",
    { type: QueryTypes.SELECT }
  );
  return result;
};

const rejectTransection = async () => {
  const result = await db.sequelize.query(
    "SELECT * FROM `transections` WHERE STATUS = 'r'",
    { type: QueryTypes.SELECT }
  );
  return result;
};

const updateTransaction = async (transactionId, status) => {
  // console.log(status,transactionId,"st");
  const transectionInfo = await Transection.findOne({ id: transectionService });
  console.log(typeof transectionInfo);
  const result = await Transection.update(
    { status: status },
    { where: { id: transactionId } }
  );
  return result;
};

<<<<<<< HEAD
/** find specific userId transaction history */
const myTransactionHistoy = async (userId) => {
  const result = await Transection.findAll({ where: { userId: userId } });
  return result;
  1;
};
=======
  const rejectTransection = async () =>{
    const result = await db.sequelize.query("SELECT * FROM `transections` WHERE STATUS = 'r'", { type: QueryTypes.SELECT });
    return result;
    }

  const updateTransaction = async(transactionId,status)=>{
    const transectionInfo = await Transection.findOne({id: transectionService});
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
>>>>>>> 399276e (controller changed)

/**** find single transection  ***************/
const singleTransectionInfo = async (transectionId) => {
  const result = await Transection.findAll({ where: { id: transectionId } });
  return result;
};

const transectionService = {
  insertTransection,
  pendingTransection,
  approvedTransection,
  rejectTransection,
  updateTransaction,
  myTransactionHistoy,
  singleTransectionInfo,
};

module.exports = transectionService;
