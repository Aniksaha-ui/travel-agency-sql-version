module.exports = (sequelize, DataTypes) => {
    const Hotels = sequelize.define("hotels", {
      hotel_name: {
        type: DataTypes.STRING,
      },
      hotel_type:{
        type: DataTypes.STRING,
        defaultValue: "family"
      },
      roomNo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        defaultValue:
            "https://www.ahstatic.com/photos/c096_ho_00_p_1024x768.jpg",
      },
      childernSeat:{
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      adultSeat:{
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      totalSeat:{
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      cost:{
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      freeAfter: {
        type: DataTypes.DATEONLY,
        defaultValue: new Date()
      },
      status: {
        type: DataTypes.STRING,
        default: "free",
      },
    });
  
    return Hotels;
  };
  