"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          firstName: "Annie",
          lastName: "Easley",
          email: "ajeasley@nasa.gov",
          avatarURL: "https://placeimg.com/128/128/animals/grayscale",
          loginStrategy: "github",
          loginStrategyId: "1234",
          username: "annieEa",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
