module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define("categories", {
    category_name: {
      type: DataTypes.STRING,
    },
    remarks: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      default: "P",
    },
    image: {
      type: DataTypes.STRING,
      default:
        "https://news.maxabout.com/wp-content/uploads/2020/01/BMW-M8-Competition.jpg",
    },
  });

  return Category;
};
