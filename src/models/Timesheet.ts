// src/models/Timesheet.ts
import { Model, DataTypes, Optional, Sequelize } from 'sequelize';

export interface TotalHours {
  regular: number;
  overtime: number;
  vacation: number;
  sick: number;
  holiday: number;
  total: number;
}

export interface TimesheetAttributes {
  id: string;
  employeeId: string;
  consultantId: string;
  payPeriodStart: Date;
  payPeriodEnd: Date;
  status: 'draft' | 'submitted' | 'approved' | 'rejected' | 'paid';
  totalHours: TotalHours;
  submittedAt?: Date;
  submittedBy: string;
  approvedAt?: Date;
  approvedBy?: string;
  rejectedAt?: Date;
  rejectionReason?: string;
  notes?: string;
  payrollProcessed: boolean;
  payrollRecordId?: string;
  metadata?: Record<string, any>;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TimesheetCreationAttributes
  extends Optional<
    TimesheetAttributes,
    | 'id'
    | 'submittedAt'
    | 'approvedAt'
    | 'approvedBy'
    | 'rejectedAt'
    | 'rejectionReason'
    | 'notes'
    | 'payrollRecordId'
    | 'metadata'
    | 'createdAt'
    | 'updatedAt'
  > {}

export class Timesheet
  extends Model<TimesheetAttributes, TimesheetCreationAttributes>
  implements TimesheetAttributes {
  public id!: string;
  public employeeId!: string;
  public consultantId!: string;
  public payPeriodStart!: Date;
  public payPeriodEnd!: Date;
  public status!: TimesheetAttributes['status'];
  public totalHours!: TotalHours;
  public submittedAt?: Date;
  public submittedBy!: string;
  public approvedAt?: Date;
  public approvedBy?: string;
  public rejectedAt?: Date;
  public rejectionReason?: string;
  public notes?: string;
  public payrollProcessed!: boolean;
  public payrollRecordId?: string;
  public metadata?: Record<string, any>;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  /** Called by src/models/index.ts */
  public static initialize(sequelize: Sequelize) {
    Timesheet.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true
        },
        employeeId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: { model: 'Employees', key: 'id' },
          onDelete: 'CASCADE'
        },
        consultantId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: { model: 'Consultants', key: 'id' },
          onDelete: 'CASCADE'
        },
        payPeriodStart: {
          type: DataTypes.DATE,
          allowNull: false
        },
        payPeriodEnd: {
          type: DataTypes.DATE,
          allowNull: false
        },
        status: {
          type: DataTypes.ENUM('draft','submitted','approved','rejected','paid'),
          allowNull: false,
          defaultValue: 'draft'
        },
        totalHours: {
          type: DataTypes.JSONB,
          allowNull: false
        },
        submittedAt: {
          type: DataTypes.DATE,
          allowNull: true
        },
        submittedBy: {
          type: DataTypes.UUID,
          allowNull: false,
          references: { model: 'Users', key: 'id' },
          onDelete: 'SET NULL'
        },
        approvedAt: {
          type: DataTypes.DATE,
          allowNull: true
        },
        approvedBy: {
          type: DataTypes.UUID,
          allowNull: true,
          references: { model: 'Users', key: 'id' },
          onDelete: 'SET NULL'
        },
        rejectedAt: {
          type: DataTypes.DATE,
          allowNull: true
        },
        rejectionReason: {
          type: DataTypes.TEXT,
          allowNull: true
        },
        notes: {
          type: DataTypes.TEXT,
          allowNull: true
        },
        payrollProcessed: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false
        },
        payrollRecordId: {
          type: DataTypes.UUID,
          allowNull: true,
          references: { model: 'PayrollRecords', key: 'id' },
          onDelete: 'SET NULL'
        },
        metadata: {
          type: DataTypes.JSONB,
          allowNull: true
        }
      },
      {
        sequelize,
        tableName: 'Timesheets'
      }
    );
  }

  public static associate(models: any) {
    Timesheet.hasMany(models.TimeEntry, {
      foreignKey: 'timesheetId',
      as: 'entries'
    });
  }
}
