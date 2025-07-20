'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DocumentFolders', {
      // Primary UUID key
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        allowNull: false,
        primaryKey: true,
      },

      // Folder name
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      // Self-referencing parent folder
      parentId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: { model: 'DocumentFolders', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },

      // Consultant who owns this folder
      consultantId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'Consultants', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },

      // Client whose documents live here
      clientId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'Clients', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },

      // JSON permissions (e.g. roles that can view/edit)
      permissions: {
        type: Sequelize.JSON,
        allowNull: true,
      },

      // Counts & size metrics
      documentCount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      folderCount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      totalSize: {
        type: Sequelize.BIGINT,
        allowNull: false,
        defaultValue: 0,
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
    await queryInterface.dropTable('DocumentFolders');
  },
};
