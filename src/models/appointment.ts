// src/models/appointment.ts
import {
  Model,
  DataTypes,
  Sequelize,
  Optional
} from 'sequelize';

// 1. Attribute interface
export interface AppointmentAttributes {
  id: string;
  consultantId: string;
  clientId: string;
  title: string;
  description: string;
  type: string;
  status: string;
  startTime: Date;
  endTime: Date;
  duration: number;
  location: string;
  meetingUrl: string;
  isVirtual: boolean;
  priority: string;
  amount: number;
  currency: string;
  paymentStatus: string;
  notes: string;
  reminderSent: boolean;
  attendees: any;
  documents: any;
  createdAt?: Date;
  updatedAt?: Date;
}

// 2. Creation attributes (id is optional on create)
export interface AppointmentCreationAttributes
  extends Optional<AppointmentAttributes, 'id'> {}

// 3. Model class
export class Appointment
  extends Model<AppointmentAttributes, AppointmentCreationAttributes>
  implements AppointmentAttributes
{
  public id!: string;
  public consultantId!: string;
  public clientId!: string;
  public title!: string;
  public description!: string;
  public type!: string;
  public status!: string;
  public startTime!: Date;
  public endTime!: Date;
  public duration!: number;
  public location!: string;
  public meetingUrl!: string;
  public isVirtual!: boolean;
  public priority!: string;
  public amount!: number;
  public currency!: string;
  public paymentStatus!: string;
  public notes!: string;
  public reminderSent!: boolean;
  public attendees!: any;
  public documents!: any;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // 4. Associations
  public static associate(models: any): void {
    // e.g. this.belongsTo(models.Consultant, { foreignKey: 'consultantId' });
    // this.belongsTo(models.Client, { foreignKey: 'clientId' });
  }

  // 5. Initialization
  public static initialize(sequelize: Sequelize) {
    Appointment.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        consultantId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        clientId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        type: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        status: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        startTime: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        endTime: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        duration: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        location: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        meetingUrl: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        isVirtual: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
        priority: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        amount: {
          type: DataTypes.FLOAT,
          allowNull: true,
        },
        currency: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        paymentStatus: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        notes: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        reminderSent: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        attendees: {
          type: DataTypes.JSON,
          allowNull: true,
        },
        documents: {
          type: DataTypes.JSON,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'Appointments',
        modelName: 'Appointment',
        timestamps: true,
      }
    );
  }
}
