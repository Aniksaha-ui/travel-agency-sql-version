const express = require("express");
const db = require("../model");
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

 /** fetch all hotels */
 const fetchHotel = async() =>{
  const hotels = await Hotels.findAll({});
  return hotels;
 }

 /** delete hotel  */
 const deleteHotelById = async(id)=>{
  const result = await Hotels.destroy({ where: { id: id } });
  return result;
 }

 /** fetch hotel by id*/
 const fetchHotelById = async(id)=>{
  const hotel = await Hotels.findAll({
    where: { id: id },
  });
  return hotel;
 }



const hotelService = {
  fetchHotelCommisionInformation,
  insertNewHotel,
  fetchHotel,
  deleteHotelById,
  fetchHotelById
};
module.exports = hotelService;
