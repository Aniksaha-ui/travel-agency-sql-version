const express = require("express");
const db = require("../model");
const Tour = db.tour;
const Transection = db.transection;
require("dotenv").config();
const { QueryTypes } = require('sequelize');

const fetchDashboardInformation = async () => {
    const numberOfUpcomeingTour = await db.sequelize.query("SELECT COUNT(id) as totalUpcomeingTour FROM `tours` WHERE status='upcomeing'", { type: QueryTypes.SELECT });
    const numberOfCompletedTour = await db.sequelize.query("SELECT COUNT(id) as totalCompleteTour FROM `tours` WHERE status='complete'", { type: QueryTypes.SELECT });
    const numberOfCardTypeTransection = await db.sequelize.query("SELECT cardtype,COUNT(id) as channelWiseTransection FROM `transections` GROUP BY(cardtype);", { type: QueryTypes.SELECT });
    const lastTransectionList = await db.sequelize.query("SELECT cardNo,cardholdername,name,amount FROM `transections` JOIN `users` WHERE transections.userId = users.id ORDER BY transections.id DESC;", { type: QueryTypes.SELECT });
    const bookingReportGroupByTour = await db.sequelize.query("SELECT tour_name,COUNT(tourId) as noOfBooking FROM `bookings` JOIN `tours` WHERE bookings.tourId = tours.id GROUP BY tourId", { type: QueryTypes.SELECT });
    const result = {
        numberOfUpcomeingTour:numberOfUpcomeingTour[0].totalUpcomeingTour,
        numberOfCompletedTour: numberOfCompletedTour[0].totalCompleteTour,
        numberOfCardTypeTransection : numberOfCardTypeTransection[0].channelWiseTransection,
        lastTransectionList,
        bookingReportGroupByTour
    }
    return result;
};

const dashboardService = {
  fetchDashboardInformation,
};

module.exports = dashboardService;
