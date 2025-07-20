'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Appointments', {
      // Primary key as UUID
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        allowNull: false,
        primaryKey: true,
      },

      // Foreign keys
      consultantId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'Consultants', key: 'id' },
        onDelete: 'CASCADE',
      },
      clientId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'Clients', key: 'id' },
        onDelete: 'CASCADE',
      },

      // Appointment details
      title: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      // Appointment type (advance vs walk‑in)
      type: {
        type: Sequelize.ENUM('walk-in', 'advance'),
        allowNull: false,
        defaultValue: 'advance',
      },

      // Status with full set of states
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

      // Timing
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

      // Location & Virtual meeting
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

      // Priority (could be low/medium/high per UI)
      priority: {
        type: Sequelize.ENUM('low', 'medium', 'high'),
        allowNull: false,
        defaultValue: 'medium',
      },

      // Financials
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

      // Misc
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

      // Timestamps
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()'),
      },
    });
  },  // <- comma here to separate up/down

  async down(queryInterface, Sequelize) {
    // Drop table first
    await queryInterface.dropTable('Appointments');

    // Clean up ENUM types in Postgres
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Appointments_type";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Appointments_status";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Appointments_mode";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Appointments_priority";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Appointments_paymentStatus";');
  },
};
