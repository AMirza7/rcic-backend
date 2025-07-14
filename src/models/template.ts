'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Template extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Template.init({
    id: DataTypes.UUID,
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    category: DataTypes.STRING,
    subcategory: DataTypes.STRING,
    price: DataTypes.FLOAT,
    currency: DataTypes.STRING,
    fileUrl: DataTypes.STRING,
    thumbnailUrl: DataTypes.STRING,
    downloadCount: DataTypes.INTEGER,
    rating: DataTypes.FLOAT,
    reviewCount: DataTypes.INTEGER,
    createdBy: DataTypes.UUID,
    isActive: DataTypes.BOOLEAN,
    isFeatured: DataTypes.BOOLEAN,
    tags: DataTypes.JSON,
    fileSize: DataTypes.BIGINT,
    fileType: DataTypes.STRING,
    version: DataTypes.STRING,
    requirements: DataTypes.JSON,
    compatibility: DataTypes.JSON,
    language: DataTypes.STRING,
    jurisdiction: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Template',
  });
  return Template;
};