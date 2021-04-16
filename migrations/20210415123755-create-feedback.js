"use strict";
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("feedbacks", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      userid: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      rating: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      recommend: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      comment: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable("feedbacks");
  },
};
