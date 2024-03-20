module.exports = (sequelize, DataTypes) => {
 const Transection = sequelize.define("transections", {
    userId:{
        type: DataTypes.INTEGER
    },
    tourId:{
      type: DataTypes.INTEGER
    },
    batchId:{
      type: DataTypes.INTEGER
    },
    cardNo: {
        type: DataTypes.STRING
      },
      cvv: {
        type: DataTypes.STRING
      },
      exp: {
        type: DataTypes.STRING
      },
      cardholdername: {
        type: DataTypes.STRING
      },
      cardtype:{
        type: DataTypes.STRING
      },
      bankname:{
        type: DataTypes.STRING
      },
      amount:{
        type: DataTypes.STRING
      },
      status: {
        type: DataTypes.STRING,
        default: "P"
      }
    });
  
    return Transection;
  };
  