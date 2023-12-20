const express = require("express");
const db = require("../model");
const Tour = db.tour;
const Booking = db.bookings;
require("dotenv").config();
const { QueryTypes } = require('sequelize');


/** get all tour */
const fetchTours = async () => {
  const tours = await Tour.findAll({});
  return tours;
};

/** get single tour */
const fetchToursById = async (id) =>{
    const tour = await Tour.findAll({
        where: { id: id },
      });
      return tour;
}

/** insert tour */
const insertNewTour = async (data)=>{
    const insert = await Tour.create(data);
    return insert; 
}

/** delete tour */
const deleteToursById = async (id) =>{
  const result = await Tour.destroy({ where: { id: id } });
  return result;
}

/** update tour */
const updateToursById = async (id,data)=>{
}


/** booking tour */
const insertBooking = async(tour,userId,seat)=>{
  const tourInfo = {
    ...tour,
    userId,
    seat
  }
  const createdRecord = await Booking.create(tourInfo);
  const lastInsertedId = createdRecord.id;
  return lastInsertedId;
}

/** tour wise profit */
const tourWiseProfit = async()=>{
  const result = await db.sequelize.query("SELECT tours.tour_name,bookings.tourId,SUM(bookings.cost*bookings.seat) as total_costing, SUM(bookings.orginal_cost*bookings.seat) as total_orginal_costing, SUM(bookings.cost*bookings.seat) - SUM(bookings.orginal_cost*bookings.seat) as Profit FROM bookings JOIN tours WHERE bookings.tourId = tours.id GROUP BY tours.tour_name,bookings.tourId", { type: QueryTypes.SELECT });
    return result;
}

const searchByName = async(data) =>{
  const searchTerm = `%${data.tourName}%`;
  const result = await db.sequelize.query('SELECT tour_name FROM tours WHERE tour_name LIKE :searchTerm;',{
    replacements: { searchTerm },
    type: db.sequelize.QueryTypes.SELECT
  });
  return result;
}

const tourService = {
    fetchTours,
    fetchToursById,
    insertNewTour,
    deleteToursById,
    updateToursById,
    insertBooking,
    tourWiseProfit,
    searchByName
};

module.exports = tourService;
