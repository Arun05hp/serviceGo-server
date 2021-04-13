"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Deals extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Deals.init(
    {
      userid: {
        allowNull: false,
        type: DataTypes.STRING,
      },

      workerid: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      duration: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      startDate: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      amount: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Deals",
      tableName: "deals",
    }
  );
  return Deals;
};
