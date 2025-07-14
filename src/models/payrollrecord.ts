// src/models/payrollrecord.ts
import {
  Model,
  DataTypes,
  Sequelize,
  Optional
} from 'sequelize';

// 1. Attribute interface
export interface PayrollRecordAttributes {
  id: string;
  employeeId: string;
  payPeriodStart: Date;
  payPeriodEnd: Date;
  hoursWorked: number;
  regularHours: number;
  overtimeHours: number;
  grossPay: number;
  deductions: any;
  netPay: number;
  paymentDate: Date;
  status: string;
  payslipUrl: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

// 2. Creation attributes (id and payslipUrl optional)
export interface PayrollRecordCreationAttributes
  extends Optional<PayrollRecordAttributes, 'id' | 'payslipUrl'> {}

// 3. Model class
export class PayrollRecord
  extends Model<PayrollRecordAttributes, PayrollRecordCreationAttributes>
  implements PayrollRecordAttributes
{
  public id!: string;
  public employeeId!: string;
  public payPeriodStart!: Date;
  public payPeriodEnd!: Date;
  public hoursWorked!: number;
  public regularHours!: number;
  public overtimeHours!: number;
  public grossPay!: number;
  public deductions!: any;
  public netPay!: number;
  public paymentDate!: Date;
  public status!: string;
  public payslipUrl!: string | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // 4. Associations
  public static associate(models: any): void {
    // e.g. this.belongsTo(models.Employee, { foreignKey: 'employeeId' });
  }

  // 5. Initialization
  public static initialize(sequelize: Sequelize): void {
    PayrollRecord.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        employeeId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        payPeriodStart: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        payPeriodEnd: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        hoursWorked: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        regularHours: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        overtimeHours: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        grossPay: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        deductions: {
          type: DataTypes.JSON,
          allowNull: false,
        },
        netPay: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        paymentDate: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        status: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        payslipUrl: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'PayrollRecords',
        modelName: 'PayrollRecord',
        timestamps: true,
      }
    );
  }
}
