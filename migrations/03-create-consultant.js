'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Consultants', {
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
      businessName: {
        type: Sequelize.STRING
      },
      consultantCode: {
        type: Sequelize.STRING
      },
      registrationNumber: {
        type: Sequelize.STRING
      },
      isVerified: {
        type: Sequelize.BOOLEAN
      },
      qrCode: {
        type: Sequelize.TEXT
      },
      website: {
        type: Sequelize.STRING
      },
      bio: {
        type: Sequelize.TEXT
      },
      specializations: {
        type: Sequelize.JSON
      },
      languages: {
        type: Sequelize.JSON
      },
      businessHours: {
        type: Sequelize.JSON
      },
      commission: {
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
    await queryInterface.dropTable('Consultants');
  }
};