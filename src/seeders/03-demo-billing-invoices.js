'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('BillingInvoices', [
      {
        id:           uuidv4(),
        clientId:     '22222222-2222-2222-2222-222222222222',
        amount:       150.00,
        currency:     'CAD',
        status:       'paid',
        issuedAt:     new Date('2025-07-01T09:00:00Z'),
        paidAt:       new Date('2025-07-02T14:30:00Z'),
        createdAt:    new Date(),
        updatedAt:    new Date(),
      },
      {
        id:           uuidv4(),
        clientId:     '33333333-3333-3333-3333-333333333333',
        amount:       200.00,
        currency:     'CAD',
        status:       'unpaid',
        issuedAt:     new Date('2025-07-05T11:15:00Z'),
        paidAt:       null,
        createdAt:    new Date(),
        updatedAt:    new Date(),
      },
      {
        id:           uuidv4(),
        clientId:     '22222222-2222-2222-2222-222222222222',
        amount:       100.00,
        currency:     'CAD',
        status:       'paid',
        issuedAt:     new Date('2025-07-10T10:00:00Z'),
        paidAt:       new Date('2025-07-11T16:45:00Z'),
        createdAt:    new Date(),
        updatedAt:    new Date(),
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('BillingInvoices', null, {});
  }
};
