// migrations/04-create-client.js
"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Clients", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
        allowNull: false,
        primaryKey: true,
      },

      userId: {
        type: Sequelize.UUID,
        allowNull: true,
      },
      consultantId: {
        type: Sequelize.UUID,
        allowNull: true,
      },

      firstName: { type: Sequelize.STRING(100), allowNull: false },
      lastName: { type: Sequelize.STRING(100), allowNull: false },
      caseType: { type: Sequelize.STRING(100), allowNull: true },
      caseStatus: { type: Sequelize.STRING(50), allowNull: true },
      priority: { type: Sequelize.STRING(50), allowNull: true },

      dateOfBirth: { type: Sequelize.DATE, allowNull: true }, // changed
      nationality: { type: Sequelize.STRING(50), allowNull: true },
      passportNumber: { type: Sequelize.STRING(50), allowNull: true },
      passportExpiry: { type: Sequelize.DATE, allowNull: true }, // changed
      visaStatus: { type: Sequelize.STRING(50), allowNull: true },
      applicationNumber: { type: Sequelize.STRING(100), allowNull: true },

      progress: { type: Sequelize.INTEGER, allowNull: true },
      lastActivity: { type: Sequelize.DATE, allowNull: true },

      notes: { type: Sequelize.TEXT, allowNull: true },
      emergencyContact: { type: Sequelize.JSONB, allowNull: true },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
    });

    // FK constraints
    await queryInterface.addConstraint("Clients", {
      fields: ["userId"],
      type: "foreign key",
      name: "fk_clients_userId",
      references: { table: "Users", field: "id" },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });
    await queryInterface.addConstraint("Clients", {
      fields: ["consultantId"],
      type: "foreign key",
      name: "fk_clients_consultantId",
      references: { table: "Consultants", field: "id" },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });

    // Indexes
    await queryInterface.addIndex("Clients", ["userId"], {
      name: "idx_clients_userId",
    });
    await queryInterface.addIndex("Clients", ["consultantId"], {
      name: "idx_clients_consultantId",
    });
  },

  async down(queryInterface, Sequelize) {
    // Drop indexes
    await queryInterface.removeIndex("Clients", "idx_clients_consultantId");
    await queryInterface.removeIndex("Clients", "idx_clients_userId");

    // Drop FKs
    await queryInterface.removeConstraint("Clients", "fk_clients_consultantId");
    await queryInterface.removeConstraint("Clients", "fk_clients_userId");

    // Drop table
    await queryInterface.dropTable("Clients");
  },
};
