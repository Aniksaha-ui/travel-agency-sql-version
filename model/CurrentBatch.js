module.exports = (sequelize, DataTypes) => {
  const CurrentBatch = sequelize.define("current_batch", {
    batch_no: {
      type: DataTypes.STRING,
    },
    tourId: {
      type: DataTypes.INTEGER,
    },
    available_seat: {
      type: DataTypes.INTEGER,
    },
    guideId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
    },
  });
  return CurrentBatch;
};
