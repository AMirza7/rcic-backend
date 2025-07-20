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
  description?: string;
  type: 'walk-in' | 'advance';
  status: string;
  startTime: Date;
  endTime: Date;
  duration: number;
  location?: string;
  meetingUrl?: string;
  isVirtual: boolean;
  priority: string;
  amount?: number;
  currency?: string;
  paymentStatus?: string;
  notes?: string;
  reminderSent: boolean;
  attendees?: any;
  documents?: any;
  consultantName: string;
  clientEmail: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// 2. Creation attributes (id & optional fields)
export interface AppointmentCreationAttributes
  extends Optional<
    AppointmentAttributes,
    | 'id'
    | 'description'
    | 'location'
    | 'meetingUrl'
    | 'amount'
    | 'currency'
    | 'paymentStatus'
    | 'notes'
    | 'attendees'
    | 'documents'
    | 'createdAt'
    | 'updatedAt'
  > {}

// 3. Model class
export class Appointment
  extends Model<AppointmentAttributes, AppointmentCreationAttributes>
  implements AppointmentAttributes
{
  public id!: string;
  public consultantId!: string;
  public clientId!: string;
  public title!: string;
  public description?: string;
  public type!: 'walk-in' | 'advance';
  public status!: string;
  public startTime!: Date;
  public endTime!: Date;
  public duration!: number;
  public location?: string;
  public meetingUrl?: string;
  public isVirtual!: boolean;
  public priority!: string;
  public amount?: number;
  public currency?: string;
  public paymentStatus?: string;
  public notes?: string;
  public reminderSent!: boolean;
  public attendees?: any;
  public documents?: any;
  public consultantName!: string;
  public clientEmail!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // 4. Associations
  public static associate(models: any): void {
    Appointment.belongsTo(models.Consultant, { foreignKey: 'consultantId', as: 'consultant' });
    Appointment.belongsTo(models.Client, { foreignKey: 'clientId', as: 'client' });
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
          type: DataTypes.ENUM('walk-in', 'advance'),
          allowNull: false,
          defaultValue: 'advance'
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
          type: DataTypes.JSONB,
          allowNull: true,
        },
        documents: {
          type: DataTypes.JSONB,
          allowNull: true,
        },
        consultantName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        clientEmail: {
          type: DataTypes.STRING,
          allowNull: false,
        }
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
