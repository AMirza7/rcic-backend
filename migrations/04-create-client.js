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

      // Foreign keys created without constraints initially
      userId: {
        type: Sequelize.UUID,
        allowNull: true,
      },
      consultantId: {
        type: Sequelize.UUID,
        allowNull: true,
      },

      firstName: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },

      caseType: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      caseStatus: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      priority: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },

      dateOfBirth: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      nationality: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      passportNumber: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      passportExpiry: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      visaStatus: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      applicationNumber: {
        type: Sequelize.STRING(100),
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

    // Add FK constraints after related tables exist
    await queryInterface.addConstraint('Clients', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'fk_clients_userId',
      references: { table: 'Users', field: 'id' },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('Clients', {
      fields: ['consultantId'],
      type: 'foreign key',
      name: 'fk_clients_consultantId',
      references: { table: 'Consultants', field: 'id' },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove FK constraints first
    await queryInterface.removeConstraint('Clients', 'fk_clients_userId');
    await queryInterface.removeConstraint('Clients', 'fk_clients_consultantId');
    // Then drop the table
    await queryInterface.dropTable('Clients');
  }
};
