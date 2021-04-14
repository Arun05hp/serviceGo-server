"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Notification.init(
    {
      senderId: { type: DataTypes.INTEGER, allowNull: false },
      senderName: { type: DataTypes.STRING, allowNull: false },
      receiverId: { type: DataTypes.INTEGER, allowNull: false },

      receiverStatus: { type: DataTypes.INTEGER, allowNull: false },
      forId: { type: DataTypes.INTEGER, allowNull: false },
      title: { type: DataTypes.STRING, allowNull: false },
      query: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      for: { type: DataTypes.INTEGER, allowNull: false },
      status: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      tableName: "notification",
      modelName: "Notification",
    }
  );
  return Notification;
};
