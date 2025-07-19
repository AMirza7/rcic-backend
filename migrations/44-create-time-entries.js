// migrations/20250719000006-create-time-entries.js
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TimeEntries', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        primaryKey: true
      },
      timesheetId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'Timesheets', key: 'id' },
        onDelete: 'CASCADE'
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      startTime: {
        type: Sequelize.STRING,
        allowNull: false
      },
      endTime: {
        type: Sequelize.STRING,
        allowNull: false
      },
      breakDuration: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      hoursWorked: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      entryType: {
        type: Sequelize.ENUM('regular','overtime','vacation','sick','holiday','training'),
        allowNull: false
      },
      taskDescription: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      clientId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: { model: 'Clients', key: 'id' },
        onDelete: 'SET NULL'
      },
      projectId: {
        type: Sequelize.STRING,
        allowNull: true
      },
      billable: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      hourlyRate: {
        type: Sequelize.DECIMAL,
        allowNull: true
      },
      location: {
        type: Sequelize.ENUM('office','remote','client_site','other'),
        allowNull: false
      },
      approved: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      gpsLocation: {
        type: Sequelize.JSONB,
        allowNull: true
      },
      deviceInfo: {
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
    await queryInterface.dropTable('TimeEntries');
  }
};
