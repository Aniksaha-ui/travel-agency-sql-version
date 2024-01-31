module.exports = (sequelize, DataTypes) => {
  const BankAccounts = sequelize.define("bank_accounts", {
    accountNo: {
      type: DataTypes.INTEGER,
    },
    cardNo: {
      type: DataTypes.INTEGER,
    },
    bankName: {
      type: DataTypes.STRING,
    },
    ref: {
      type: DataTypes.STRING,
    },
    responsiablePerson: {
      type: DataTypes.STRING,
    },
    branch: {
      type: DataTypes.STRING,
      default: "Dhaka",
    },
  });
  return BankAccounts;
};
