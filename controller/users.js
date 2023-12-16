const express = require("express");
const connect = require("../connection");
const router = express.Router();
const db = require("../model");
const User = db.users;
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { where, Op } = require("sequelize");
require("dotenv").config();
const auth = require("../auth/authentication");
const checkRole = require("../auth/checkRole");
const { reset } = require("nodemon");

//insert and signup method
router.post("/signup", async (req, res) => {
  const data = req.body;
  data.status = "P";
  data.role = process.env.USER;
  //console.log(data);
  const insert = await User.create(data);
  if (insert) {
    res.status(200).send({ isExecute: true, message: "Data Inserted" });
  } else {
    res.status(400).send({ isExecute: false, message: "Data not inserted" });
  }
});

//login method
router.post("/login", async (req, res) => {
  const user = req.body;
  //console.log(user);
  const existUser = await User.findAll({
    where: {
      [Op.and]: [{ email: req.body.email }, { password: req.body.password }],
    },
  });

  //console.log(existUser[0].email, "length");
  if (existUser.length > 0) {
    //console.log(existUser[0].status, "111");
    if (existUser[0].status == "A") {
      const response = { email: existUser[0].email, role: existUser[0].role };
      const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, {
        expiresIn: "8h",
      });
      res.status(200).send({ accessToken: accessToken });
    } else {
      res
        .status(401)
        .send({ isExecute: true, message: "Wait for admin approval" });
    }
  } else {
    res.status(200).send({ isExecute: true, message: "No User Found" });

    // //console.log("Not found");
  }
});

router.post("/forgetpassword", async (req, res) => {
  const user = req.body;
  const existUser = await User.findAll({
    where: {
      [Op.and]: [{ email: req.body.email }],
    },
  });

  if (existUser.length <= 0) {
    return res.status(200).json({
      isExecute: true,
      message: "Password sent successfully to your email",
    });
  } else {
    var mailOption = {
      from: process.env.EMAIL,
      to: existUser[0].email,
      subject: "Password by cafe management system",
      html: `<p><b>Your login details for cafe management system</b>Email:${existUser[0].email}<b>Password :${existUser[0].password}</b></p>`,
    };
    transport.sendMail(mailOption, function (err, info) {
      if (err) {
        //console.log(err);
      } else {
        //console.log("Email sent" + info.response);
      }
    });
  }
});

router.post("changepassword", async (req, res) => {});

//get all record
router.get(
  "/get/all",
  auth.authenticationToken,
  checkRole.checkRole,
  async (req, res) => {
    const user = await User.findAll({});
    if (user.length > 0) {
      res.send({ isExecute: true, user: user });
    } else {
      res.send({ isExecute: false });
    }
  }
);

//get by id
router.get("/get-by-id/:id", auth.authenticationToken, async (req, res) => {
  const id = req.params.id;
  const user = await User.findAll({
    where: { id: id },
  });
  if (user.length > 0) {
    res.send({ isExecute: true, user: user, message: "User Found" });
  } else {
    res.send({ isExecute: false, message: "No record found" });
  }
});

//delete
router.get("/delete/:id", auth.authenticationToken, async (req, res) => {
  const id = req.params.id;
  const userDelete = await User.destroy({ where: { id: id } });
  if (userDelete == 1) {
    res.send({ isExecute: true, message: "User Deleted Successfully" });
  } else {
    res.send({ isExecute: false, message: "No User Found" });
  }
});

//update
router.post("/update/:id", auth.authenticationToken, async (req, res) => {
  const id = req.params.id;
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  const update = await User.update(user, { where: { id: id } });
  // //console.log(update, "update");
  if (update) {
    res.send({ isExecute: true, message: "Data Updated" });
  } else {
    res.send({ isExecute: false, message: "User can not be updated" });
  }
});

router.get("/checkToken", auth.authenticationToken, async (req, res) => {
  return res.status(200).json({
    isExecute: true,
    message: "true",
  });
});

module.exports = router;
