'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Templates', {
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
      description: {
        type: Sequelize.TEXT
      },
      category: {
        type: Sequelize.STRING
      },
      subcategory: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.FLOAT
      },
      currency: {
        type: Sequelize.STRING
      },
      fileUrl: {
        type: Sequelize.STRING
      },
      thumbnailUrl: {
        type: Sequelize.STRING
      },
      downloadCount: {
        type: Sequelize.INTEGER
      },
      rating: {
        type: Sequelize.FLOAT
      },
      reviewCount: {
        type: Sequelize.INTEGER
      },
      createdBy: {
        type: Sequelize.UUID
      },
      isActive: {
        type: Sequelize.BOOLEAN
      },
      isFeatured: {
        type: Sequelize.BOOLEAN
      },
      tags: {
        type: Sequelize.JSON
      },
      fileSize: {
        type: Sequelize.BIGINT
      },
      fileType: {
        type: Sequelize.STRING
      },
      version: {
        type: Sequelize.STRING
      },
      requirements: {
        type: Sequelize.JSON
      },
      compatibility: {
        type: Sequelize.JSON
      },
      language: {
        type: Sequelize.STRING
      },
      jurisdiction: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Templates');
  }
};