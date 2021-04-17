"use strict";
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("Bookings", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userid: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      workerid: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      dealid: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      transactionid: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      status: { type: DataTypes.STRING, allowNull: true },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable("Bookings");
  },
};
