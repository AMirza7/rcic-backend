'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TemplateReviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id: {
        type: Sequelize.UUID
      },
      templateId: {
        type: Sequelize.UUID
      },
      userId: {
        type: Sequelize.UUID
      },
      rating: {
        type: Sequelize.INTEGER
      },
      review: {
        type: Sequelize.TEXT
      },
      title: {
        type: Sequelize.STRING
      },
      createdAt: {
        type: Sequelize.DATE
      },
      isVerified: {
        type: Sequelize.BOOLEAN
      },
      helpfulVotes: {
        type: Sequelize.INTEGER
      },
      reportedCount: {
        type: Sequelize.INTEGER
      },
      status: {
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
    await queryInterface.dropTable('TemplateReviews');
  }
};