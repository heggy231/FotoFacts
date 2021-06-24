"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Photos",
      [
        {
          title: "fun on the beach",
          category: "vacation",
          attendee1FirstName: "Heggy",
          attendee1LastName: "Lee",
          attendee2FirstName: "Teila",
          attendee2LastName: "Jong",
          attendee3FirstName: "Avery",
          attendee3LastName: "Do",
          description: "Fun outing on Santa Cruz",
          url: "https://placeimg.com/300/300/any",
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Photos", null, {});
  },
};
