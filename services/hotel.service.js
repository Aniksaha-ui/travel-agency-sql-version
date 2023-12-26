const express = require("express");
const db = require("../model");
const Tour = db.tour;
const Transection = db.transection;
require("dotenv").config();
const { QueryTypes } = require('sequelize');
const Hotels =db.hotel
const fetchHotelCommisionInformation = async () => {
    const result = await db.sequelize.query("SELECT tours.tour_name,booking_hotels.tourId,hotelName,SUM(booking_hotels.cost) as totalHotelCosting FROM booking_hotels JOIN tours WHERE booking_hotels.tourId = tours.id GROUP BY hotelName,tourId,tours.tour_name", { type: QueryTypes.SELECT });
    return result;
};

/** new hotel */
const insertNewHotel = async(data)=>{
  const createdRecord = await Hotels.create(data);
  return createdRecord;
}

const hotelService = {
  fetchHotelCommisionInformation,
  insertNewHotel
};
module.exports = hotelService;
