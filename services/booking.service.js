const express = require("express");
const db = require("../model");
const BookingPerson = db.bookingPersons;
const Bookings = db.bookings;
const BookingHotel = db.bookingHotel;
const BookingCosting = db.bookingCosting;
require("dotenv").config();
const { QueryTypes } = require("sequelize");

const fetchAllBookingList = async () => {
  const bookings = await db.sequelize.query(
    `SELECT tours.tour_name AS tourName ,bookings.*,users.name,users.email FROM bookings,users,tours WHERE bookings.userId = users.id AND bookings.tourId = tours.id;`,
    { type: QueryTypes.SELECT }
  );
  return bookings;
};

const insertIntoBookingPerson = async (person, bookingId, tourId, userId) => {
  const personList = person.map((person) => {
    return { ...person, bookingId, tourId, userId };
  });
  const bookingPersons = await BookingPerson.bulkCreate(personList);
  const insertedIds = bookingPersons.map((record) => record.id);
};

const insertIntoHotel = async (tourId, userId, bookingId, hotelInfo) => {
  const bookingInfo = {
    ...hotelInfo,
    tourId,
    bookingId,
    userId,
  };
  const createdRecord = await BookingHotel.create(bookingInfo);
};

const insertTotalCosting = async (tourId, userId, bookingId, totalCosting) => {
  const bookingInfo = {
    ...totalCosting,
    tourId,
    userId,
    bookingId,
  };
  const createdRecord = await BookingCosting.create(bookingInfo);
};

const fetchUserHistoryById = async (userId) => {
  const tourInformation = await db.sequelize.query(
    `SELECT tours.tour_name,booking_costings.total_costing,booking_costings.hotel_costing,booking_costings.tour_costing,bookings.seat FROM bookings,tours,booking_costings WHERE bookings.tourId = tours.id AND bookings.id = booking_costings.tourId AND bookings.userId=${userId}`,
    { type: QueryTypes.SELECT }
  );
  return tourInformation;
};

const fetchUserTourDetails = async (userId, tourId, bookingId) => {
  const tourInformation = await db.sequelize.query(
    `SELECT tours.tour_name,tours.image,tours.starting_date,tours.end_date,tours.day,tours.status,booking_costings.total_costing,bookings.seat,booking_costings.hotel_costing,booking_costings.tour_costing,bookings.cost*bookings.seat as total_tour_costing,booking_costings.total_costing FROM bookings,tours,booking_costings WHERE bookings.tourId = tours.id AND bookings.tourId = booking_costings.tourId AND bookings.userId=${userId} AND bookings.tourId=${tourId} AND bookings.id=${bookingId}`,
    { type: QueryTypes.SELECT }
  );

  const hotelInformation = await db.sequelize.query(
    `SELECT booking_hotels.hotelId,booking_hotels.hotelName,booking_hotels.cost,hotels.hotel_type,hotels.childernSeat,hotels.adultSeat,hotels.totalSeat FROM booking_hotels,hotels WHERE booking_hotels.hotelId = hotels.id AND booking_hotels.tourId=${tourId} AND booking_hotels.bookingId=${bookingId} AND booking_hotels.userId=${userId}`,
    { type: QueryTypes.SELECT }
  );

  const personInformation = await db.sequelize.query(
    `SELECT name,address FROM booking_persons WHERE userId=${userId} AND tourId=${tourId} AND bookingId=${bookingId}`,
    { type: QueryTypes.SELECT }
  );

  const data = {
    tour: tourInformation,
    hotel: hotelInformation,
    persons: personInformation,
  };
  return data;
};

const fetchBookingsByTourId = async (tourId) => {
  const bookingInfoByTourId = await db.sequelize.query(
    `SELECT users.name AS username,bookings.* FROM users,bookings WHERE users.id = bookings.userId AND tourId=${tourId} `,
    { type: QueryTypes.SELECT }
  );
  return bookingInfoByTourId;
};

const bookingService = {
  insertIntoBookingPerson,
  insertIntoHotel,
  insertTotalCosting,
  fetchUserHistoryById,
  fetchUserTourDetails,
  fetchAllBookingList,
  fetchBookingsByTourId,
};

module.exports = bookingService;
