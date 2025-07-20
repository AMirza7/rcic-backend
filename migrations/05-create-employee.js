'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Employees', {
      // Primary key as UUID
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        allowNull: false,
        primaryKey: true,
      },

      // Link back to user account
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'Users', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },

      // (Optional) self‑reference or external employee identifier
      employeeId: {
        type: Sequelize.UUID,
        allowNull: true,
        // If this links to another employee record (e.g., manager), you could enable:
        // references: { model: 'Employees', key: 'id' },
        // onDelete: 'SET NULL',
        // onUpdate: 'CASCADE'
      },

      // Consultant relationship
      consultantId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'Consultants', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },

      position: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      department: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      hireDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      salary: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      hourlyRate: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      employmentType: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'active',
      },

      permissions: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      workSchedule: {
        type: Sequelize.JSON,
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
    }); // end createTable
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Employees');
  },
};
