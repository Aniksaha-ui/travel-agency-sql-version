module.exports = (sequelize, DataTypes) => {
    const Booking = sequelize.define("bookings", {
      tourId: {
        type: DataTypes.INTEGER,
      },
      cost: {
        type: DataTypes.INTEGER,
      },
      orginal_cost:{
        type: DataTypes.INTEGER,
      },
      userId:{
        type: DataTypes.INTEGER,
      },
      seat:{
        type: DataTypes.INTEGER,
      }
     
    });
    return Booking;
  };
  