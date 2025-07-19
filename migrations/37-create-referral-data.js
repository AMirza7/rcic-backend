'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ReferralData', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        primaryKey: true
      },
      referrerId: {
        type: Sequelize.UUID,
        allowNull: false
      },
      referrerType: {
        type: Sequelize.ENUM('client', 'consultant'),
        allowNull: false
      },
      referralCode: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: true
      },
      invitedAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('pending', 'signed_up', 'reward_claimed'),
        allowNull: false,
        defaultValue: 'pending'
      },
      planSubscribed: {
        type: Sequelize.STRING,
        allowNull: true
      },
      rewardAmount: {
        type: Sequelize.DECIMAL,
        allowNull: true
      },
      rewardStatus: {
        type: Sequelize.ENUM('pending', 'paid', 'cancelled'),
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
    await queryInterface.dropTable('ReferralData');
  }
};
