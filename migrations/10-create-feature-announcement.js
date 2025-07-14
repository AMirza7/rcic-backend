'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('FeatureAnnouncements', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id: {
        type: Sequelize.UUID
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      fullDescription: {
        type: Sequelize.TEXT
      },
      version: {
        type: Sequelize.STRING
      },
      releaseDate: {
        type: Sequelize.DATE
      },
      category: {
        type: Sequelize.STRING
      },
      isNew: {
        type: Sequelize.BOOLEAN
      },
      isPremium: {
        type: Sequelize.BOOLEAN
      },
      requiredPlan: {
        type: Sequelize.JSON
      },
      link: {
        type: Sequelize.STRING
      },
      imageUrl: {
        type: Sequelize.STRING
      },
      benefits: {
        type: Sequelize.JSON
      },
      tags: {
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
    await queryInterface.dropTable('FeatureAnnouncements');
  }
};