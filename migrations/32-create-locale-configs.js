'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

    await queryInterface.createTable('LocaleConfigs', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        allowNull: false,
        primaryKey: true
      },
      code: {
        type: Sequelize.STRING(10),
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nativeName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      flag: {
        type: Sequelize.STRING,
        allowNull: false
      },
      rtl: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      dateFormat: {
        type: Sequelize.STRING,
        allowNull: false
      },
      timeFormat: {
        type: Sequelize.STRING,
        allowNull: false
      },
      currencyFormat: {
        type: Sequelize.JSONB,
        allowNull: false,
        defaultValue: {
          symbol: '$',
          position: 'before',
          decimal: '.',
          thousands: ','
        }
      },
      numberFormat: {
        type: Sequelize.JSONB,
        allowNull: false,
        defaultValue: {
          decimal: '.',
          thousands: ','
        }
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
  },

  async down(queryInterface) {
    await queryInterface.dropTable('LocaleConfigs');
  }
};
