"use strict";
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("Notification", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
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
    await queryInterface.dropTable("Notification");
  },
};
