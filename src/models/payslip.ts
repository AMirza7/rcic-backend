// src/models/payslip.ts
import {
  Model,
  DataTypes,
  Sequelize,
  Optional
} from 'sequelize';

// 1. Attribute interface
export interface PayslipAttributes {
  id: string;
  payrollRunId: string;
  format: string;
  url: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// 2. Creation attributes (id optional)
export interface PayslipCreationAttributes
  extends Optional<PayslipAttributes, 'id'> {}

// 3. Model class
export class Payslip
  extends Model<PayslipAttributes, PayslipCreationAttributes>
  implements PayslipAttributes
{
  public id!: string;
  public payrollRunId!: string;
  public format!: string;
  public url!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // 4. Associations
  public static associate(models: any): void {
    // e.g. this.belongsTo(models.PayrollRun, { foreignKey: 'payrollRunId' });
  }

  // 5. Initialization
  public static initialize(sequelize: Sequelize): void {
    Payslip.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        payrollRunId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        format: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        url: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'Payslips',
        modelName: 'Payslip',
        timestamps: true,
      }
    );
  }
}
