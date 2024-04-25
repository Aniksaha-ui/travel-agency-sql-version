const dbConfig = require("../config/dbConfig.js");

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, "root", "root", {
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
db.hotel = require("./HotelModel.js")(sequelize, DataTypes);
db.bankAccounts = require("./bankAccountsModel.js")(sequelize, DataTypes);
db.bankDeposite = require("./bankDepositeInfoModel.js")(sequelize, DataTypes);
db.currentBatch = require("./CurrentBatch.js")(sequelize, DataTypes);
db.completedTours = require("./completedTours.js")(sequelize, DataTypes);
db.hotelDefaultAccountSettings =require("./setupHotelDefaultAccountSetupModel.js")(sequelize, DataTypes);
db.hotelCommision =require("./hotelCommisionModel.js")(sequelize, DataTypes);
db.hotelCommisionDetails =require("./hotelCommisionDetailsModel.js")(sequelize, DataTypes);
db.accountAmount =require("./accountAmountModel.js")(sequelize, DataTypes);
db.companyAccountHistory =require("./companyAccountHistory.js")(sequelize, DataTypes);
// db.reviews = require("./reviewModel.js")(sequelize, DataTypes);

db.sequelize.sync({ force: false }).then(() => {
  //console.log("yes re-sync done!");
});

module.exports = db;
