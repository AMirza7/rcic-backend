'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // 1) Create table with nullable FKs
    await queryInterface.createTable('AppointmentFeedbacks', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        allowNull: false,
        primaryKey: true,
      },
      appointmentId: {
        type: Sequelize.UUID,
        allowNull: true,    // make nullable until we add constraint
      },
      clientId: {
        type: Sequelize.UUID,
        allowNull: true,
      },
      consultantId: {
        type: Sequelize.UUID,
        allowNull: true,
      },
      feedback: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      rating: {
        type: Sequelize.INTEGER,
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

    // 2) Add FK for appointmentId → Appointments.id
    await queryInterface.addConstraint('AppointmentFeedbacks', {
      fields: ['appointmentId'],
      type: 'foreign key',
      name: 'fk_apptfeedbacks_appointmentId',
      references: { table: 'Appointments', field: 'id' },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    // 3) Add FK for clientId → Clients.id
    await queryInterface.addConstraint('AppointmentFeedbacks', {
      fields: ['clientId'],
      type: 'foreign key',
      name: 'fk_apptfeedbacks_clientId',
      references: { table: 'Clients', field: 'id' },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });

    // 4) Add FK for consultantId → Consultants.id
    await queryInterface.addConstraint('AppointmentFeedbacks', {
      fields: ['consultantId'],
      type: 'foreign key',
      name: 'fk_apptfeedbacks_consultantId',
      references: { table: 'Consultants', field: 'id' },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    // 1) Remove all FK constraints
    await queryInterface.removeConstraint('AppointmentFeedbacks', 'fk_apptfeedbacks_appointmentId');
    await queryInterface.removeConstraint('AppointmentFeedbacks', 'fk_apptfeedbacks_clientId');
    await queryInterface.removeConstraint('AppointmentFeedbacks', 'fk_apptfeedbacks_consultantId');
    // 2) Drop the table
    await queryInterface.dropTable('AppointmentFeedbacks');
  }
};
