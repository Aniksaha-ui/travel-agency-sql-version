const express = require("express");
const db = require("../model");
const Tour = db.tour;
const Booking = db.bookings;
require("dotenv").config();

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


const tourService = {
    fetchTours,
    fetchToursById,
    insertNewTour,
    deleteToursById,
    updateToursById,
    insertBooking
};

module.exports = tourService;
