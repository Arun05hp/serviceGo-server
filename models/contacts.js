"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Contacts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Contacts.init(
    {
      userid: { type: DataTypes.STRING, allowNull: false },
      uuid: { type: DataTypes.STRING, allowNull: false },
      contacts: {
        type: DataTypes.JSON,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "contacts",
      modelName: "Contacts",
    }
  );
  return Contacts;
};
