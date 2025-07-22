'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('BrandingSettings', {
      // Primary key as UUID
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        allowNull: false,
        primaryKey: true,
      },

      // Foreign key to Consultants
      consultantId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'Consultants', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },

      // Branding assets
      logo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      favicon: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      primaryColor: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      secondaryColor: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      accentColor: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      typography: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      brandName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      customDomain: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      customCSS: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      // Validation and integrations
      domainValidated: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      sslCertificateId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: { model: 'SSLCertificates', key: 'id' },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      emailConfigId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: { model: 'EmailConfigs', key: 'id' },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },

      // Active state and theme config
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      theme: {
        type: Sequelize.JSONB,
        allowNull: true,
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
    await queryInterface.dropTable('BrandingSettings');
  },
};
