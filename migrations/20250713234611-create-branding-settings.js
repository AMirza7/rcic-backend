'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('BrandingSettings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id: {
        type: Sequelize.UUID
      },
      consultantId: {
        type: Sequelize.UUID
      },
      logo: {
        type: Sequelize.STRING
      },
      favicon: {
        type: Sequelize.STRING
      },
      primaryColor: {
        type: Sequelize.STRING
      },
      secondaryColor: {
        type: Sequelize.STRING
      },
      accentColor: {
        type: Sequelize.STRING
      },
      typography: {
        type: Sequelize.STRING
      },
      brandName: {
        type: Sequelize.STRING
      },
      customDomain: {
        type: Sequelize.STRING
      },
      customCSS: {
        type: Sequelize.TEXT
      },
      updatedAt: {
        type: Sequelize.DATE
      },
      isActive: {
        type: Sequelize.BOOLEAN
      },
      theme: {
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
    await queryInterface.dropTable('BrandingSettings');
  }
};