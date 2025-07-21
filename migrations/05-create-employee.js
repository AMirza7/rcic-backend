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

      // (Optional) manager or mentor in the same table
      employeeId: {
        type: Sequelize.UUID,
        allowNull: true,
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
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      department: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },

      hireDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      salary: {
        type: Sequelize.DECIMAL(12,2),
        allowNull: true,
      },
      hourlyRate: {
        type: Sequelize.DECIMAL(12,2),
        allowNull: true,
      },
      employmentType: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },

      // Consider making this an ENUM if you have fixed statuses
      status: {
        type: Sequelize.STRING(20),
        allowNull: false,
        defaultValue: 'active',
      },

      permissions: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      workSchedule: {
        type: Sequelize.JSONB,
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

    // Add self‑referential FK for employeeId → Employees.id
    await queryInterface.addConstraint('Employees', {
      fields: ['employeeId'],
      type: 'foreign key',
      name: 'fk_employees_manager',
      references: {
        table: 'Employees',
        field: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove self‑FK first
    await queryInterface.removeConstraint('Employees', 'fk_employees_manager');
    // Then drop the table
    await queryInterface.dropTable('Employees');
  },
};
