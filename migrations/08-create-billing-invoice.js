'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('BillingInvoices', {
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
      amount: {
        type: Sequelize.FLOAT
      },
      currency: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      billingDate: {
        type: Sequelize.DATE
      },
      periodStart: {
        type: Sequelize.DATE
      },
      periodEnd: {
        type: Sequelize.DATE
      },
      dueDate: {
        type: Sequelize.DATE
      },
      paidAt: {
        type: Sequelize.DATE
      },
      planName: {
        type: Sequelize.STRING
      },
      downloadUrl: {
        type: Sequelize.STRING
      },
      items: {
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
    await queryInterface.dropTable('BillingInvoices');
  }
};