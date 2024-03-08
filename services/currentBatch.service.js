const express = require("express");
const db = require("../model");
const Transection = db.transection;
require("dotenv").config();
const { QueryTypes } = require("sequelize");
const CurrentBatch = db.currentBatch;

const fetchAllActiveBatch = async (tourId) => {
  const currentBatch = await CurrentBatch.findAll({
    where: { status: "a", tourId: tourId },
  });
  return currentBatch;
};

/** new batch */
const insertNewBatch = async (data) => {
  const createdRecord = await CurrentBatch.create(data);
  return createdRecord;
};

/** fetch batch by id*/
const fetchBatchId = async (batchId) => {
    const hotel = await CurrentBatch.findAll({
      where: { id: batchId },
    });
    return hotel;
  };

/** delete hotel  */
const deleteBatchById = async (id) => {
  const result = await CurrentBatch.destroy({ where: { id: id } });
  return result;
};


/** update batch */
const updateBatch = async (batchId, status) => {
    const result = await CurrentBatch.update(
      { status: status },
      { where: { id: batchId } }
    );
    return result;
  };

const currentBatchService = {
  fetchAllActiveBatch,
  fetchBatchId,
  insertNewBatch,
  deleteBatchById,
  updateBatch,
};
module.exports = currentBatchService;
