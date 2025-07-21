// migrations/20250720-create-template-categories.js
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // 1) Create the table with self‑reference for nested categories
    await queryInterface.createTable('TemplateCategories', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      slug: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      parentCategoryId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: { table: 'TemplateCategories', field: 'id' },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      isActive: {
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

    // 2) Ensure category names are unique
    await queryInterface.addConstraint('TemplateCategories', {
      fields: ['name'],
      type: 'unique',
      name: 'uq_template_categories_name'
    });

    // 3) Index parentCategoryId for faster hierarchical queries
    await queryInterface.addIndex('TemplateCategories', ['parentCategoryId'], {
      name: 'idx_template_categories_parent'
    });
  },

  async down(queryInterface, Sequelize) {
    // 1) Remove index on parentCategoryId
    await queryInterface.removeIndex('TemplateCategories', 'idx_template_categories_parent');
    // 2) Remove unique constraint on name
    await queryInterface.removeConstraint('TemplateCategories', 'uq_template_categories_name');
    // 3) Drop the table (this also drops the slug unique index)
    await queryInterface.dropTable('TemplateCategories');
  }
};
