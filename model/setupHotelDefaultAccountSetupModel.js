module.exports = (sequelize, DataTypes) => {
  const SetupDefaultBankAccount = sequelize.define("setup_hotel_default_account_setup", {
    hotelId: {
      type: DataTypes.INTEGER.UNSIGNED,
    },
    cardNo: {
      type: DataTypes.INTEGER,
    },
  });
  return SetupDefaultBankAccount;
};
