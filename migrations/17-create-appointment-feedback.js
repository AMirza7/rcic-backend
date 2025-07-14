'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AppointmentFeedbacks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id: {
        type: Sequelize.UUID
      },
      appointmentId: {
        type: Sequelize.UUID
      },
      clientId: {
        type: Sequelize.UUID
      },
      consultantId: {
        type: Sequelize.UUID
      },
      rating: {
        type: Sequelize.INTEGER
      },
      feedback: {
        type: Sequelize.TEXT
      },
      categories: {
        type: Sequelize.JSON
      },
      wouldRecommend: {
        type: Sequelize.BOOLEAN
      },
      submittedAt: {
        type: Sequelize.DATE
      },
      isPublic: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('AppointmentFeedbacks');
  }
};