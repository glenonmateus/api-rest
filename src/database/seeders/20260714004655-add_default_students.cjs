'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('students', [
      {
        name: 'John',
        surname: 'Doe',
        email: 'oIh8W@example.com',
        age: 20,
        weight: 80,
        height: 1.70,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Jane',
        surname: 'Doe',
        email: '0G0tI@example.com',
        age: 20,
        weight: 70,
        height: 1.60,
        created_at: new Date(),
        updated_at: new Date(),
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('students', null, {});
  }
};
