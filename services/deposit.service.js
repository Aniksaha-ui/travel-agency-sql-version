const express = require("express");
const db = require("../model");
require("dotenv").config();
const { QueryTypes } = require('sequelize');
const BankDeposit = db.bankDeposite

const fetchHotelCommisionInformation = async () => {
    const result = await db.sequelize.query("SELECT tours.tour_name,booking_hotels.tourId,hotelName,SUM(booking_hotels.cost) as totalHotelCosting FROM booking_hotels JOIN tours WHERE booking_hotels.tourId = tours.id GROUP BY hotelName,tourId,tours.tour_name", { type: QueryTypes.SELECT });
    return result;
};

/** new deposit amount */
const insertNewDeposit = async(data)=>{
  const createdRecord = await BankDeposit.create(data);
  return createdRecord;
}

 /** fetch all hotels */
 const fetchAllDeposite = async() =>{
  const hotels = await BankDeposit.findAll({});
  return hotels;
 }

 /** delete hotel  */
 const deleteHotelById = async(id)=>{
  const result = await BankDeposit.destroy({ where: { id: id } });
  return result;
 }

 /** fetch hotel by id*/
 const fetchHotelById = async(id)=>{
  const hotel = await BankDeposit.findAll({
    where: { id: id },
  });
  return hotel;
 }

const depositeService = {
  insertNewDeposit,
  fetchAllDeposite,
  deleteHotelById,
  fetchHotelById,
  fetchHotelCommisionInformation,
};
module.exports = depositeService;
