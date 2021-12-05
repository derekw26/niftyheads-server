'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Users', [
      {
        "uuid": "a652c3af-c809-4380-acaf-ffbce73c9841",
        "name": "Derek",
        "email": "derek@ga.com",
        "createdAt": "2021-12-03T08:25:35.436Z",
        "updatedAt": "2021-12-03T08:25:35.436Z"
      },
      {
        "uuid": "29d22212-160a-4f04-b310-400274a0cbcc",
        "name": "Anshul",
        "email": "anshul@ga.com",
        "createdAt": "2021-12-03T07:37:53.038Z",
        "updatedAt": "2021-12-03T07:37:53.038Z"
      }
    ], {});

  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('Users', null, {});
  }
};
