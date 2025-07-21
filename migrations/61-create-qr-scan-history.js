// migrations/20250720-create-qr-scan-history.js
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // 1) Create the table
    await queryInterface.createTable('QRScanHistory', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        allowNull: false,
        primaryKey: true,
      },
      qrConnectorId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { table: 'QRConnectors', field: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      scannerId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: { table: 'Users', field: 'id' },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      scannedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      result: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      metadata: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
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

    // 2) Index qrConnectorId for quick lookups
    await queryInterface.addIndex('QRScanHistory', ['qrConnectorId'], {
      name: 'idx_qrscanhistory_connector'
    });

    // 3) Index scannedAt for time‑based queries
    await queryInterface.addIndex('QRScanHistory', ['scannedAt'], {
      name: 'idx_qrscanhistory_scannedAt'
    });
  },

  async down(queryInterface, Sequelize) {
    // 1) Remove indexes
    await queryInterface.removeIndex('QRScanHistory', 'idx_qrscanhistory_connector');
    await queryInterface.removeIndex('QRScanHistory', 'idx_qrscanhistory_scannedAt');

    // 2) Drop the table
    await queryInterface.dropTable('QRScanHistory');
  }
};
