module.exports = (sequelize, DataTypes) => {
    const HotelCommision = sequelize.define("hotel_commision", {
      hotelId: {
        type: DataTypes.INTEGER.UNSIGNED,
      },
      dueAmount: {
        type: DataTypes.INTEGER,
      },
    });
    return HotelCommision;
  };
  