'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Plants', [{ 
      name: "Homer", 
      type: "Dragon Tree",
      waterFrequency: 7, 
      lastWatered: 3, 
      meter: 4, 
      image: "https://www.flickr.com/photos/blumenbiene/6622409259",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    { 
      name: "Beauregard", 
      type: "Golden Pothos",
      waterFrequency: 10, 
      lastWatered: 3, 
      meter: 7, 
      image: "https://www.flickr.com/photos/jayjayc/3153687992",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    { 
      name: "Lola", 
      type: "Marble Queen Pothos",
      waterFrequency: 10, 
      lastWatered: 3, 
      meter: 7, 
      image: "https://www.flickr.com/photos/28352994",
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Plants', null, {});
  }
};
