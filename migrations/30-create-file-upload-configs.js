'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Ensure UUID generator is available
    await queryInterface.sequelize.query(
      `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`
    );

    // Create the FileUploadConfigs table
    await queryInterface.createTable('FileUploadConfigs', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        allowNull: false,
        primaryKey: true,
      },
      maxFileSize: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      allowedTypes: {
        type: Sequelize.JSONB,
        allowNull: false,
        defaultValue: [],
      },
      uploadUrl: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      compressionEnabled: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      virusScanning: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      retentionPeriod: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
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
    await queryInterface.dropTable('FileUploadConfigs');
  },
};
