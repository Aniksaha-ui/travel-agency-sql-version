const express = require("express");
const connect = require("../connection");
const router = express.Router();
const db = require("../model");
require("dotenv").config();
const auth = require("../auth/authentication");
const checkRole = require("../auth/checkRole");
const responseFormat = require("../common/response");
const accountService = require("../services/account.service");

const e = require("express");
const response = responseFormat;

/** new account create */
router.post("/create",auth.authenticationToken,checkRole.checkRole,async (req, res) => {
    try {
      let query;
      let data = req.body;

      query = accountService.newAccount(data);
      if (query) {
        response.data = data;
        response.isExecute = true;
        response.message = `${req.body.account_name} is ${data.action} successfully`;
        res.send(response);
      } else {
        response.data = data;
        response.isExecute = true;
        response.message = `Bank Information added`;
        res.send(response);
      }
    } catch (err) {
      response.isExecute = false;
      response.message = err;
      res.send(response);
    }
  }
);

/** get all account and find by id */
router.post("/",auth.authenticationToken,checkRole.checkRoleForUser,async (req, res) => {
    try {
      let query;
      query = await accountService.fetchAllAccount();
      //for single and fetch all
      if (query.length > 0) {
        response.isExecute = true;
        response.data = query;
        response.message = "Data retrive successfully";
        res.status(200).json(response);
      } else {
        response.isExecute = false;
        response.data = [];
        response.message = "No Data Found";
        res.status(200).json(response);
      }
      //for single and fetch all
    } catch (err) {
      // console.log(err);
      res.status(200).json({ isExecute: false, message: "Internal Server error" });
    }
  }
);
/** get all tour end*/

/** get bankname */
router.get("/banknames",  auth.authenticationToken,checkRole.checkRoleForUser,async (req, res) => {
    try {
      let query;
      query = await accountService.fetchBankName();
      //for single and fetch all
      if (query.length > 0) {
        response.isExecute = true;
        response.data = query;
        response.message = "Data retrive successfully";
        res.status(200).json(response);
      } else {
        response.isExecute = false;
        response.data = [];
        response.message = "No Data Found";
        res.status(200).json(response);
      }
    } catch (err) {
      console.log("else");
      res
        .status(200)
        .json({ isExecute: false, message: "Internal Server error" });
    }
  }
);

/** get single account */
router.get("/:id",auth.authenticationToken,checkRole.checkRoleForUser,async (req, res) => {

    try {
      const id = req.params.id;
      query = await accountService.fetchAccountById(id);
      if (query.length > 0) {
        response.isExecute = true;
        response.data = query;
        response.message = "Data retrive successfully";
        res.status(200).json(response);
      } else {
        response.isExecute = false;
        response.data = [];
        response.message = "No Data Found";
        res.status(200).json(response);
      }
    } catch (err) {
      res
        .status(500)
        .json({ isExecute: false, message: "Internal Server error" });
    }
  }
);

/** delete account */
router.delete("/:id",auth.authenticationToken,checkRole.checkRole,async (req, res) => {
    try {
      const id = req.params.id;
      query = await accountService.deleteaccountById(id);
      if (query === 1) {
        response.isExecute = true;
        response.data = query;
        response.message = "Data deleted Successfully";
        res.status(200).json(response);
      } else {
        response.isExecute = false;
        response.data = [];
        response.message = "No data found";
        res.status(200).json(response);
      }
    } catch (err) {
      res.status(500).json({
        isExecute: false,
        message: "Internal Server error",
        error: err,
      });
    }
  }
);

module.exports = router;
