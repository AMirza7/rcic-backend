'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('WorkflowSteps', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        allowNull: false,
        primaryKey: true,
      },
      workflowId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'TaskWorkflows', key: 'id' },
        onDelete: 'CASCADE',
      },
      stepOrder: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      actionType: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      config: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      // Standard timestamps
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
    await queryInterface.dropTable('WorkflowSteps');
  },
};
