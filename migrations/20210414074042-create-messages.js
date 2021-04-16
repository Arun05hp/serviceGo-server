"use strict";
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("Messages", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      messages: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      status: { type: DataTypes.STRING, allowNull: true },
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
    await queryInterface.dropTable("Messages");
  },
};
