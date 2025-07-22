// migrations/17-create-appointment-feedback.js
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // 1) Create the table
    await queryInterface.createTable('AppointmentFeedbacks', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        allowNull: false,
        primaryKey: true
      },
      appointmentId: {
        type: Sequelize.UUID,
        allowNull: false
      },
      clientId: {
        type: Sequelize.UUID,
        allowNull: false
      },
      consultantId: {
        type: Sequelize.UUID,
        allowNull: false
      },
      rating: {
        type: Sequelize.INTEGER,
        allowNull: true,
        validate: { min: 1, max: 5 }
      },
      comments: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      }
    });

    // 2) Add individual FKs
    await queryInterface.addConstraint('AppointmentFeedbacks', {
      fields: ['appointmentId'],
      type: 'foreign key',
      name: 'fk_feedback_appointment',
      references: { table: 'Appointments', field: 'id' },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    await queryInterface.addConstraint('AppointmentFeedbacks', {
      fields: ['clientId'],
      type: 'foreign key',
      name: 'fk_feedback_client',
      references: { table: 'Clients', field: 'id' },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    await queryInterface.addConstraint('AppointmentFeedbacks', {
      fields: ['consultantId'],
      type: 'foreign key',
      name: 'fk_feedback_consultant',
      references: { table: 'Consultants', field: 'id' },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    // 3) Create trigger function to enforce appointment.clientId = feedback.clientId
    await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION validate_feedback_client() RETURNS trigger AS $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM "Appointments"
          WHERE id = NEW."appointmentId" AND "clientId" = NEW."clientId"
        ) THEN
          RAISE EXCEPTION 'Appointment % does not belong to client %', NEW."appointmentId", NEW."clientId";
        END IF;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `);

    // 4) Attach trigger to the table
    await queryInterface.sequelize.query(`
      CREATE TRIGGER trg_validate_feedback_client
      BEFORE INSERT OR UPDATE ON "AppointmentFeedbacks"
      FOR EACH ROW EXECUTE FUNCTION validate_feedback_client();
    `);
  },

  async down(queryInterface, Sequelize) {
    // 1) Drop trigger
    await queryInterface.sequelize.query(`DROP TRIGGER IF EXISTS trg_validate_feedback_client ON "AppointmentFeedbacks";`);
    await queryInterface.sequelize.query(`DROP FUNCTION IF EXISTS validate_feedback_client();`);

    // 2) Remove FKs
    await queryInterface.removeConstraint('AppointmentFeedbacks', 'fk_feedback_consultant');
    await queryInterface.removeConstraint('AppointmentFeedbacks', 'fk_feedback_client');
    await queryInterface.removeConstraint('AppointmentFeedbacks', 'fk_feedback_appointment');

    // 3) Drop the table
    await queryInterface.dropTable('AppointmentFeedbacks');
  }
};
