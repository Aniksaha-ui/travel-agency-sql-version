const express = require("express");
const connect = require("../connection");
const router = express.Router();
const db = require("../model");
const Category = db.category;

require("dotenv").config();
const auth = require("../auth/authentication");
const checkRole = require("../auth/checkRole");
const categoryService = require("../services/categories.service");
const responseFormat = require("../common/response");

router.post(
  "/create",
  // upload.single("image"),
  auth.authenticationToken,
  checkRole.checkRole,
  async (req, res) => {
    let data = req.body;
    data.status = "A";

    const insert = await Category.create(data);
    if (insert) {
      res.status(200).send({ isExecute: true, message: "Data Inserted" });
    } else {
      res.status(400).send({ isExecute: false, message: "Data not inserted" });
    }
  }
);

/** get all categories */
router.get(
  "/get/all",
  auth.authenticationToken,
  checkRole.checkRole,
  async (req, res) => {
    try {
      const response = responseFormat;
      const categories = await categoryService.fetchCategories();
      if (categories.length > 0) {
        response.isExecute = true;
        response.data = categories;
        response.message = "Data rerive successfully";
        res.send(response);
      } else {
        response.isExecute = false;
        response.data = "";
        response.message = "No Data Found";
        res.send(response);
      }
    } catch (err) {
      res.send({ isExecute: false, message: "Internal Server error" });
    }
  }
);

router.get(
  "/get-by-id/:id",
  auth.authenticationToken,
  checkRole.checkRole,
  async (req, res) => {
    const id = req.params.id;
    const category = await Category.findAll({
      where: { id: id },
    });
    if (category.length > 0) {
      res.send({
        isExecute: true,
        category: category,
        message: "Category Found",
      });
    } else {
      res.send({ isExecute: false, message: "No record found" });
    }
  }
);

router.post(
  "/update/:id",
  auth.authenticationToken,
  checkRole.checkRole,
  async (req, res) => {
    const id = req.params.id;
    const category = {
      category_name: req.body.category_name,
      remarks: req.body.remarks,
      status: req.body.status == null ? req.body.status : "A",
    };
    //console.log(category, "444");
    const update = await Category.update(category, { where: { id: id } });
    //console.log(update, "update");
    if (update == 1) {
      res.send({ isExecute: true, message: "Data Updated" });
    } else {
      res.send({ isExecute: false, message: "Category can not be updated" });
    }
  }
);

//delete
router.get("/delete/:id", auth.authenticationToken, async (req, res) => {
  const id = req.params.id;
  const userDelete = await Category.destroy({ where: { id: id } });
  if (userDelete == 1) {
    res.send({ isExecute: true, message: "Category Deleted Successfully" });
  } else {
    res.send({ isExecute: false, message: "No Category Found" });
  }
});

module.exports = router;
