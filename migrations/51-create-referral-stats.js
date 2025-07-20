'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ReferralStats', {
      userId: {
        type: Sequelize.UUID,
        primaryKey: true,
        references: { model: 'Users', key: 'id' },
        onDelete: 'CASCADE',
      },
      totalReferrals: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      activeReferrals: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      totalEarned: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0,
      },
      pendingEarnings: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0,
      },
      thisMonth: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      lastMonth: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      conversionRate: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0,
      },
      averageRewardAmount: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0,
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

  async down(queryInterface) {
    await queryInterface.dropTable('ReferralStats');
  }
};
