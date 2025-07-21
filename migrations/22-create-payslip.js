'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Payslips', {
      // Primary key as UUID
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        allowNull: false,
        primaryKey: true,
      },

      // Foreign key to PayrollRuns
      payrollRunId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'PayrollRuns', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },

      // Monetary fields with explicit precision
      grossPay: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
      },
      taxDeducted: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
      },
      netPay: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
      },

      // File format & URL
      format: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      url: {
        type: Sequelize.STRING,
        allowNull: false,
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
    await queryInterface.dropTable('Payslips');
  },
};
