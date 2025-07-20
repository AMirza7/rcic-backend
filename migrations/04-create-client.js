'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Clients', {
      // Primary key as UUID
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        allowNull: false,
        primaryKey: true,
      },

      // Foreign key to Users
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'Users', key: 'id' },
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

      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      caseType: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      caseStatus: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      priority: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      dateOfBirth: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      nationality: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      passportNumber: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      passportExpiry: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      visaStatus: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      applicationNumber: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      progress: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      lastActivity: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      notes: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      emergencyContact: {
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
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Clients');
  }
};
