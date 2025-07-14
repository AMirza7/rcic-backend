'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id: {
        type: Sequelize.UUID
      },
      email: {
        type: Sequelize.STRING
      },
      passwordHash: {
        type: Sequelize.STRING
      },
      mobileNumber: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.STRING
      },
      isOnboarded: {
        type: Sequelize.BOOLEAN
      },
      language: {
        type: Sequelize.STRING
      },
      createdAt: {
        type: Sequelize.DATE
      },
      lastLogin: {
        type: Sequelize.DATE
      },
      isActive: {
        type: Sequelize.BOOLEAN
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      fullName: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      avatar: {
        type: Sequelize.STRING
      },
      timezone: {
        type: Sequelize.STRING
      },
      preferences: {
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
    await queryInterface.dropTable('Users');
  }
};