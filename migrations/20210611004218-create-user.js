'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      eventTitle: {
        type: Sequelize.STRING
      },
      attendee1Name: {
        type: Sequelize.STRING
      },
      attendee2Name: {
        type: Sequelize.STRING
      },
      attendee3Name: {
        type: Sequelize.STRING
      },
      eventSummary: {
        type: Sequelize.STRING
      },
      insertLinktoPhoto: {
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
    await queryInterface.dropTable('Users');
  }
};