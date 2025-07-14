'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Consultant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Consultant.init({
    id: DataTypes.UUID,
    userId: DataTypes.UUID,
    businessName: DataTypes.STRING,
    consultantCode: DataTypes.STRING,
    registrationNumber: DataTypes.STRING,
    isVerified: DataTypes.BOOLEAN,
    qrCode: DataTypes.TEXT,
    website: DataTypes.STRING,
    bio: DataTypes.TEXT,
    specializations: DataTypes.JSON,
    languages: DataTypes.JSON,
    businessHours: DataTypes.JSON,
    commission: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'Consultant',
  });
  return Consultant;
};