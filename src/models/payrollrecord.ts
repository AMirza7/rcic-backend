'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PayrollRecord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PayrollRecord.init({
    id: DataTypes.UUID,
    employeeId: DataTypes.UUID,
    payPeriodStart: DataTypes.DATE,
    payPeriodEnd: DataTypes.DATE,
    hoursWorked: DataTypes.FLOAT,
    regularHours: DataTypes.FLOAT,
    overtimeHours: DataTypes.FLOAT,
    grossPay: DataTypes.FLOAT,
    deductions: DataTypes.JSON,
    netPay: DataTypes.FLOAT,
    paymentDate: DataTypes.DATE,
    status: DataTypes.STRING,
    payslipUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PayrollRecord',
  });
  return PayrollRecord;
};