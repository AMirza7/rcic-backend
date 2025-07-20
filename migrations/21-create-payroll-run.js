'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // --- Existing PayrollRuns table ---
    await queryInterface.createTable('PayrollRuns', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        allowNull: false,
        primaryKey: true,
      },
      consultantId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'Consultants', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
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

    // --- New PayrollBatches table ---
    await queryInterface.createTable('PayrollBatches', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        allowNull: false,
        primaryKey: true,
      },
      batchNumber: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      },
      consultantId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'Consultants', key: 'id' },
        onDelete: 'CASCADE',
      },
      totalAmount: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
      },
      entryCount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      processedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('processed', 'paid', 'cancelled'),
        allowNull: false,
      },
      paymentMethod: {
        type: Sequelize.ENUM('bank_transfer', 'check', 'direct_deposit'),
        allowNull: false,
      },
      notes: {
        type: Sequelize.TEXT,
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

  async down(queryInterface, Sequelize) {
    // Drop PayrollBatches first (to avoid FK conflicts)
    await queryInterface.dropTable('PayrollBatches');
    // Clean up ENUM types for PayrollBatches
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_PayrollBatches_status";'
    );
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_PayrollBatches_paymentMethod";'
    );

    // Then drop the original PayrollRuns table
    await queryInterface.dropTable('PayrollRuns');
    // No enums on PayrollRuns, so nothing else to drop
  },
};
