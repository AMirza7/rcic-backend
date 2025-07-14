'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    id: DataTypes.UUID,
    email: DataTypes.STRING,
    passwordHash: DataTypes.STRING,
    mobileNumber: DataTypes.STRING,
    role: DataTypes.STRING,
    isOnboarded: DataTypes.BOOLEAN,
    language: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    lastLogin: DataTypes.DATE,
    isActive: DataTypes.BOOLEAN,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    fullName: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    avatar: DataTypes.STRING,
    timezone: DataTypes.STRING,
    preferences: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};