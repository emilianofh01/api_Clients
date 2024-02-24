"use strict";

const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const clients = Array.from({ length: 20 }, (_, index) => {
      return {
        id: faker.string.uuid(),
        name: `${faker.person.firstName()} ${faker.person.lastName()}`,
        email: faker.internet.email()
      };
    });
    clients.push({
      id: "05c45274-774f-4038-80c1-d49f08249d36",
      name: "Keyla",
      email: "keyla@gmail.com"
    });
    console.log(clients);
    await queryInterface.bulkInsert("clients", clients, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
