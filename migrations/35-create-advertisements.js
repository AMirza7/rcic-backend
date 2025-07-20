'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Advertisements', {
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
      title: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      images: {
        type: Sequelize.JSONB,
        allowNull: false,
      },
      logo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      businessName: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      contactEmail: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      contactPhone: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      website: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      targetAudience: {
        type: Sequelize.JSONB,
        allowNull: false,
      },
      placement: {
        type: Sequelize.JSONB,
        allowNull: false,
      },
      startDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      endDate: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      timezone: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      tier: {
        type: Sequelize.ENUM('basic', 'premium', 'enterprise'),
        allowNull: false,
        defaultValue: 'basic',
      },
      pricing: {
        type: Sequelize.JSONB,
        allowNull: false,
      },
      analytics: {
        type: Sequelize.JSONB,
        allowNull: false,
        defaultValue: {},
      },
      status: {
        type: Sequelize.ENUM(
          'draft',
          'pending_review',
          'approved',
          'rejected',
          'paused',
          'expired'
        ),
        allowNull: false,
        defaultValue: 'draft',
      },
      reviewNotes: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      reviewedBy: {
        type: Sequelize.UUID,
        allowNull: true,
        references: { model: 'Users', key: 'id' },
        onDelete: 'SET NULL',
      },
      reviewedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      variants: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      metadata: {
        type: Sequelize.JSONB,
        allowNull: true,
        defaultValue: {},
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
    await queryInterface.dropTable('Advertisements');

    // Clean up Postgres enum types
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_Advertisements_tier";'
    );
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_Advertisements_status";'
    );
  },
};
