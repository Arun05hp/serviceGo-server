"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Messages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Messages.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      messages: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: { type: DataTypes.STRING, allowNull: true },
    },
    {
      sequelize,
      tableName: "messages",
      modelName: "Messages",
    }
  );
  return Messages;
};
