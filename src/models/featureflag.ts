'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FeatureFlag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  FeatureFlag.init({
    key: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    enabled: DataTypes.BOOLEAN,
    rolloutPercentage: DataTypes.INTEGER,
    userGroups: DataTypes.JSON,
    excludedUsers: DataTypes.JSON,
    conditions: DataTypes.JSON,
    createdBy: DataTypes.STRING,
    expiresAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'FeatureFlag',
  });
  return FeatureFlag;
};