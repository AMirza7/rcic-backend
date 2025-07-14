'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AppointmentFeedback extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AppointmentFeedback.init({
    id: DataTypes.UUID,
    appointmentId: DataTypes.UUID,
    clientId: DataTypes.UUID,
    consultantId: DataTypes.UUID,
    rating: DataTypes.INTEGER,
    feedback: DataTypes.TEXT,
    categories: DataTypes.JSON,
    wouldRecommend: DataTypes.BOOLEAN,
    submittedAt: DataTypes.DATE,
    isPublic: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'AppointmentFeedback',
  });
  return AppointmentFeedback;
};