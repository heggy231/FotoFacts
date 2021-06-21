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
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
<<<<<<< HEAD:migrations/20210618021407-create-user.js
      avatar: {
=======
      avatarURL: {
        type: Sequelize.STRING
      },
      loginStrategy: {
        type: Sequelize.STRING
      },
      loginStrategyId: {
        type: Sequelize.STRING
      },
      username: {
>>>>>>> main:migrations/20210620044003-create-user.js
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