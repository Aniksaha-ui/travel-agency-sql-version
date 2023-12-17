const express = require("express");
const db = require("../model");
const BookingPerson = db.bookingPersons;
const BookingHotel = db.bookingHotel;
const BookingCosting = db.bookingCosting;
require("dotenv").config();

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

const bookingService = {
     insertIntoBookingPerson,
     insertIntoHotel,
     insertTotalCosting
};

module.exports = bookingService;
