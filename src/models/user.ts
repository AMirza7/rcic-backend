// src/models/user.ts
import {
  Model,
  DataTypes,
  Sequelize,
  Optional,
} from 'sequelize';
import { AuthToken } from './authtoken';

// 1. Attribute interface
export interface UserAttributes {
  id: string;
  email: string;
  passwordHash: string;
  mobileNumber: string;
  role: 'admin' | 'consultant' | 'client' | 'employee';
  isOnboarded: boolean;
  language: 'en' | 'fr' | 'hi';
  lastLogin: Date | null;
  isActive: boolean;
  firstName: string | null;
  lastName: string | null;
  fullName: string | null;
  phone: string | null;
  address: string | null;
  avatar: string | null;
  timezone: string | null;
  preferences: Record<string, any> | null;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

// 2. Creation attributes – now includes timestamps as optional
export interface UserCreationAttributes
  extends Optional<
    UserAttributes,
    | 'id'
    | 'isOnboarded'
    | 'language'
    | 'lastLogin'
    | 'isActive'
    | 'firstName'
    | 'lastName'
    | 'fullName'
    | 'phone'
    | 'address'
    | 'avatar'
    | 'timezone'
    | 'preferences'
    | 'createdAt'
    | 'updatedAt'
  > {}

// 3. Model class
export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes {
  public id!: string;
  public email!: string;
  public passwordHash!: string;
  public mobileNumber!: string;
  public role!: 'admin' | 'consultant' | 'client' | 'employee';
  public isOnboarded!: boolean;
  public language!: 'en' | 'fr' | 'hi';
  public lastLogin!: Date | null;
  public isActive!: boolean;
  public firstName!: string | null;
  public lastName!: string | null;
  public fullName!: string | null;
  public phone!: string | null;
  public address!: string | null;
  public avatar!: string | null;
  public timezone!: string | null;
  public preferences!: Record<string, any> | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // 4. Associations
  public static associate(models: any): void {
    this.hasMany(models.AuthToken, { foreignKey: 'userId' });
  }

  // 5. Initialization
  public static initialize(sequelize: Sequelize): void {
    const attributes = {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      passwordHash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mobileNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM('admin', 'consultant', 'client', 'employee'),
        allowNull: false,
      },
      isOnboarded: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      language: {
        type: DataTypes.ENUM('en', 'fr', 'hi'),
        allowNull: false,
        defaultValue: 'en',
      },
      lastLogin: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      timezone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      preferences: {
        type: DataTypes.JSON,
        allowNull: true,
      },
    };

    const options = {
      sequelize,
      tableName: 'Users',
      modelName: 'User',
      timestamps: true,
    };

    User.init(attributes as any, options);
  }
}
