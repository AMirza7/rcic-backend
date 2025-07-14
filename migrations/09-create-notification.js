'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Notifications', {
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
      type: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      message: {
        type: Sequelize.TEXT
      },
      timestamp: {
        type: Sequelize.DATE
      },
      isRead: {
        type: Sequelize.BOOLEAN
      },
      link: {
        type: Sequelize.STRING
      },
      priority: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      },
      expiresAt: {
        type: Sequelize.DATE
      },
      actionRequired: {
        type: Sequelize.BOOLEAN
      },
      metadata: {
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
    await queryInterface.dropTable('Notifications');
  }
};