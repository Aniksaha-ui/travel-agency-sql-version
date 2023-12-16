const express = require("express");
const db = require("../model");
const Category = db.category;
require("dotenv").config();

const fetchCategories = async () => {
  const categories = await Category.findAll({});
  return categories;
};

const categoryService = {
  fetchCategories,
};

module.exports = categoryService;
