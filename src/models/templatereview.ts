'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TemplateReview extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TemplateReview.init({
    id: DataTypes.UUID,
    templateId: DataTypes.UUID,
    userId: DataTypes.UUID,
    rating: DataTypes.INTEGER,
    review: DataTypes.TEXT,
    title: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    isVerified: DataTypes.BOOLEAN,
    helpfulVotes: DataTypes.INTEGER,
    reportedCount: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TemplateReview',
  });
  return TemplateReview;
};