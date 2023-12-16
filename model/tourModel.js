module.exports = (sequelize, DataTypes) => {
    const Tour = sequelize.define("tours", {
      tour_name: {
        type: DataTypes.STRING,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING,
        default: "P",
      },
      short_description: {
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.STRING,
        default:
          "https://news.maxabout.com/wp-content/uploads/2020/01/BMW-M8-Competition.jpg",
      },
      guideId:{
        type: DataTypes.STRING,
        default:
          "https://news.maxabout.com/wp-content/uploads/2020/01/BMW-M8-Competition.jpg",
        allowNull: true,
      },
      available_seat:{
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      original_costing: {  
        type: DataTypes.INTEGER,
        allowNull: true
    },
    cost: {  
        type: DataTypes.INTEGER,
        allowNull: true
    },
    status: {
        type: DataTypes.STRING,
        allowNull: true,
        default: "A"
      }
    });
    return Tour;
  };
  