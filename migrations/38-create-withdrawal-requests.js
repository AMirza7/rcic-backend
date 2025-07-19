'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('WithdrawalRequests', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        primaryKey: true
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false
      },
      userType: {
        type: Sequelize.ENUM('client', 'consultant'),
        allowNull: false
      },
      amount: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('requested', 'processing', 'paid', 'rejected'),
        allowNull: false,
        defaultValue: 'requested'
      },
      requestedAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      processedAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      processedBy: {
        type: Sequelize.UUID,
        allowNull: true
      },
      paymentMethod: {
        type: Sequelize.ENUM('bank_transfer', 'paypal', 'check'),
        allowNull: true
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      rejectionReason: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      metadata: {
        type: Sequelize.JSONB,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('WithdrawalRequests');
  }
};
