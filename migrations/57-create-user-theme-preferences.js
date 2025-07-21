// migrations/20250720-create-user-theme-preferences.js
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // 1) Create the table
    await queryInterface.createTable('UserThemePreferences', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { table: 'Users', field: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      theme: {
        type: Sequelize.ENUM('light', 'dark', 'system', 'novaedge'),
        allowNull: false,
        defaultValue: 'light',
      },
      customCSS: {
        type: Sequelize.TEXT,
        allowNull: true,
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

    // 2) Ensure each user has at most one theme preference
    await queryInterface.addConstraint('UserThemePreferences', {
      fields: ['userId'],
      type: 'unique',
      name: 'uq_user_theme_preference_user'
    });
  },

  async down(queryInterface, Sequelize) {
    // 1) Remove unique constraint
    await queryInterface.removeConstraint('UserThemePreferences', 'uq_user_theme_preference_user');

    // 2) Drop the table
    await queryInterface.dropTable('UserThemePreferences');

    // 3) Drop the ENUM type (Postgres only)
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_UserThemePreferences_theme";'
    );
  }
};
