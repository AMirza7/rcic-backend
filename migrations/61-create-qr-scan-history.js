// migrations/20250720-create-qr-scan-history.js
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
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
  },

  async down(queryInterface) {
    await queryInterface.dropTable('QRScanHistory');
  }
};
