'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Templates', {
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
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      category: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      subcategory: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      currency: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      fileUrl: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      thumbnailUrl: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      downloadCount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      rating: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0.0,
      },
      reviewCount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },

      createdBy: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'Users', key: 'id' },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },

      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      isFeatured: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      tags: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      fileSize: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      fileType: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      version: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      requirements: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      compatibility: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      language: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      jurisdiction: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('Templates');
  }
};
