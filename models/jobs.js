"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Jobs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      this.belongsTo(User, { foreignKey: "id", as: "user" });
    }
  }
  Jobs.init(
    {
      userid: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      specializedArea: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      experience: { type: DataTypes.STRING, allowNull: false },
      images: { type: DataTypes.STRING, allowNull: false },
      serviceCharge: { type: DataTypes.DATE, allowNull: true },
      feedback: { type: DataTypes.STRING, allowNull: true },
      earning: { type: DataTypes.STRING, allowNull: true },
    },

    {
      sequelize,
      tableName: "jobs",
      modelName: "Jobs",
    }
  );
  return Jobs;
};
