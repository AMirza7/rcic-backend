'use strict';

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
        type: Sequelize.STRING,
        allowNull: false,
      },
      provider: {
        type: Sequelize.ENUM('stripe', 'paypal', 'other'),
        allowNull: false,
      },
      credentials: {
        type: Sequelize.JSONB,
        allowNull: false,
      },
      enabled: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      settings: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      metadata: {
        type: Sequelize.JSONB,
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

    // Clean up the provider enum type
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_PaymentProcessors_provider";'
    );
  },
};
