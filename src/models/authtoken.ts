// src/models/authtoken.ts
import {
  Model,
  DataTypes,
  Sequelize,
  Optional
} from 'sequelize';

// 1. Attribute interface
export interface AuthTokenAttributes {
  id: string;
  token: string;
  refreshToken: string;
  expiresAt: Date;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// 2. Creation attributes (id is optional on creation)
export interface AuthTokenCreationAttributes
  extends Optional<AuthTokenAttributes, 'id'> {}

// 3. Model class
export class AuthToken
  extends Model<AuthTokenAttributes, AuthTokenCreationAttributes>
  implements AuthTokenAttributes
{
  public id!: string;
  public token!: string;
  public refreshToken!: string;
  public expiresAt!: Date;
  public userId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // 4. Associations
  public static associate(models: any): void {
    // e.g. this.belongsTo(models.User, { foreignKey: 'userId' });
  }

  // 5. Initialization
  public static initialize(sequelize: Sequelize) {
    AuthToken.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        token: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        refreshToken: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        expiresAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        userId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'AuthTokens',
        modelName: 'AuthToken',
        timestamps: true,
      }
    );
  }
}
