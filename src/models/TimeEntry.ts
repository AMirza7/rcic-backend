import {
  Model,
  DataTypes,
  Sequelize,
  Optional
} from 'sequelize';
import { Consultant } from './consultant';
import { Client } from './client';
import { User } from './user';

export interface TimeEntryAttributes {
  id: string;
  employeeId: string;
  consultantId: string;
  date: Date;
  startTime: string;
  endTime: string;
  totalHours: number;
  clientName: string;
  projectType?: string;
  taskCategory?: string;
  description: string;
  notes?: string;
  status: 'submitted' | 'approved' | 'rejected' | 'consultant_approved';
  rejectionReason?: string;
  hourlyRate: number;
  totalAmount: number;
  submittedAt: Date;
  consultantReviewedAt?: Date;
  adminReviewedAt?: Date;
  payrollStatus: 'pending' | 'processed' | 'paid';
  payrollBatch?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TimeEntryCreationAttributes
  extends Optional<
    TimeEntryAttributes,
    | 'id'
    | 'notes'
    | 'rejectionReason'
    | 'consultantReviewedAt'
    | 'adminReviewedAt'
    | 'payrollBatch'
    | 'projectType'
    | 'taskCategory'
    | 'createdAt'
    | 'updatedAt'
  > {}

export class TimeEntry
  extends Model<TimeEntryAttributes, TimeEntryCreationAttributes>
  implements TimeEntryAttributes {
  public id!: string;
  public employeeId!: string;
  public consultantId!: string;
  public date!: Date;
  public startTime!: string;
  public endTime!: string;
  public totalHours!: number;
  public clientName!: string;
  public projectType?: string;
  public taskCategory?: string;
  public description!: string;
  public notes?: string;
  public status!: TimeEntryAttributes['status'];
  public rejectionReason?: string;
  public hourlyRate!: number;
  public totalAmount!: number;
  public submittedAt!: Date;
  public consultantReviewedAt?: Date;
  public adminReviewedAt?: Date;
  public payrollStatus!: TimeEntryAttributes['payrollStatus'];
  public payrollBatch?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initialize(sequelize: Sequelize) {
    TimeEntry.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: Sequelize.literal('gen_random_uuid()'),
          allowNull: false,
          primaryKey: true,
        },
        employeeId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: { model: 'Users', key: 'id' },
        },
        consultantId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: { model: 'Users', key: 'id' },
        },
        date: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
        startTime: {
          type: DataTypes.TIME,
          allowNull: false,
        },
        endTime: {
          type: DataTypes.TIME,
          allowNull: false,
        },
        totalHours: {
          type: DataTypes.DECIMAL(5, 2),
          allowNull: false,
        },
        clientName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        projectType: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        taskCategory: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        notes: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        status: {
          type: DataTypes.ENUM(
            'submitted',
            'approved',
            'rejected',
            'consultant_approved'
          ),
          allowNull: false,
          defaultValue: 'submitted',
        },
        rejectionReason: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        hourlyRate: {
          type: DataTypes.DECIMAL(12, 2),
          allowNull: false,
        },
        totalAmount: {
          type: DataTypes.DECIMAL(12, 2),
          allowNull: false,
        },
        submittedAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        consultantReviewedAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        adminReviewedAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        payrollStatus: {
          type: DataTypes.ENUM('pending', 'processed', 'paid'),
          allowNull: false,
          defaultValue: 'pending',
        },
        payrollBatch: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'TimeEntries',
        timestamps: true,
      }
    );
  }

  static associate(models: any) {
    TimeEntry.belongsTo(models.User, { foreignKey: 'employeeId', as: 'employee' });
    TimeEntry.belongsTo(models.User, { foreignKey: 'consultantId', as: 'consultant' });
    // other associations…
  }
}
