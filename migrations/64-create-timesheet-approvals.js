'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TimesheetApprovals', {
      // Primary key as UUID
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        allowNull: false,
        primaryKey: true,
      },

      // FK to Timesheets
      timesheetId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'Timesheets', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },

      // Who approved (user id)
      approverId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'Employees', key: 'id' }, // or 'Users' if appropriate
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },

      // Role of the approver (admin or consultant)
      approverRole: {
        type: Sequelize.ENUM('admin', 'consultant'),
        allowNull: false,
      },

      // Approval status
      status: {
        type: Sequelize.ENUM('pending', 'approved', 'rejected'),
        allowNull: false,
        defaultValue: 'pending',
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
    // Drop table and associated enums
    await queryInterface.dropTable('TimesheetApprovals');
  },
};
