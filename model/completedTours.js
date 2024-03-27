module.exports = (sequelize, DataTypes) => {
  const CompletedToursHistory = sequelize.define("completed_tours_history", {
    batchId: {
      type: DataTypes.INTEGER,
    },
    tourId: {
      type: DataTypes.INTEGER,
    },
    date: {
      type: DataTypes.STRING,
    },
  });
  return CompletedToursHistory;
};
