'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('photos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      category: {
        type: Sequelize.STRING
      },
      attendee1FirstName: {
        type: Sequelize.STRING
      },
      attendee1LastName: {
        type: Sequelize.STRING
      },
      attendee2FirstName: {
        type: Sequelize.STRING
      },
      attendee2LastName: {
        type: Sequelize.STRING
      },
      attendee3FirstName: {
        type: Sequelize.STRING
      },
      attendee3LastName: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('photos');
  }
};