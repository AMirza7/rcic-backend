'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('FeatureFlags', {
      // Primary key as UUID
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        allowNull: false,
        primaryKey: true,
      },

      // Unique key identifier for the flag
      key: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },

      // Human‑readable name
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      // Detailed description
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      // On/off switch
      enabled: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

      // Percentage rollout (0–100)
      rolloutPercentage: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 100,
      },

      // JSON array of user‑group identifiers
      userGroups: {
        type: Sequelize.JSON,
        allowNull: true,
      },

      // JSON array of user IDs to exclude
      excludedUsers: {
        type: Sequelize.JSON,
        allowNull: true,
      },

      // Complex targeting conditions
      conditions: {
        type: Sequelize.JSON,
        allowNull: true,
      },

      // Who created this flag
      createdBy: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      // Optional expiry date for the flag
      expiresAt: {
        type: Sequelize.DATE,
        allowNull: true,
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
    await queryInterface.dropTable('FeatureFlags');
  }
};
