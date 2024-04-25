module.exports = (sequelize, DataTypes) => {
    const HotelCommisionDetails = sequelize.define("hotel_commision_details", {
      hotelId: {
        type: DataTypes.INTEGER.UNSIGNED,
      },
      commisionId: {
        type: DataTypes.INTEGER,
      },
      tourId: {
        type: DataTypes.INTEGER,
      },
      amount: {
        type: DataTypes.INTEGER,
      },
      date: {
        type: DataTypes.STRING,
      },
      isCollected: {
        type: DataTypes.INTEGER,
      },
      isBankTransfer: {
        type: DataTypes.INTEGER,
      },

    });
    return HotelCommisionDetails;
  };
  