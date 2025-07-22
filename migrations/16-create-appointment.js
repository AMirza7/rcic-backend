// migrations/16-create-appointment.js
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // 1) Create the Appointments table
    await queryInterface.createTable('Appointments', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        allowNull: false,
        primaryKey: true,
      },
      consultantId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'Consultants', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      clientId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'Clients', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      title: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      type: {
        type: Sequelize.ENUM('walk-in', 'advance'),
        allowNull: false,
        defaultValue: 'advance',
      },
      status: {
        type: Sequelize.ENUM(
          'pending',
          'confirmed',
          'scheduled',
          'in_progress',
          'completed',
          'cancelled',
          'rescheduled',
          'no_show'
        ),
        allowNull: false,
        defaultValue: 'pending',
      },
      startTime: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      endTime: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      duration: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: 'Duration in minutes',
      },
      address: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      meetingUrl: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },
      mode: {
        type: Sequelize.ENUM('video', 'in-person'),
        allowNull: false,
        defaultValue: 'in-person',
      },
      priority: {
        type: Sequelize.ENUM('low', 'medium', 'high'),
        allowNull: false,
        defaultValue: 'medium',
      },
      amount: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: true,
        comment: 'Fee for this appointment',
      },
      currency: {
        type: Sequelize.STRING(10),
        allowNull: true,
      },
      paymentStatus: {
        type: Sequelize.ENUM('pending', 'paid', 'failed', 'refunded'),
        allowNull: true,
        defaultValue: 'pending',
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      reminderSent: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      attendees: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      documents: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      consultantName: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      clientEmail: {
        type: Sequelize.STRING(254),
        allowNull: false,
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

    // 2) Add performance indexes
    await queryInterface.addIndex('Appointments', ['consultantId'], {
      name: 'idx_appointments_consultant_id'
    });
    await queryInterface.addIndex('Appointments', ['clientId'], {
      name: 'idx_appointments_client_id'
    });
    await queryInterface.addIndex('Appointments', ['startTime'], {
      name: 'idx_appointments_date'
    });
    await queryInterface.addIndex('Appointments', ['status'], {
      name: 'idx_appointments_status'
    });
  },

  async down(queryInterface, Sequelize) {
    // 1) Remove indexes
    await queryInterface.removeIndex('Appointments', 'idx_appointments_status');
    await queryInterface.removeIndex('Appointments', 'idx_appointments_date');
    await queryInterface.removeIndex('Appointments', 'idx_appointments_client_id');
    await queryInterface.removeIndex('Appointments', 'idx_appointments_consultant_id');

    // 2) Drop the table
    await queryInterface.dropTable('Appointments');
  },
};
