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


const gethotelCommisionInformation = async() =>{
    
    const hotelCommision = await db.sequelize.query(
        "SELECT hotels.hotel_name,hotel_commisions.* FROM hotels,hotel_commisions WHERE hotels.id = hotel_commisions.hotelId;",
        { type: QueryTypes.SELECT }
    );
    return hotelCommision;
} 

const getSingleHotelCommision = async(hotelId)=>{
    const hotelSingleCommision = await db.sequelize.query(
        `SELECT hotels.hotel_name,hotel_commision_details.* FROM hotels,hotel_commision_details WHERE hotels.id = hotel_commision_details.hotelId AND hotels.id=${hotelId};;`,
        { type: QueryTypes.SELECT }
    );
    return hotelSingleCommision;
}


const hotelCommisionDetailsService = {
   createHotelCommisionDetails,
    gethotelCommisionInformation,
   getSingleHotelCommision
};
module.exports = hotelCommisionDetailsService;
