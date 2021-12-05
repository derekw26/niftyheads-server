'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const allUsers = await queryInterface.sequelize.query(
      `SELECT id FROM "Users"`
    );

    const firstUser = allUsers[0][0];

    await queryInterface.bulkInsert('Avatars', [
      {
        "uuid": "03dcf53a-70ad-4543-8c10-a8217b0273f4",
        "name": null,
        "category": null,
        "url": "https://avatars.dicebear.com/api/bottts/testing.svg",
        "createdBy": null,
        "price": null,
        "listed": null,
        "createdAt": "2021-12-03T07:50:32.319Z",
        "updatedAt": "2021-12-03T07:50:32.319Z",
        "userId": firstUser.id
      },
      {
        "uuid": "b7c10d13-ca3b-46be-b089-a9bcb14853c1",
        "name": null,
        "category": null,
        "url": "https://avatars.dicebear.com/api/bottts/123.svg",
        "createdBy": null,
        "price": null,
        "listed": null,
        "createdAt": "2021-12-03T08:02:51.622Z",
        "updatedAt": "2021-12-03T08:02:51.622Z",
        "userId": firstUser.id
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Avatars', null, {});
  }
};
