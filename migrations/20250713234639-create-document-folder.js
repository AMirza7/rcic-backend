'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DocumentFolders', {
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
      parentId: {
        type: Sequelize.UUID
      },
      consultantId: {
        type: Sequelize.UUID
      },
      clientId: {
        type: Sequelize.UUID
      },
      permissions: {
        type: Sequelize.JSON
      },
      documentCount: {
        type: Sequelize.INTEGER
      },
      folderCount: {
        type: Sequelize.INTEGER
      },
      totalSize: {
        type: Sequelize.BIGINT
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
    await queryInterface.dropTable('DocumentFolders');
  }
};