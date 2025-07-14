'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DocumentFolder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DocumentFolder.init({
    id: DataTypes.UUID,
    name: DataTypes.STRING,
    parentId: DataTypes.UUID,
    consultantId: DataTypes.UUID,
    clientId: DataTypes.UUID,
    permissions: DataTypes.JSON,
    documentCount: DataTypes.INTEGER,
    folderCount: DataTypes.INTEGER,
    totalSize: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'DocumentFolder',
  });
  return DocumentFolder;
};