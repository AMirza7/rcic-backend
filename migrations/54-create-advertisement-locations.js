// migrations/20250720000005-create-advertisement-locations.js
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AdvertisementLocations', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        allowNull: false,
        primaryKey: true,
      },
      advertisementId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'Advertisements', key: 'id' },
        onDelete: 'CASCADE',
      },
      city: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      province: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      country: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      latitude: {
        type: Sequelize.DECIMAL(10,8),
        allowNull: true,
      },
      longitude: {
        type: Sequelize.DECIMAL(11,8),
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('AdvertisementLocations');
  }
};
