'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Employees', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id: {
        type: Sequelize.UUID
      },
      userId: {
        type: Sequelize.UUID
      },
      employeeId: {
        type: Sequelize.UUID
      },
      consultantId: {
        type: Sequelize.UUID
      },
      position: {
        type: Sequelize.STRING
      },
      department: {
        type: Sequelize.STRING
      },
      hireDate: {
        type: Sequelize.DATE
      },
      salary: {
        type: Sequelize.FLOAT
      },
      hourlyRate: {
        type: Sequelize.FLOAT
      },
      employmentType: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      permissions: {
        type: Sequelize.JSON
      },
      workSchedule: {
        type: Sequelize.JSON
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
    await queryInterface.dropTable('Employees');
  }
};