const express = require("express");
const db = require("../model");
const Tour = db.tour;
const Transection = db.transection;
require("dotenv").config();
const { QueryTypes } = require('sequelize');

const fetchDashboardInformation = async () => {
    const numberOfUpcomeingTour = await db.sequelize.query("SELECT COUNT(id) as totalUpcomeingTour FROM `tours` WHERE status='upcomeing'", { type: QueryTypes.SELECT });
    const numberOfCompletedTour = await db.sequelize.query("SELECT COUNT(id) as totalCompleteTour FROM `tours` WHERE status='complete'", { type: QueryTypes.SELECT });
    const numberOfCardTypeTransection = await db.sequelize.query("SELECT cardtype,COUNT(id) FROM `transections` GROUP BY(cardtype);", { type: QueryTypes.SELECT });
    const result = {
        numberOfUpcomeingTour:numberOfUpcomeingTour[0],
        numberOfCompletedTour: numberOfCompletedTour[0],
        numberOfCardTypeTransection : numberOfCardTypeTransection[0]
    }
    return result;
};

const categoryService = {
  fetchDashboardInformation,
};

module.exports = categoryService;
