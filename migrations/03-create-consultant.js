// migrations/03-create-consultant.js
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Consultants', {
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

      businessName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      consultantCode: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      registrationNumber: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      isVerified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      qrCode: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      website: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      bio: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      specializations: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      languages: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      businessHours: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      commission: {
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

    // Index the userId FK for faster lookups
    await queryInterface.addIndex('Consultants', ['userId'], {
      name: 'idx_consultants_userId'
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove the index by name
    await queryInterface.removeIndex('Consultants', 'idx_consultants_userId');
    // Then drop the table
    await queryInterface.dropTable('Consultants');
  }
};
