// migrations/20250720-create-conversations.js
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Conversations', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        allowNull: false,
        primaryKey: true
      },
      title: {
        type: Sequelize.STRING,
        allowNull: true
      },
      isGroup: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      lastMessageAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      }
    });

    // Index for sorting by recent activity
    await queryInterface.addIndex('Conversations', ['lastMessageAt'], {
      name: 'idx_conversations_lastMessageAt'
    });
  },

  async down(queryInterface) {
    await queryInterface.removeIndex('Conversations', 'idx_conversations_lastMessageAt');
    await queryInterface.dropTable('Conversations');
  }
};
