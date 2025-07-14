// src/models/client.ts
import {
  Model,
  DataTypes,
  Sequelize,
  Optional
} from 'sequelize';

// 1. Attribute interface
export interface ClientAttributes {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  consultantId: string;
  consultantCode: string;
  caseType: string;
  caseStatus: string;
  priority: string;
  dateOfBirth: Date;
  nationality: string;
  passportNumber: string;
  passportExpiry: Date;
  visaStatus: string;
  applicationNumber: string;
  progress: number;
  lastActivity: Date;
  notes: string | null;
  emergencyContact: any | null;
  createdAt?: Date;
  updatedAt?: Date;
}

// 2. Creation attributes (id optional, nullable fields optional)
export interface ClientCreationAttributes
  extends Optional<ClientAttributes, 'id' | 'notes' | 'emergencyContact'> {}

// 3. Model class
export class Client
  extends Model<ClientAttributes, ClientCreationAttributes>
  implements ClientAttributes
{
  public id!: string;
  public userId!: string;
  public firstName!: string;
  public lastName!: string;
  public consultantId!: string;
  public consultantCode!: string;
  public caseType!: string;
  public caseStatus!: string;
  public priority!: string;
  public dateOfBirth!: Date;
  public nationality!: string;
  public passportNumber!: string;
  public passportExpiry!: Date;
  public visaStatus!: string;
  public applicationNumber!: string;
  public progress!: number;
  public lastActivity!: Date;
  public notes!: string | null;
  public emergencyContact!: any | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // 4. Define associations here
  public static associate(models: any): void {
    // e.g. this.belongsTo(models.User, { foreignKey: 'userId' });
    // this.belongsTo(models.Consultant, { foreignKey: 'consultantId' });
  }

  // 5. Initialization
  public static initialize(sequelize: Sequelize) {
    Client.init(
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
        firstName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        lastName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        consultantId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        consultantCode: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        caseType: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        caseStatus: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        priority: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        dateOfBirth: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        nationality: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        passportNumber: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        passportExpiry: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        visaStatus: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        applicationNumber: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        progress: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        lastActivity: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        notes: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        emergencyContact: {
          type: DataTypes.JSON,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'Clients',
        modelName: 'Client',
        timestamps: true,
      }
    );
  }
}
