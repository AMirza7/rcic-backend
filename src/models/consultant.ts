// src/models/consultant.ts
import {
  Model,
  DataTypes,
  Sequelize,
  Optional
} from 'sequelize';

// 1. Attribute interface
export interface ConsultantAttributes {
  id: string;
  userId: string;
  businessName: string;
  consultantCode: string;
  registrationNumber?: string;
  isVerified: boolean;
  qrCode?: string;
  website?: string;
  bio?: string;
  specializations: any;
  languages: any;
  businessHours?: any;
  commission: any;
  createdAt?: Date;
  updatedAt?: Date;
}

// 2. Creation attributes
export interface ConsultantCreationAttributes
  extends Optional<
    ConsultantAttributes,
    'id' | 'registrationNumber' | 'qrCode' | 'website' | 'bio' | 'businessHours'
  > {}

// 3. Model class
export class Consultant
  extends Model<ConsultantAttributes, ConsultantCreationAttributes>
  implements ConsultantAttributes
{
  public id!: string;
  public userId!: string;
  public businessName!: string;
  public consultantCode!: string;
  public registrationNumber?: string;
  public isVerified!: boolean;
  public qrCode?: string;
  public website?: string;
  public bio?: string;
  public specializations!: any;
  public languages!: any;
  public businessHours?: any;
  public commission!: any;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // 4. Associations
  public static associate(models: any): void {
    // e.g. this.belongsTo(models.User, { foreignKey: 'userId' });
  }

  // 5. Initialization
  public static initialize(sequelize: Sequelize): void {
    Consultant.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        userId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        businessName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        consultantCode: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        registrationNumber: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        isVerified: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        qrCode: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        website: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        bio: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        specializations: {
          type: DataTypes.JSON,
          allowNull: false,
        },
        languages: {
          type: DataTypes.JSON,
          allowNull: false,
        },
        businessHours: {
          type: DataTypes.JSON,
          allowNull: true,
        },
        commission: {
          type: DataTypes.JSON,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'Consultants',
        modelName: 'Consultant',
        timestamps: true,
      }
    );
  }
}
