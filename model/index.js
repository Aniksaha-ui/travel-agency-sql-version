const dbConfig = require("../config/dbConfig.js");

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    //console.log("connected..");
  })
  .catch((err) => {
    //console.log("Error" + err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./userModel.js")(sequelize, DataTypes);
db.category = require("./categoryModel.js")(sequelize, DataTypes);
db.tour = require("./tourModel.js")(sequelize, DataTypes);
db.bookings = require("./bookingModel.js")(sequelize, DataTypes);
db.bookingPersons = require("./bookingpersonsModel.js")(sequelize, DataTypes);
db.bookingHotel = require("./bookinghotelModel.js")(sequelize, DataTypes);
db.bookingCosting = require("./bookingcostingModel.js")(sequelize, DataTypes);
db.transection = require("./transectionModel.js")(sequelize, DataTypes);

// db.reviews = require("./reviewModel.js")(sequelize, DataTypes);

db.sequelize.sync({ force: false }).then(() => {
  //console.log("yes re-sync done!");
});

module.exports = db;