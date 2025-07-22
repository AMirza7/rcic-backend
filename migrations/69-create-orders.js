'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      // Primary key as UUID
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        allowNull: false,
        primaryKey: true,
      },

      // Link back to the cart
      cartId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'ShoppingCarts', key: 'id' },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },

      // Order total
      total: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
      },

      // Payment status (free‑form string, e.g. 'pending','paid','failed')
      paymentStatus: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'pending',
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
    await queryInterface.dropTable('Orders');
  },
};
