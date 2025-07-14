'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Clients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id: {
        type: Sequelize.UUID
      },
      userId: {
        type: Sequelize.UUID
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      consultantId: {
        type: Sequelize.UUID
      },
      consultantCode: {
        type: Sequelize.STRING
      },
      caseType: {
        type: Sequelize.STRING
      },
      caseStatus: {
        type: Sequelize.STRING
      },
      priority: {
        type: Sequelize.STRING
      },
      dateOfBirth: {
        type: Sequelize.DATE
      },
      nationality: {
        type: Sequelize.STRING
      },
      passportNumber: {
        type: Sequelize.STRING
      },
      passportExpiry: {
        type: Sequelize.DATE
      },
      visaStatus: {
        type: Sequelize.STRING
      },
      applicationNumber: {
        type: Sequelize.STRING
      },
      progress: {
        type: Sequelize.INTEGER
      },
      lastActivity: {
        type: Sequelize.DATE
      },
      notes: {
        type: Sequelize.TEXT
      },
      emergencyContact: {
        type: Sequelize.JSON
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Clients');
  }
};