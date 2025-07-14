'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BrandingSettings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BrandingSettings.init({
    id: DataTypes.UUID,
    consultantId: DataTypes.UUID,
    logo: DataTypes.STRING,
    favicon: DataTypes.STRING,
    primaryColor: DataTypes.STRING,
    secondaryColor: DataTypes.STRING,
    accentColor: DataTypes.STRING,
    typography: DataTypes.STRING,
    brandName: DataTypes.STRING,
    customDomain: DataTypes.STRING,
    customCSS: DataTypes.TEXT,
    updatedAt: DataTypes.DATE,
    isActive: DataTypes.BOOLEAN,
    theme: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'BrandingSettings',
  });
  return BrandingSettings;
};