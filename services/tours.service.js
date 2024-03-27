const express = require("express");
const db = require("../model");
const Tour = db.tour;
const batchId = db.currentBatch;
const Booking = db.bookings;
const Transaction = db.transection;
require("dotenv").config();
const { QueryTypes } = require("sequelize");

/** get all tour */
const fetchTours = async () => {
  const tours = await Tour.findAll({});
  return tours;
};

/** get single tour */
const fetchToursById = async (id) => {
  const tour = await Tour.findAll({
    where: { id: id },
  });
  return tour;
};

/** insert tour */
const insertNewTour = async (data) => {
  const insert = await Tour.create(data);
  return insert;
};

/**update tour */
const updateTour = async (data, id) => {
  const update = await Tour.update(
    { data },
    {
      where: { id: id },
    }
  );
  return update;
};

/** delete tour */
const deleteToursById = async (id) => {
  const result = await Tour.destroy({ where: { id: id } });
  return result;
};

/** update tour */
const updateToursById = async (id, data) => {};

/** booking tour */
const insertBooking = async (tour, userId, seat,batchId) => {
  const tourInfo = {...tour,userId,seat,batchId};
  const createdRecord = await Booking.create(tourInfo);
  const lastInsertedId = createdRecord.id;
  return lastInsertedId;
};

/** tour wise profit */
const tourWiseProfit = async () => {
  const result = await db.sequelize.query(
    "SELECT tours.tour_name,bookings.tourId,SUM(bookings.cost*bookings.seat) as total_costing, SUM(bookings.orginal_cost*bookings.seat) as total_orginal_costing, SUM(bookings.cost*bookings.seat) - SUM(bookings.orginal_cost*bookings.seat) as Profit FROM bookings JOIN tours WHERE bookings.tourId = tours.id GROUP BY tours.tour_name,bookings.tourId",
    { type: QueryTypes.SELECT }
  );
  return result;
};

const singleTourProfit = async (tourId) => {
  const result = await db.sequelize.query(
    `SELECT tours.tour_name,bookings.tourId,SUM(bookings.cost*bookings.seat) as total_costing, SUM(bookings.orginal_cost*bookings.seat) as total_orginal_costing, SUM(bookings.cost*bookings.seat) - SUM(bookings.orginal_cost*bookings.seat) as Profit FROM bookings JOIN tours WHERE bookings.tourId = tours.id GROUP BY tours.tour_name,bookings.tourId AND tourId =${tourId}`,
    { type: QueryTypes.SELECT }
  );
  return result;
};

const fetchTourWiseSeatSell = async() =>{
  const sellingInformation = await db.sequelize.query(`SELECT tours.tour_name as TourName,SUM(seat) AS selling_seat FROM bookings,tours WHERE bookings.tourId = tours.id GROUP BY(TourName);`
  ,{ type: QueryTypes.SELECT });

  return sellingInformation;
}

const searchByName = async (data) => {
  const searchTerm = `%${data.tourName}%`;
  const result = await db.sequelize.query(
    "SELECT tour_name FROM tours WHERE tour_name LIKE :searchTerm;",
    {
      replacements: { searchTerm },
      type: db.sequelize.QueryTypes.SELECT,
    }
  );
  return result;
};

const fetchTrasectionByTour = async (tourId) => {
  const transactions = await Transaction.findAll({
    where: { tourId: tourId, status: "A" },
  });
  return transactions;
};

const updateTourSeat = async (tourId, seat) => {
  let transection = await Tour.decrement(
    { available_seat: seat },
    { where: { id: tourId } }
  );
  return transection;
};

 const fetchToursAvailableSeatById = async(tourId)=>{
    
    let availableSeatInformation = await Tour.findAll(
      {where:{id: tourId},attributes: ['available_seat']
    });

    return availableSeatInformation;
 } 


const tourService = {
  fetchTours,
  fetchToursById,
  insertNewTour,
  updateTour,
  deleteToursById,
  updateToursById,
  insertBooking,
  tourWiseProfit,
  searchByName,
  updateTourSeat,
  singleTourProfit,
  fetchTrasectionByTour,
  fetchTourWiseSeatSell,
  fetchToursAvailableSeatById
};

module.exports = tourService;
