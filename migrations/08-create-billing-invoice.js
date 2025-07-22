'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('BillingInvoices', {
      // Primary key as UUID
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        allowNull: false,
        primaryKey: true,
      },

      // Foreign key to Users
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'Users', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },

      // Invoice amount in smallest currency unit (e.g. dollars.cents)
      amount: {
        type: Sequelize.DECIMAL(12,2),
        allowNull: false,
      },
      // ISO currency code
      currency: {
        type: Sequelize.STRING(3),
        allowNull: false,
      },
      // Invoice status
      status: {
        type: Sequelize.ENUM('pending', 'paid', 'overdue'),
        allowNull: false,
        defaultValue: 'pending',
      },

      billingDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      periodStart: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      periodEnd: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      dueDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      paidAt: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },

      planName: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      downloadUrl: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      items: {
        type: Sequelize.JSONB,
        allowNull: true,
        defaultValue: [],
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
    // Drop table
    await queryInterface.dropTable('BillingInvoices');
  },
};
