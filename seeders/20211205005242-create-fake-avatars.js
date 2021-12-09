'use strict';
const _ = require('lodash');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const { names } = require('../config/names.js');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const allUsers = await queryInterface.sequelize.query(
      `SELECT id FROM "Users"`
    );

    const allUsersUuid = await queryInterface.sequelize.query(
      `SELECT uuid FROM "Users"`
    );

    const firstUser = allUsers[0][0];
    const firstUserUuid = allUsersUuid[0][0];
    console.log(firstUserUuid)

    const indexOfSeedUsers = Array.from(Array(12).keys());

    const avatarCategories =
    [
      'adventurer',
      'avataaars',
      'big-ears',
      'big-smile',
      'bottts',
      'croodles',
      'micah',
      'miniavs',
      'open-peeps',
      'personas',
      'pixel-art'
    ]

    const seedData = Array.from({length: 40}, () => Math.random() );
    const seedUuids = Array.from({length: 40}, () => uuidv4());

    const seedAvatars = seedUuids.map((uuid, index) => {

      const category = _.sample(avatarCategories)
      const randomUser = _.sample(indexOfSeedUsers)
      const randomPrice = _.round(Math.random() * 100, 2)

      return (
        {
          "uuid": uuid,
          "name": names[index].two_word_name,
          "category": category,
          "url": `https://avatars.dicebear.com/api/${category}/${seedData[index]}.svg`,
          "createdBy": allUsersUuid[0][randomUser].uuid,
          "price": randomPrice,
          "listed": true,
          "createdAt": "2021-12-03T07:50:32.319Z",
          "updatedAt": "2021-12-03T07:50:32.319Z",
          "userId": allUsers[0][randomUser].id
        }
      )
    })

    await queryInterface.bulkInsert('Avatars', [
      {
        "uuid": "03dcf53a-70ad-4543-8c10-a8217b0273f4",
        "name": "Big Bertha",
        "category": 'bottts',
        "url": "https://avatars.dicebear.com/api/bottts/testing.svg",
        "createdBy": firstUserUuid.uuid,
        "price": null,
        "listed": false,
        "createdAt": "2021-12-03T07:50:32.319Z",
        "updatedAt": "2021-12-03T07:50:32.319Z",
        "userId": firstUser.id
      },
      {
        "uuid": "b7c10d13-ca3b-46be-b089-a9bcb14853c1",
        "name": "Dark Magic",
        "category": 'bottts',
        "url": "https://avatars.dicebear.com/api/bottts/123.svg",
        "createdBy": firstUserUuid.uuid,
        "price": null,
        "listed": false,
        "createdAt": "2021-12-03T08:02:51.622Z",
        "updatedAt": "2021-12-03T08:02:51.622Z",
        "userId": firstUser.id
      },
      ...seedAvatars
    ], {});
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Avatars', null, {});
  }
};
