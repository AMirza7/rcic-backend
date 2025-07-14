'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BillingInvoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BillingInvoice.init({
    id: DataTypes.UUID,
    userId: DataTypes.UUID,
    amount: DataTypes.FLOAT,
    currency: DataTypes.STRING,
    status: DataTypes.STRING,
    billingDate: DataTypes.DATE,
    periodStart: DataTypes.DATE,
    periodEnd: DataTypes.DATE,
    dueDate: DataTypes.DATE,
    paidAt: DataTypes.DATE,
    planName: DataTypes.STRING,
    downloadUrl: DataTypes.STRING,
    items: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'BillingInvoice',
  });
  return BillingInvoice;
};