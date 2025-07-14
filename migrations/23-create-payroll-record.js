'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PayrollRecords', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id: {
        type: Sequelize.UUID
      },
      employeeId: {
        type: Sequelize.UUID
      },
      payPeriodStart: {
        type: Sequelize.DATE
      },
      payPeriodEnd: {
        type: Sequelize.DATE
      },
      hoursWorked: {
        type: Sequelize.FLOAT
      },
      regularHours: {
        type: Sequelize.FLOAT
      },
      overtimeHours: {
        type: Sequelize.FLOAT
      },
      grossPay: {
        type: Sequelize.FLOAT
      },
      deductions: {
        type: Sequelize.JSON
      },
      netPay: {
        type: Sequelize.FLOAT
      },
      paymentDate: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.STRING
      },
      payslipUrl: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PayrollRecords');
  }
};