module.exports = (sequelize, DataTypes) => {
    const CompanyAccountHistory = sequelize.define("company_account_history", {
      accountId: {
        type: DataTypes.INTEGER,
      },
      type: {
        type: DataTypes.STRING,
      },
      available_seat: {
        type: DataTypes.INTEGER,
      },
      purpose: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
      },
      date: {
        type: DataTypes.STRING,
      },
    });
    return CompanyAccountHistory;
  };
  