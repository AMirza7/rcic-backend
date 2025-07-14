'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Employee.init({
    id: DataTypes.UUID,
    userId: DataTypes.UUID,
    employeeId: DataTypes.UUID,
    consultantId: DataTypes.UUID,
    position: DataTypes.STRING,
    department: DataTypes.STRING,
    hireDate: DataTypes.DATE,
    salary: DataTypes.FLOAT,
    hourlyRate: DataTypes.FLOAT,
    employmentType: DataTypes.STRING,
    status: DataTypes.STRING,
    permissions: DataTypes.JSON,
    workSchedule: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'Employee',
  });
  return Employee;
};