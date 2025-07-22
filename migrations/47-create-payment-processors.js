'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PaymentProcessors', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      provider: {
        type: Sequelize.ENUM('stripe', 'paypal', 'other'),
        allowNull: false,
        defaultValue: 'stripe',
      },
      credentials: {
        type: Sequelize.JSONB,
        allowNull: false,
        defaultValue: {},
      },
      enabled: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      settings: {
        type: Sequelize.JSONB,
        allowNull: true,
        defaultValue: {},
      },
      metadata: {
        type: Sequelize.JSONB,
        allowNull: true,
        defaultValue: {},
      },

      // ——— New fee fields, converted from FLOAT to DECIMAL ———
      feePercent: {
        type: Sequelize.DECIMAL(5,2),
        allowNull: false,
        defaultValue: 0.00,
      },
      transactionFee: {
        type: Sequelize.DECIMAL(12,2),
        allowNull: true,
      },

      // Standard timestamps
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },

  async down(queryInterface) {
    // Drop the table
    await queryInterface.dropTable('PaymentProcessors');
  },
};
