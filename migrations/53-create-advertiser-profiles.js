// migrations/20250720000004-create-advertiser-profiles.js
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AdvertiserProfiles', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        allowNull: false,
        primaryKey: true,
      },
      advertiserId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'Users', key: 'id' },
        onDelete: 'CASCADE',
      },
      companyName: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      rating: {
        type: Sequelize.DECIMAL(3,2),
        allowNull: false,
        defaultValue: 0.00,
      },
      reviewCount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      verified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      yearsExperience: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      specializations: {
        type: Sequelize.JSONB,
        allowNull: false,
        defaultValue: '[]',
      },
      avatar: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },
      responseTime: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      successRate: {
        type: Sequelize.DECIMAL(5,2),
        allowNull: true,
      },
      casesHandled: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
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
    await queryInterface.dropTable('AdvertiserProfiles');
  }
};
