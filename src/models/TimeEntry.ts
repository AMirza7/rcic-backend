// src/models/TimeEntry.ts
import { Model, DataTypes, Optional, Sequelize } from 'sequelize';

export interface TimeEntryAttributes {
  id: string;
  timesheetId: string;
  date: Date;
  startTime: string;
  endTime: string;
  breakDuration: number;
  hoursWorked: number;
  entryType: 'regular' | 'overtime' | 'vacation' | 'sick' | 'holiday' | 'training';
  taskDescription?: string;
  clientId?: string;
  projectId?: string;
  billable: boolean;
  hourlyRate?: number;
  location: 'office' | 'remote' | 'client_site' | 'other';
  approved: boolean;
  notes?: string;
  gpsLocation?: { latitude: number; longitude: number; accuracy: number };
  deviceInfo?: { ip: string; userAgent: string };
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TimeEntryCreationAttributes
  extends Optional<
    TimeEntryAttributes,
    | 'id'
    | 'taskDescription'
    | 'clientId'
    | 'projectId'
    | 'hourlyRate'
    | 'notes'
    | 'gpsLocation'
    | 'deviceInfo'
    | 'createdAt'
    | 'updatedAt'
  > {}

export class TimeEntry
  extends Model<TimeEntryAttributes, TimeEntryCreationAttributes>
  implements TimeEntryAttributes {
  public id!: string;
  public timesheetId!: string;
  public date!: Date;
  public startTime!: string;
  public endTime!: string;
  public breakDuration!: number;
  public hoursWorked!: number;
  public entryType!: TimeEntryAttributes['entryType'];
  public taskDescription?: string;
  public clientId?: string;
  public projectId?: string;
  public billable!: boolean;
  public hourlyRate?: number;
  public location!: TimeEntryAttributes['location'];
  public approved!: boolean;
  public notes?: string;
  public gpsLocation?: { latitude: number; longitude: number; accuracy: number };
  public deviceInfo?: { ip: string; userAgent: string };

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  /** Called by src/models/index.ts */
  public static initialize(sequelize: Sequelize) {
    TimeEntry.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true
        },
        timesheetId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: { model: 'Timesheets', key: 'id' },
          onDelete: 'CASCADE'
        },
        date: {
          type: DataTypes.DATE,
          allowNull: false
        },
        startTime: {
          type: DataTypes.STRING,
          allowNull: false
        },
        endTime: {
          type: DataTypes.STRING,
          allowNull: false
        },
        breakDuration: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        hoursWorked: {
          type: DataTypes.FLOAT,
          allowNull: false
        },
        entryType: {
          type: DataTypes.ENUM('regular','overtime','vacation','sick','holiday','training'),
          allowNull: false
        },
        taskDescription: {
          type: DataTypes.TEXT,
          allowNull: true
        },
        clientId: {
          type: DataTypes.UUID,
          allowNull: true,
          references: { model: 'Clients', key: 'id' },
          onDelete: 'SET NULL'
        },
        projectId: {
          type: DataTypes.STRING,
          allowNull: true
        },
        billable: {
          type: DataTypes.BOOLEAN,
          allowNull: false
        },
        hourlyRate: {
          type: DataTypes.DECIMAL,
          allowNull: true
        },
        location: {
          type: DataTypes.ENUM('office','remote','client_site','other'),
          allowNull: false
        },
        approved: {
          type: DataTypes.BOOLEAN,
          allowNull: false
        },
        notes: {
          type: DataTypes.TEXT,
          allowNull: true
        },
        gpsLocation: {
          type: DataTypes.JSONB,
          allowNull: true
        },
        deviceInfo: {
          type: DataTypes.JSONB,
          allowNull: true
        }
      },
      {
        sequelize,
        tableName: 'TimeEntries'
      }
    );
  }

  public static associate(models: any) {
    TimeEntry.belongsTo(models.Timesheet, {
      foreignKey: 'timesheetId',
      as: 'timesheet'
    });
  }
}
