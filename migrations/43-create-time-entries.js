'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TimeEntries', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        allowNull: false,
        primaryKey: true,
      },
      timesheetId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'Timesheets', key: 'id' },
        onDelete: 'CASCADE',
      },
      employeeId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'Users', key: 'id' },
        onDelete: 'CASCADE',
      },
      consultantId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'Users', key: 'id' },
        onDelete: 'SET NULL',
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      startTime: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      endTime: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      totalHours: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: false,
      },
      clientName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      projectType: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      taskCategory: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM(
          'submitted',
          'approved',
          'rejected',
          'consultant_approved'
        ),
        allowNull: false,
        defaultValue: 'submitted',
      },
      rejectionReason: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      hourlyRate: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
      },
      totalAmount: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
      },
      submittedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      consultantReviewedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      adminReviewedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      payrollStatus: {
        type: Sequelize.ENUM('pending', 'processed', 'paid'),
        allowNull: false,
        defaultValue: 'pending',
      },
      payrollBatch: {
        type: Sequelize.STRING(50),
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
    // Drop the table
    await queryInterface.dropTable('TimeEntries');
  },
};
