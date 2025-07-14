// src/models/otp.ts
import {
  Model,
  DataTypes,
  Sequelize,
  Optional
} from 'sequelize';

// 1. Attribute interface
export interface OtpAttributes {
  id: string;
  mobileNumber: string;
  code: string;
  expiresAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

// 2. Creation attributes (id optional)
export interface OtpCreationAttributes
  extends Optional<OtpAttributes, 'id'> {}

// 3. Model class
export class Otp
  extends Model<OtpAttributes, OtpCreationAttributes>
  implements OtpAttributes
{
  public id!: string;
  public mobileNumber!: string;
  public code!: string;
  public expiresAt!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // 4. Associations
  public static associate(models: any): void {
    // define associations here if needed
  }

  // 5. Initialization
  public static initialize(sequelize: Sequelize): void {
    Otp.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        mobileNumber: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        code: {
          type: DataTypes.STRING,
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
        modelName: 'Otp',
        timestamps: true,
      }
    );
  }
}
