'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AppointmentFeedbacks', {
      // Primary key as UUID
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        allowNull: false,
        primaryKey: true,
      },

      // Foreign key to Appointments
      appointmentId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'Appointments', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },

      // Foreign key to Clients
      clientId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'Clients', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },

      // Foreign key to Consultants
      consultantId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'Consultants', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },

      rating: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      feedback: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      categories: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      wouldRecommend: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      submittedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },

      isPublic: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },

      // Standard timestamps
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
    await queryInterface.dropTable('AppointmentFeedbacks');
  },
};
