'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PayrollRecords', {
      // Primary key as UUID
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        allowNull: false,
        primaryKey: true,
      },

      // Foreign key to Employees
      employeeId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'Employees', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },

      // Payroll period
      payPeriodStart: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      payPeriodEnd: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },

      // Hours & pay details
      hoursWorked: {
        type: Sequelize.DECIMAL(12,2),
        allowNull: false,
      },
      regularHours: {
        type: Sequelize.DECIMAL(12,2),
        allowNull: true,
      },
      overtimeHours: {
        type: Sequelize.DECIMAL(12,2),
        allowNull: true,
      },
      grossPay: {
        type: Sequelize.DECIMAL(12,2),
        allowNull: false,
      },
      deductions: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      netPay: {
        type: Sequelize.DECIMAL(12,2),
        allowNull: false,
      },
      paymentDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },

      // Record status & link
      status: {
        type: Sequelize.ENUM('pending','processed','paid','cancelled'),
        allowNull: false,
        defaultValue: 'pending',
      },
      payslipUrl: {
        type: Sequelize.STRING,
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
    // Drop the table
    await queryInterface.dropTable('PayrollRecords');

    // Clean up the status enum in Postgres
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_PayrollRecords_status";'
    );
  },
};
