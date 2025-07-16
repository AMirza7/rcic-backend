'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
    await queryInterface.createTable('FileUploadConfigs', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        allowNull: false,
        primaryKey: true
      },
      maxFileSize: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      allowedTypes: {
        type: Sequelize.JSONB,
        allowNull: false,
        defaultValue: []
      },
      uploadUrl: {
        type: Sequelize.STRING,
        allowNull: false
      },
      compressionEnabled: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      virusScanning: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      retentionPeriod: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()')
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('FileUploadConfigs');
  }
};
