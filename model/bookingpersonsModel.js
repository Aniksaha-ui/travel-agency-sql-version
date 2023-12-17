module.exports = (sequelize, DataTypes) => {
    const BookingPersons = sequelize.define("booking_persons", {
      tourId: {
        type: DataTypes.INTEGER,
      },
      bookingId: {
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.STRING,
      }
    });
    return BookingPersons;
  };
  