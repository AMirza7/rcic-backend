// migrations/14-create-document.js
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Documents', {
      // Primary key as UUID
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        allowNull: false,
        primaryKey: true,
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fileName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fileUrl: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fileSize: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      mimeType: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      uploadDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },

      // Foreign key to Users (uploader)
      uploadedBy: {
        type: Sequelize.UUID,
        allowNull: true,               // ← make nullable if using SET NULL
        references: { model: 'Users', key: 'id' },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },

      category: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      tags: {
        type: Sequelize.JSONB,
        allowNull: true,
      },

      // Foreign key to Clients
      clientId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: { model: 'Clients', key: 'id' },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },

      // Foreign key to Consultants
      consultantId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: { model: 'Consultants', key: 'id' },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },

      isPublic: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      expiryDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'active',
      },
      version: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      permissions: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      metadata: {
        type: Sequelize.JSONB,
        allowNull: true,
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

    // Indexes
    await queryInterface.addIndex('Documents', ['clientId'],     { name: 'idx_documents_client_id' });
    await queryInterface.addIndex('Documents', ['consultantId'], { name: 'idx_documents_consultant_id' });
    await queryInterface.addIndex('Documents', ['uploadDate'],    { name: 'idx_documents_upload_date' });
  },

  async down(queryInterface, Sequelize) {
    // Remove indexes by name
    await queryInterface.removeIndex('Documents', 'idx_documents_upload_date');
    await queryInterface.removeIndex('Documents', 'idx_documents_consultant_id');
    await queryInterface.removeIndex('Documents', 'idx_documents_client_id');

    await queryInterface.dropTable('Documents');
  },
};
