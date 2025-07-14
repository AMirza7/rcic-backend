// src/models/otp.ts
import {
  Model,
  DataTypes,
  Sequelize,
  Optional
} from 'sequelize';

// 1. All attributes
export interface OtpAttributes {
  id: string;
  userId: string;
  phoneNumber: string;
  code: string;
  expiresAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

// 2. Attributes needed on creation (only id is optional)
export interface OtpCreationAttributes
  extends Optional<OtpAttributes, 'id'> {}

// 3. Model definition
export class Otp
  extends Model<OtpAttributes, OtpCreationAttributes>
  implements OtpAttributes
{
  public id!: string;
  public userId!: string;
  public phoneNumber!: string;
  public code!: string;
  public expiresAt!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  /** Called from models/index.ts */
  static initialize(sequelize: Sequelize) {
    Otp.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        userId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: { model: 'Users', key: 'id' },
          onDelete: 'CASCADE',
        },
        phoneNumber: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        code: {
          type: DataTypes.STRING(6),
          allowNull: false,
        },
        expiresAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'Otps',
        timestamps: true,
      }
    );
  }

  /** Set up associations */
  static associate(models: any) {
    Otp.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  }
}
