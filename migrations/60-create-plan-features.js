// migrations/20250720-create-plan-features.js
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // 1) Create the table
    await queryInterface.createTable('PlanFeatures', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        allowNull: false,
        primaryKey: true,
      },
      planId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { table: 'SubscriptionPlans', field: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      featureName: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      isEnabled: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
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

    // 2) Ensure each featureName is unique per plan
    await queryInterface.addConstraint('PlanFeatures', {
      fields: ['planId', 'featureName'],
      type: 'unique',
      name: 'uq_plan_features_plan_featureName'
    });

    // 3) Index isEnabled for quick filtering
    await queryInterface.addIndex('PlanFeatures', ['isEnabled'], {
      name: 'idx_plan_features_isEnabled'
    });
  },

  async down(queryInterface, Sequelize) {
    // 1) Remove index on isEnabled
    await queryInterface.removeIndex('PlanFeatures', 'idx_plan_features_isEnabled');
    // 2) Remove unique constraint
    await queryInterface.removeConstraint('PlanFeatures', 'uq_plan_features_plan_featureName');
    // 3) Drop the table
    await queryInterface.dropTable('PlanFeatures');
  }
};
