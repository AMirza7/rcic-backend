'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DownloadAnalytics', {
      // Primary key as UUID
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        allowNull: false,
        primaryKey: true,
      },

      // Link to a specific download record
      templateDownloadId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'TemplateDownloads', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },

      // Client IP address
      ipAddress: {
        type: Sequelize.INET,
        allowNull: true,
      },

      // User agent string
      userAgent: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      // When this analytic event was recorded
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('DownloadAnalytics');
  },
};
