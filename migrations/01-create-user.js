// migrations/01-create-user.js
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // 1) Create the Users table
    await queryInterface.createTable('Users', {
      // Primary key as UUID
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        allowNull: false,
        primaryKey: true,
      },

      // User credentials & profile
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      passwordHash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      mobileNumber: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      isOnboarded: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      language: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'en',
      },

      // Activity tracking
      lastLogin: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },

      // Profile details
      firstName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      fullName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      avatar: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      timezone: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'UTC',
      },
      preferences: {
        type: Sequelize.JSON,
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

    // 2) Add performance indexes
    // email unique index (unique constraint already creates one, but listed for clarity)
    await queryInterface.addIndex('Users', ['email'], {
      name: 'idx_users_email',
      unique: true
    });
    await queryInterface.addIndex('Users', ['role'], {
      name: 'idx_users_role'
    });
    await queryInterface.addIndex('Users', ['phone'], {
      name: 'idx_users_phone'
    });
    await queryInterface.addIndex('Users', ['firstName'], {
      name: 'idx_users_firstName'
    });
    await queryInterface.addIndex('Users', ['lastName'], {
      name: 'idx_users_lastName'
    });
    // If you add consultantId in the future:
    // await queryInterface.addIndex('Users', ['consultantId'], { name: 'idx_users_consultant_id' });
  },

  async down(queryInterface, Sequelize) {
    // 1) Remove indexes
    await queryInterface.removeIndex('Users', 'idx_users_lastName');
    await queryInterface.removeIndex('Users', 'idx_users_firstName');
    await queryInterface.removeIndex('Users', 'idx_users_phone');
    await queryInterface.removeIndex('Users', 'idx_users_role');
    await queryInterface.removeIndex('Users', 'idx_users_email');
    // await queryInterface.removeIndex('Users', 'idx_users_consultant_id');

    // 2) Drop the Users table
    await queryInterface.dropTable('Users');
  },
};
