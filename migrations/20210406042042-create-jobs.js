"use strict";
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("Jobs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
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
      serviceCharge: { type: STRING, allowNull: true },
      feedback: { type: DataTypes.STRING, allowNull: true },
      earning: { type: DataTypes.STRING, allowNull: true },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable("Jobs");
  },
};
