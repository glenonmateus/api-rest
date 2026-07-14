'use strict';
const bcryptjs = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users',
      [
        {
          name: 'John',
          surname: 'Doe',
          email: 'johndoe@example.com',
          password_hash: bcryptjs.hashSync('0123456789', 8),
          created_at: new Date(),
          updated_at: new Date(),
        }
      ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
