const bcrypt = require('bcryptjs');
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const password = 'asd123'
    const hash = bcrypt.hashSync(password, 6)

    const seedUsernames =
    [
      'mechlord',
      'foundation',
      'lilitae',
      'kitasavi',
      'baushaus',
      'etiennedecrecy',
      'hexangel',
      'nocellcoverage',
      'obsolete',
      'itsreuben'
    ]

    const seedUuids =
    [
      '615e5137-e019-449a-8eca-2f10b0f98f6d',
      '1c7b4d24-ebd1-4375-8daa-80b969b1418e',
      '6f782e59-88b5-47ae-b6af-21ef59e869c4',
      'eec311dc-ad56-4da0-8ce2-1acbfd4992f0',
      'c42e4662-8581-400a-af69-866de5f4e885',
      '26229ab6-8b61-44ee-99d2-c90248dfcc5b',
      'b96ea1e1-6cb1-4827-b108-8118374a87ca',
      '40d5aa5a-5552-4f27-a58d-b5cc0d6da4f4',
      '869a9f1f-5558-476d-8c28-3ee148f3815a',
      '6fa5d2f3-4eba-4d4f-b255-2196eb58276a'
    ]

    const seedUsers = seedUsernames.map((user, index) => {
      return ({
        "uuid": seedUuids[index],
        "username": user,
        "email": `${user}@niftyheads.com`,
        "password": hash,
        "isAdmin": false,
        "createdAt": "2021-12-03T08:25:35.436Z",
        "updatedAt": "2021-12-03T08:25:35.436Z"
      })
    })

    await queryInterface.bulkInsert('Users', [
      {
        "uuid": "a652c3af-c809-4380-acaf-ffbce73c9841",
        "username": "derek",
        "email": "derek@niftyheads.com",
        "password": hash,
        "isAdmin": true,
        "createdAt": "2021-12-03T08:25:35.436Z",
        "updatedAt": "2021-12-03T08:25:35.436Z"
      },
      {
        "uuid": "29d22212-160a-4f04-b310-400274a0cbcc",
        "username": "anshul",
        "email": "anshul@niftyheads.com",
        "password": hash,
        "isAdmin": false,
        "createdAt": "2021-12-03T07:37:53.038Z",
        "updatedAt": "2021-12-03T07:37:53.038Z"
      },
      ...seedUsers
    ], {});

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Users', null, {});
  }
};
