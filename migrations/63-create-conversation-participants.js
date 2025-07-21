// migrations/20250720-create-conversation-participants.js
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1) Create the table with lastReadAt
    await queryInterface.createTable('ConversationParticipants', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        allowNull: false,
        primaryKey: true
      },
      conversationId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'Conversations', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'Users', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      role: {
        type: Sequelize.ENUM('client','consultant','employee','AI'),
        allowNull: false
      },
      lastReadAt: {
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

    // 2) Ensure a user only appears once per conversation
    await queryInterface.addConstraint('ConversationParticipants', {
      fields: ['conversationId', 'userId'],
      type: 'unique',
      name: 'uq_conversation_participant'
    });

    // 3) Indexes to improve lookup performance
    await queryInterface.addIndex('ConversationParticipants', ['conversationId'], {
      name: 'idx_cp_conversation'
    });
    await queryInterface.addIndex('ConversationParticipants', ['userId'], {
      name: 'idx_cp_user'
    });
  },

  async down(queryInterface, Sequelize) {
    // 1) Remove indexes
    await queryInterface.removeIndex('ConversationParticipants', 'idx_cp_user');
    await queryInterface.removeIndex('ConversationParticipants', 'idx_cp_conversation');

    // 2) Remove unique constraint
    await queryInterface.removeConstraint('ConversationParticipants', 'uq_conversation_participant');

    // 3) Drop the table
    await queryInterface.dropTable('ConversationParticipants');

    // 4) Drop the ENUM type (Postgres only)
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_ConversationParticipants_role";'
    );
  }
};
