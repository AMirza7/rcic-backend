'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Ensure the UUID extension is available
    await queryInterface.sequelize.query(
      `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`
    );

    await queryInterface.createTable('LocaleConfigs', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        allowNull: false,
        primaryKey: true,
      },
      code: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nativeName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      flag: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      rtl: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      dateFormat: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      timeFormat: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      currencyFormat: {
        type: Sequelize.JSONB,
        allowNull: false,
        defaultValue: {
          symbol: '$',
          position: 'before',
          decimal: '.',
          thousands: ',',
        },
      },
      numberFormat: {
        type: Sequelize.JSONB,
        allowNull: false,
        defaultValue: {
          decimal: '.',
          thousands: ',',
        },
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
  },

  async down(queryInterface) {
    await queryInterface.dropTable('LocaleConfigs');
  },
};
