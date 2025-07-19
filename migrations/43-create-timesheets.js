// migrations/20250719000005-create-timesheets.js
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Timesheets', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        primaryKey: true
      },
      employeeId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'Employees', key: 'id' },
        onDelete: 'CASCADE'
      },
      consultantId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'Consultants', key: 'id' },
        onDelete: 'CASCADE'
      },
      payPeriodStart: {
        type: Sequelize.DATE,
        allowNull: false
      },
      payPeriodEnd: {
        type: Sequelize.DATE,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('draft','submitted','approved','rejected','paid'),
        allowNull: false,
        defaultValue: 'draft'
      },
      totalHours: {
        type: Sequelize.JSONB,
        allowNull: false
      },
      submittedAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      submittedBy: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'Users', key: 'id' },
        onDelete: 'SET NULL'
      },
      approvedAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      approvedBy: {
        type: Sequelize.UUID,
        allowNull: true,
        references: { model: 'Users', key: 'id' },
        onDelete: 'SET NULL'
      },
      rejectedAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      rejectionReason: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      payrollProcessed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      payrollRecordId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: { model: 'PayrollRecords', key: 'id' },
        onDelete: 'SET NULL'
      },
      metadata: {
        type: Sequelize.JSONB,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Timesheets');
  }
};
