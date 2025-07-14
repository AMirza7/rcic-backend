'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Appointments', [
      {
        id: uuidv4(),
        consultantId: '11111111-1111-1111-1111-111111111111',
        clientId:     '22222222-2222-2222-2222-222222222222',
        date:         '2025-08-01',
        time:         '10:00',
        createdAt:    new Date(),
        updatedAt:    new Date(),
      },
      {
        id: uuidv4(),
        consultantId: '11111111-1111-1111-1111-111111111111',
        clientId:     '33333333-3333-3333-3333-333333333333',
        date:         '2025-08-02',
        time:         '14:30',
        createdAt:    new Date(),
        updatedAt:    new Date(),
      },
      {
        id: uuidv4(),
        consultantId: '44444444-4444-4444-4444-444444444444',
        clientId:     '22222222-2222-2222-2222-222222222222',
        date:         '2025-08-03',
        time:         '09:15',
        createdAt:    new Date(),
        updatedAt:    new Date(),
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Appointments', null, {});
  }
};
