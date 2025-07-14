'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserSubscription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserSubscription.init({
    id: DataTypes.UUID,
    userId: DataTypes.UUID,
    plan: DataTypes.STRING,
    status: DataTypes.STRING,
    billingPeriod: DataTypes.STRING,
    amount: DataTypes.FLOAT,
    currency: DataTypes.STRING,
    nextBilling: DataTypes.DATE,
    cancelledAt: DataTypes.DATE,
    periodEnd: DataTypes.DATE,
    features: DataTypes.JSON,
    stripeSubscriptionId: DataTypes.STRING,
    stripeCustomerId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserSubscription',
  });
  return UserSubscription;
};