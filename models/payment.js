"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Payment.init(
    {
      userid: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      workerid: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dealid: { type: DataTypes.STRING, allowNull: false },
      transactionid: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "Payment",
      tableName: "payment",
    }
  );
  return Payment;
};
