const express = require("express");
const db = require("../model");
const Tour = db.tour;
const Transection = db.transection;
require("dotenv").config();
const { QueryTypes } = require('sequelize');

const fetchHotelCommisionInformation = async () => {
    const result = await db.sequelize.query("SELECT tours.tour_name,booking_hotels.tourId,hotelName,SUM(booking_hotels.cost) as totalHotelCosting FROM booking_hotels JOIN tours WHERE booking_hotels.tourId = tours.id GROUP BY hotelName,tourId,tours.tour_name", { type: QueryTypes.SELECT });
    return result;
};

const hotelService = {
  fetchHotelCommisionInformation,
};

module.exports = hotelService;
