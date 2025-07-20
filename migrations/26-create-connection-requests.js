'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // ensure uuid-ossp extension is enabled
    await queryInterface.sequelize.query(
      `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`
    );

    await queryInterface.createTable('ConnectionRequests', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        allowNull: false,
        primaryKey: true,
      },
      clientId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'Clients', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      consultantId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'Consultants', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      status: {
        type: Sequelize.ENUM('pending', 'accepted', 'rejected'),
        allowNull: false,
        defaultValue: 'pending',
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

  async down(queryInterface, Sequelize) {
    // Drop the table
    await queryInterface.dropTable('ConnectionRequests');

    // Clean up the enum type
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_ConnectionRequests_status";'
    );
  },
};
