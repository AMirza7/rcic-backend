'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Ensure UUID generation extension is enabled
    await queryInterface.sequelize.query(
      `CREATE EXTENSION IF NOT EXISTS "pgcrypto";`
    );

    // Create StorageUsages table
    await queryInterface.createTable('StorageUsages', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'Users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      totalUsed: {
        type: Sequelize.BIGINT,
        allowNull: false,
        defaultValue: 0,
      },
      totalLimit: {
        type: Sequelize.BIGINT,
        allowNull: false,
        defaultValue: 0,
      },
      usagePercentage: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: false,
        defaultValue: 0.00,
      },
      breakdown: {
        type: Sequelize.JSONB,
        allowNull: false,
        defaultValue: {
          documents: 0,
          images: 0,
          templates: 0,
          backups: 0,
          other: 0,
        },
      },
      lastUpdated: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
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

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('StorageUsages');
  },
};
