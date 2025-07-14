'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Messages', [
      {
        id:         uuidv4(),
        senderId:   '11111111-1111-1111-1111-111111111111',
        recipientId:'22222222-2222-2222-2222-222222222222',
        content:    'Hi there! Looking forward to our appointment.',
        timestamp:  new Date('2025-07-20T10:00:00Z'),
        createdAt:  new Date(),
        updatedAt:  new Date(),
      },
      {
        id:         uuidv4(),
        senderId:   '22222222-2222-2222-2222-222222222222',
        recipientId:'11111111-1111-1111-1111-111111111111',
        content:    'Thanks! I’ll see you then.',
        timestamp:  new Date('2025-07-20T10:05:00Z'),
        createdAt:  new Date(),
        updatedAt:  new Date(),
      },
      {
        id:         uuidv4(),
        senderId:   '33333333-3333-3333-3333-333333333333',
        recipientId:'44444444-4444-4444-4444-444444444444',
        content:    'Can we reschedule?',
        timestamp:  new Date('2025-07-22T15:00:00Z'),
        createdAt:  new Date(),
        updatedAt:  new Date(),
      },
      {
        id:         uuidv4(),
        senderId:   '44444444-4444-4444-4444-444444444444',
        recipientId:'33333333-3333-3333-3333-333333333333',
        content:    'Sure – how’s next Monday?',
        timestamp:  new Date('2025-07-22T15:10:00Z'),
        createdAt:  new Date(),
        updatedAt:  new Date(),
      },
      {
        id:         uuidv4(),
        senderId:   '11111111-1111-1111-1111-111111111111',
        recipientId:'33333333-3333-3333-3333-333333333333',
        content:    'Reminder: your appointment is tomorrow at 9:15.',
        timestamp:  new Date('2025-07-31T12:00:00Z'),
        createdAt:  new Date(),
        updatedAt:  new Date(),
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Messages', null, {});
  }
};
