const express = require("express");
const db = require("../model");
const HotelCommision = db.hotelCommision;
require("dotenv").config();
const { QueryTypes } = require("sequelize");

/** new account */
const createHotelCommision = async (hotel,totalCosting) => {
    console.log(hotel,totalCosting,"123")
    const hotelCommision = {hotelId : hotel.hotelId, dueAmount: (parseInt(totalCosting.hotel_costing)*0.10)}
    const hotelCommisionCreate = await HotelCommision.create(hotelCommision);
    const lastInsertedId = hotelCommisionCreate.id;
    return lastInsertedId;
};


const hotelCommisionService = {
   createHotelCommision,
};
module.exports = hotelCommisionService;
