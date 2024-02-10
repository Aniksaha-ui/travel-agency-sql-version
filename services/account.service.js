const express = require("express");
const db = require("../model");
const Account = db.bankAccounts;
require("dotenv").config();
const { QueryTypes } = require("sequelize");

/** new account */
const newAccount = async (data) => {
  const createdRecord = await Account.create(data);
  return createdRecord;
};

/** fetch all accounts */
const fetchAllAccount = async () => {
  const accounts = await Account.findAll({});
  return accounts;
};

/** fetch bankname */
const fetchBankName = async () => {
  const accounts = await Account.findAll({ attributes: ["id", "bankName","branch"] });
  return accounts;
};

/** delete account  */
const deleteAccountById = async (id) => {
  const result = await Account.destroy({ where: { id: id } });
  return result;
};

/** fetch account by id*/
const fetchAccountById = async (id) => {
  const account = await Account.findAll({
    where: { id: id },
  });
  return account;
};

const accountservice = {
  fetchAccountById,
  newAccount,
  fetchAllAccount,
  deleteAccountById,
  fetchBankName,
};
module.exports = accountservice;
