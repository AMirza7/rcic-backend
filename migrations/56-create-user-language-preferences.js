// migrations/56-create-user-language-preferences.js
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // 1) Create the table with ENUM for allowed languages
    await queryInterface.createTable('UserLanguagePreferences', {
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
      language: {
        type: Sequelize.ENUM('EN', 'FR', 'HI'),
        allowNull: false,
        defaultValue: 'EN',
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

    // 2) Ensure one preference per user
    await queryInterface.addConstraint('UserLanguagePreferences', {
      fields: ['userId'],
      type: 'unique',
      name: 'uq_user_language_preference_user'
    });
  },

  async down(queryInterface, Sequelize) {
    // 1) Remove unique constraint
    await queryInterface.removeConstraint('UserLanguagePreferences', 'uq_user_language_preference_user');
    // 2) Drop the table
    await queryInterface.dropTable('UserLanguagePreferences');
    // 3) Drop the ENUM type (Postgres only)
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_UserLanguagePreferences_language";');
  }
};
