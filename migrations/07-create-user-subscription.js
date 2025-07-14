'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserSubscriptions', {
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
      plan: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      billingPeriod: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.FLOAT
      },
      currency: {
        type: Sequelize.STRING
      },
      nextBilling: {
        type: Sequelize.DATE
      },
      cancelledAt: {
        type: Sequelize.DATE
      },
      periodEnd: {
        type: Sequelize.DATE
      },
      features: {
        type: Sequelize.JSON
      },
      stripeSubscriptionId: {
        type: Sequelize.STRING
      },
      stripeCustomerId: {
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
    await queryInterface.dropTable('UserSubscriptions');
  }
};