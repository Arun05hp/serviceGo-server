"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class feedback extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  feedback.init(
    {
      userid: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      rating: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      recommend: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      comment: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "feedback",
      modelName: "feedback",
    }
  );
  return feedback;
};
