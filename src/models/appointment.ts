'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Appointment.init({
    id: DataTypes.UUID,
    consultantId: DataTypes.UUID,
    clientId: DataTypes.UUID,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    type: DataTypes.STRING,
    status: DataTypes.STRING,
    startTime: DataTypes.DATE,
    endTime: DataTypes.DATE,
    duration: DataTypes.INTEGER,
    location: DataTypes.STRING,
    meetingUrl: DataTypes.STRING,
    isVirtual: DataTypes.BOOLEAN,
    priority: DataTypes.STRING,
    amount: DataTypes.FLOAT,
    currency: DataTypes.STRING,
    paymentStatus: DataTypes.STRING,
    notes: DataTypes.TEXT,
    reminderSent: DataTypes.BOOLEAN,
    attendees: DataTypes.JSON,
    documents: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'Appointment',
  });
  return Appointment;
};