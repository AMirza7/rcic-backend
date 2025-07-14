'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FeatureAnnouncement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  FeatureAnnouncement.init({
    id: DataTypes.UUID,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    fullDescription: DataTypes.TEXT,
    version: DataTypes.STRING,
    releaseDate: DataTypes.DATE,
    category: DataTypes.STRING,
    isNew: DataTypes.BOOLEAN,
    isPremium: DataTypes.BOOLEAN,
    requiredPlan: DataTypes.JSON,
    link: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    benefits: DataTypes.JSON,
    tags: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'FeatureAnnouncement',
  });
  return FeatureAnnouncement;
};