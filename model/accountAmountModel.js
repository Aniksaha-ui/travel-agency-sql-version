module.exports = (sequelize, DataTypes) => {
    const AccountAmount = sequelize.define("account_amount", {
      bankName: {
        type: DataTypes.INTEGER.UNSIGNED,
      },
      existAmount: {
        type: DataTypes.INTEGER,
      },
    });
    return AccountAmount;
  };
  