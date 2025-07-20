'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Use pgcrypto for gen_random_uuid()
    await queryInterface.sequelize.query(
      `CREATE EXTENSION IF NOT EXISTS "pgcrypto";`
    );

    await queryInterface.createTable('AuditLogs', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        allowNull: false,
        primaryKey: true,
      },
      action: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      entity: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      entityId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      changes: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: { model: 'Users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
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
    await queryInterface.dropTable('AuditLogs');

    // No custom ENUM types to drop for AuditLogs, but kept here for future-proofing
    // e.g. await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_AuditLogs_xyz";');
  },
};
