"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Bookings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Bookings.init(
    {
      userid: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      workerid: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      jobid: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      transactionid: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Bookings",
      tableName: "booking",
    }
  );
  return Bookings;
};
