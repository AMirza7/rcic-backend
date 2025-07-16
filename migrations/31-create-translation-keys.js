'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

    await queryInterface.createTable('TranslationKeys', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        allowNull: false,
        primaryKey: true
      },
      locale: {
        type: Sequelize.STRING(10),
        allowNull: false
      },
      key: {
        type: Sequelize.STRING,
        allowNull: false
      },
      value: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()')
      }
    });

    await queryInterface.addIndex('TranslationKeys', ['locale', 'key'], {
      unique: true,
      name: 'translation_unique_locale_key'
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('TranslationKeys');
  }
};
