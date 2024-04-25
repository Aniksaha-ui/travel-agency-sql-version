const express = require("express");
const db = require("../model");
const HotelCommision = db.hotelCommision;
require("dotenv").config();
const { QueryTypes } = require("sequelize");

/** new hotel commision added */
const newHotelCommisionDefaultAccount = async (hotelCommision) => {
    const hotelCommisionList = hotelCommision.map((hotelCommision) => {
      return { ...hotelCommision };
    });
    const hotelCommisionCreate = await HotelCommision.bulkCreate(hotelCommisionList);
    const insertedIds = hotelCommisionCreate.map((record) => record.id);
    return insertedIds;
};

/** fetch all accounts */
const fetchAllCommisionDefaultAccount = async () => {
  const commisionAccounts = await HotelCommision.findAll({});
  return commisionAccounts;
};

/** fetch bankname */
const fetchBankName = async () => {
  const accounts = await HotelCommision.findAll({ attributes: ["id", "bankName","branch"] });
  return accounts;
};

/** delete account  */
const deleteDefaultAccountById = async (id) => {
  const result = await HotelCommision.destroy({ where: { id: id } });
  return result;
};

/** fetch account by id*/
const fetchDefaultAccountById = async (id) => {
  const account = await HotelCommision.findAll({
    where: { id: id },
  });
  return account;
};

const accountservice = {
  fetchDefaultAccountById,
  newHotelCommisionDefaultAccount,
  fetchAllCommisionDefaultAccount,
  deleteDefaultAccountById,
  fetchBankName,
};
module.exports = accountservice;
