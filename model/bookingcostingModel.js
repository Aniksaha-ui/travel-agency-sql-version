module.exports = (sequelize, DataTypes) => {
    const BookingCosting = sequelize.define("booking_costing", {
      tourId: {
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
      },
      bookingId: {
        type: DataTypes.INTEGER,
      },
      hotel_costing:{
        type: DataTypes.INTEGER,
      },
      tour_costing:{
        type: DataTypes.INTEGER,
      },
      total_costing:{
        type: DataTypes.INTEGER,
      }
    });
    return BookingCosting;
  };
  