'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Client.init({
    id: DataTypes.UUID,
    userId: DataTypes.UUID,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    consultantId: DataTypes.UUID,
    consultantCode: DataTypes.STRING,
    caseType: DataTypes.STRING,
    caseStatus: DataTypes.STRING,
    priority: DataTypes.STRING,
    dateOfBirth: DataTypes.DATE,
    nationality: DataTypes.STRING,
    passportNumber: DataTypes.STRING,
    passportExpiry: DataTypes.DATE,
    visaStatus: DataTypes.STRING,
    applicationNumber: DataTypes.STRING,
    progress: DataTypes.INTEGER,
    lastActivity: DataTypes.DATE,
    notes: DataTypes.TEXT,
    emergencyContact: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'Client',
  });
  return Client;
};