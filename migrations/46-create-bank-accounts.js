'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('BankAccounts', {
      // Primary key
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        allowNull: false,
        primaryKey: true,
      },

      // FK to Users
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'Users', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },

      accountHolderName: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      accountNumber: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      routingNumber: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      bankName: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },

      accountType: {
        type: Sequelize.ENUM('checking', 'savings', 'other'),
        allowNull: false,
        defaultValue: 'checking',
      },

      currency: {
        type: Sequelize.STRING(3),
        allowNull: false,
      },

      // ← NEW column for account balance
      balance: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0.00,
      },

      isVerified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      verifiedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      limits: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      fees: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      metadata: {
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
    // Drop the table
    await queryInterface.dropTable('BankAccounts');

    // Clean up the enum type for accountType
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_BankAccounts_accountType";'
    );
  },
};
