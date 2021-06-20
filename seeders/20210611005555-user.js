'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      eventTitle: "Teila's birthday",
      attendee1Name: 'Heggy',
      attendee2Name: 'Avery',
      attendee3Name: 'Dan',
      eventSummary: 'Best birthday party ever!',
      insertLinktoPhoto: 'https://placeimg.com/128/128/nature', 
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
