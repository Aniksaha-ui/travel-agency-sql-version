module.exports = (sequelize, DataTypes) => {
    const BankDeposite = sequelize.define("bank_deposits", {
      accountInfoId:{
        type: DataTypes.INTEGER,  // accountInfoModel -> id hobe
      },
      customer_card_no: {
        type: DataTypes.STRING,
      },
      amount: {
        type: DataTypes.STRING,
      },
      remarks: {
        type: DataTypes.STRING,
      },
    });
    return BankDeposite;
  };
  