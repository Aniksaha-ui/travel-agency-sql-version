module.exports = (sequelize, DataTypes) => {
    const BookingHotel = sequelize.define("booking_hotel", {
      tourId: {
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
      },
      bookingId: {
        type: DataTypes.INTEGER,
      },
      hotelId: {
        type: DataTypes.INTEGER,
      },
      hotelName: {
        type: DataTypes.STRING,
      },
      cost:{
        type: DataTypes.INTEGER
      }
    });
    return BookingHotel;
  };
  