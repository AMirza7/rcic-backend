'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Document extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Document.init({
    id: DataTypes.UUID,
    name: DataTypes.STRING,
    fileName: DataTypes.STRING,
    fileUrl: DataTypes.STRING,
    fileSize: DataTypes.BIGINT,
    mimeType: DataTypes.STRING,
    uploadDate: DataTypes.DATE,
    uploadedBy: DataTypes.UUID,
    category: DataTypes.STRING,
    tags: DataTypes.JSON,
    clientId: DataTypes.UUID,
    consultantId: DataTypes.UUID,
    isPublic: DataTypes.BOOLEAN,
    expiryDate: DataTypes.DATE,
    status: DataTypes.STRING,
    version: DataTypes.INTEGER,
    permissions: DataTypes.JSON,
    metadata: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'Document',
  });
  return Document;
};