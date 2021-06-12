'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      category:"Birthday"
      eventTitle: "Teila's birthday",
      attendee1Name: 'Janelle',
      attendee2Name: 'Chloe',
      attendee3Name: 'Xavier',
      eventSummary: "Best birthday party ever.We went to Rays on the River for Dinner and danced the night away at MJQ",
      insertLinktoPhoto: 'public\images\BirthdayGuest.jpg', 
      createdAt: new Date(),
      updatedAt: new Date()
  }], {})
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
  }
};


// =======================================================================================

// Teila's Additions

// =======================================================================================

// Create 10 seeding data - 
//, Anniversary, Baby, Birthday, Funny, Graduation, Holidays, Trips, Weddings. Other
// {
//   category: 'Anniversary'
//   eventTitle: "Grandparents 50th Anniversary",
//   attendee1Name: 'Phillip',
//   attendee2Name: 'Ted',
//   attendee3Name: 'Kingsley',
//   eventSummary: '50th Year Anniversary of Grandparents marriag, Everyone came to celebrate even Lynn our long lost sister. It started at 7pm and ended at 2am',
//   insertLinktoPhoto: 'https://unsplash.com/photos/b4-zAXyBdyU',
//   createdAt: new Date(),
//   updatedAt: new Date()
// }
//{
  //   category: 'Baby'
  //   eventTitle: "Family Baby pictures",
  //   attendee1Name: 'Teila',
  //   attendee2Name: 'Heggy'
  //   attendee3Name: ' Avery'
  //   eventSummary: 'Mommas Babies',
  //   insertLinktoPhoto: 'public\images\BabyPhoto.JPG',
  //   createdAt: new Date(),
  //   updatedAt: new Date()
  // }
// {
//   category: 'Birthday'
//   eventTitle: "Teila's birthday",
//   attendee1Name: 'Teila',
//   attendee2Name: 'Chloe',
//   attendee3Name: 'Janelle',
//   eventSummary: 'Best birthday party ever! We went to Rays on the River for Dinner and danced the night away at MJQ',
//   insertLinktoPhoto: 'public\images\BirthdayGuest.jpg', 
//   createdAt: new Date(),
//   updatedAt: new Date()
// }
// {  
//   category: 'Birthday'
//   eventTitle: "Teila's birthday",
//   attendee1Name: 'Teila',
//   attendee2Name: '',
//   attendee3Name: '',
//   eventSummary: 'Bday look for the bday girl',
//   insertLinktoPhoto: 'public\images\Bday2020.JPG', 
//   createdAt: new Date(),
//   updatedAt: new Date()
// }
{
  //   category: 'Funny'
  //   eventTitle: "Funny pictures",
  //   attendee1Name: 'Teila',
  //   attendee2Name: '',
  //   attendee3Name: ;;,
  //   eventSummary: 'Let the good times roll',
  //   insertLinktoPhoto: 'https://unsplash.com/photos/HgZqt4MkIyQ',
  //   createdAt: new Date(),
  //   updatedAt: new Date()
  // }
  //   {
  //     category: 'Graduation'
  //     eventTitle: "Marks 2020 Graduation from Georgia State",
  //     attendee1Name: 'Teila',
  //     attendee2Name: 'Tiffany',
  //     attendee3Name: 'Megan',
  //     eventSummary: 'Class of 2021',
  //     insertLinktoPhoto: 'https://unsplash.com/photos/mPl2RgnIzkU',
  //     createdAt: new Date(),
  //     updatedAt: new Date()
  // }
  
//   {
//     category: 'Holiday'
//     eventTitle: "Xmas 2020",
//     attendee1Name: 'John',
//     attendee2Name: 'Dan',
//     attendee3Name: 'Matt',
//     eventSummary: 'Covid Xmas',
//     insertLinktoPhoto: 'https://unsplash.com/photos/nQqNjfOVvrs',
//     createdAt: new Date(),
//     updatedAt: new Date()
// }
// {
//   category: 'Trips'
//   eventTitle: "Summer vacation 2019",
//   attendee1Name: 'Teila',
//   attendee2Name: 'Heggie',
//   attendee3Name: 'Mark',
//   eventSummary: 'Bahams Trip 2019',
//   insertLinktoPhoto: 'https://unsplash.com/photos/3CTuFxZBra0',
//   createdAt: new Date(),
//   updatedAt: new Date()
// }
// 
// {
//     category: 'Wedding'
//     eventTitle: "Li Wedding",
//     attendee1Name: 'Phillip',
//     attendee2Name: 'Sarah',
//     attendee3Name: 'Kingsley',
//     eventSummary: 'Li Wedding June 2021 in Korea',
//     insertLinktoPhoto: 'https://unsplash.com/photos/DmzQhBMOGjg',
//     createdAt: new Date(),
//     updatedAt: new Date()
//   }