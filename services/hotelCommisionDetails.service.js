const express = require("express");
const db = require("../model");
const HotelCommisionDetails = db.hotelCommisionDetails;
require("dotenv").config();
const { QueryTypes } = require("sequelize");

/** new account */
const createHotelCommisionDetails = async (hotelId,commisionId,tourId,totalCosting) => {
  
    const hotelCommisionDetails = {
        hotelId,
        commisionId,
        tourId,
        amount: parseInt(totalCosting) * 0.10,
        date : new Date().toLocaleDateString(),
        isCollected: 0, 
        isBankTransfer: 0 
    }
    const hotelCommisionCreate = await HotelCommisionDetails.create(hotelCommisionDetails);
    const lastInsertedId = hotelCommisionCreate.id;
    return lastInsertedId;
};


const gethotelCommisionDetails = async() =>{
    
} 


const hotelCommisionDetailsService = {
   createHotelCommisionDetails,
};
module.exports = hotelCommisionDetailsService;
