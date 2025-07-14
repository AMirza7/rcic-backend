'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Documents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id: {
        type: Sequelize.UUID
      },
      name: {
        type: Sequelize.STRING
      },
      fileName: {
        type: Sequelize.STRING
      },
      fileUrl: {
        type: Sequelize.STRING
      },
      fileSize: {
        type: Sequelize.BIGINT
      },
      mimeType: {
        type: Sequelize.STRING
      },
      uploadDate: {
        type: Sequelize.DATE
      },
      uploadedBy: {
        type: Sequelize.UUID
      },
      category: {
        type: Sequelize.STRING
      },
      tags: {
        type: Sequelize.JSON
      },
      clientId: {
        type: Sequelize.UUID
      },
      consultantId: {
        type: Sequelize.UUID
      },
      isPublic: {
        type: Sequelize.BOOLEAN
      },
      expiryDate: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.STRING
      },
      version: {
        type: Sequelize.INTEGER
      },
      permissions: {
        type: Sequelize.JSON
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
    await queryInterface.dropTable('Documents');
  }
};