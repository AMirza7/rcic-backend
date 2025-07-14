// src/models/user.ts
import {
  Model,
  DataTypes,
  Sequelize,
  Optional
} from 'sequelize';

// 1. Define attribute interface
export interface UserAttributes {
  id: string;
  email: string;
  passwordHash: string;
  mobileNumber: string;
  role: 'admin' | 'consultant' | 'client' | 'employee';
  isOnboarded: boolean;
  language: 'en' | 'fr' | 'hi';
  createdAt: Date;
  lastLogin: Date | null;
  isActive: boolean;
  firstName: string | null;
  lastName: string | null;
  fullName: string | null;
  phone: string | null;
  address: string | null;
  avatar: string | null;
  timezone: string | null;
  preferences: any | null;
  updatedAt?: Date;
}

// 2. Define creation attributes (id, lastLogin, createdAt, updatedAt, and nullable fields are optional)
export interface UserCreationAttributes
  extends Optional<
    UserAttributes,
    | 'id'
    | 'lastLogin'
    | 'createdAt'
    | 'updatedAt'
    | 'firstName'
    | 'lastName'
    | 'fullName'
    | 'phone'
    | 'address'
    | 'avatar'
    | 'timezone'
    | 'preferences'
  > {}

// 3. Model class
export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: string;
  public email!: string;
  public passwordHash!: string;
  public mobileNumber!: string;
  public role!: 'admin' | 'consultant' | 'client' | 'employee';
  public isOnboarded!: boolean;
  public language!: 'en' | 'fr' | 'hi';
  public createdAt!: Date;
  public lastLogin!: Date | null;
  public isActive!: boolean;
  public firstName!: string | null;
  public lastName!: string | null;
  public fullName!: string | null;
  public phone!: string | null;
  public address!: string | null;
  public avatar!: string | null;
  public timezone!: string | null;
  public preferences!: any | null;

  public readonly updatedAt!: Date;

  // 4. Associations
  public static associate(models: any): void {
    // define associations here, e.g.
    // this.hasMany(models.AuthToken, { foreignKey: 'userId' });
  }

  // 5. Initialization
  public static initialize(sequelize: Sequelize): void {
    User.init(
      {
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
          type: DataTypes.STRING,
          allowNull: false,
        },
        isOnboarded: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        language: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
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
      },
      {
        sequelize,
        tableName: 'Users',
        modelName: 'User',
        timestamps: true,
      }
    );
  }
}
