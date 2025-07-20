'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SubscriptionPlans', {
      // Primary key as UUID
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        allowNull: false,
        primaryKey: true,
      },

      // Plan identifier (slug or external ID)
      planKey: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },

      // Human‑readable names and description
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      displayName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      // Pricing
      price: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      yearlyPrice: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      currency: {
        type: Sequelize.STRING(3),
        allowNull: false,
      },
      billingInterval: {
        type: Sequelize.ENUM('monthly','yearly'),
        allowNull: false,
        defaultValue: 'monthly',
      },

      // Feature set and flags
      features: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      isPopular: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },

      // Timestamps
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

  async down(queryInterface, Sequelize) {
    // Drop the table
    await queryInterface.dropTable('SubscriptionPlans');

    // Drop the billingInterval enum type
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_SubscriptionPlans_billingInterval";'
    );
  },
};
