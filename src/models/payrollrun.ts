// src/models/payrollrun.ts
import {
  Model,
  DataTypes,
  Sequelize,
  Optional
} from 'sequelize';

// 1. Attribute interface
export interface PayrollRunAttributes {
  id: string;
  consultantId: string;
  date: Date;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// 2. Creation attributes (id optional)
export interface PayrollRunCreationAttributes
  extends Optional<PayrollRunAttributes, 'id'> {}

// 3. Model class
export class PayrollRun
  extends Model<PayrollRunAttributes, PayrollRunCreationAttributes>
  implements PayrollRunAttributes
{
  public id!: string;
  public consultantId!: string;
  public date!: Date;
  public status!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // 4. Associations
  public static associate(models: any): void {
    // e.g. this.belongsTo(models.Consultant, { foreignKey: 'consultantId' });
    // this.hasMany(models.PayrollRecord, { foreignKey: 'payrollRunId' });
  }

  // 5. Initialization
  public static initialize(sequelize: Sequelize): void {
    PayrollRun.init(
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
        date: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        status: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'PayrollRuns',
        modelName: 'PayrollRun',
        timestamps: true,
      }
    );
  }
}
