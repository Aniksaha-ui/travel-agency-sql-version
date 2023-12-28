const express = require("express");
const db = require("../model");
const BookingPerson = db.bookingPersons;
const BookingHotel = db.bookingHotel;
const BookingCosting = db.bookingCosting;
require("dotenv").config();
const { QueryTypes } = require('sequelize');

const insertIntoBookingPerson = async (person,bookingId,tourId,userId) => {
  const personList = person.map(person=>{
    return {...person,bookingId,tourId,userId}
  });
  const bookingPersons = await BookingPerson.bulkCreate(personList);
  const insertedIds = bookingPersons.map(record => record.id);
  console.log('Inserted IDs:', insertedIds);
};

const insertIntoHotel = async(tourId,userId,bookingId,hotelInfo)=>{
    const bookingInfo = {
        ...hotelInfo,
        tourId,
        bookingId,
        userId
      }
      const createdRecord = await BookingHotel.create(bookingInfo);
    }


    const insertTotalCosting = async(tourId,userId,bookingId,totalCosting)=>{
        const bookingInfo = {
            ...totalCosting,
            tourId,
            userId,
            bookingId,
        }
          const createdRecord = await BookingCosting.create(bookingInfo);
    }

    const fetchUserHistoryById =async (userId)=>{
       const tourInformation = await db.sequelize.query(`SELECT tours.tour_name,booking_costings.total_costing,bookings.seat FROM bookings,tours,booking_costings WHERE bookings.tourId = tours.id AND bookings.id = booking_costings.tourId AND bookings.userId=${userId}`
             , { type: QueryTypes.SELECT });
      return tourInformation;
    }

const bookingService = {
     insertIntoBookingPerson,
     insertIntoHotel,
     insertTotalCosting,
     fetchUserHistoryById
};

module.exports = bookingService;
