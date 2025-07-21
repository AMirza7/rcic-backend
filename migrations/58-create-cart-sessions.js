// migrations/20250720-create-cart-sessions.js
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CartSessions', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        allowNull: false,
        primaryKey: true,
      },
      token: {
        type: Sequelize.STRING(128),
        allowNull: false,
        unique: true,
      },
      // optional link to a user if they log in
      userId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: { table: 'Users', field: 'id' },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      cartItems: {
        type: Sequelize.JSONB,
        allowNull: false,
        defaultValue: Sequelize.literal(`'[]'::jsonb`),
      },
      expiresAt: {
        type: Sequelize.DATE,
        allowNull: false,
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

    // index for cleanup by expiration
    await queryInterface.addIndex('CartSessions', ['expiresAt'], {
      name: 'idx_cart_sessions_expiresAt'
    });
  },

  async down(queryInterface) {
    await queryInterface.removeIndex('CartSessions', 'idx_cart_sessions_expiresAt');
    await queryInterface.dropTable('CartSessions');
  }
};
