import {
  Model,
  DataTypes,
  Sequelize,
  Optional
} from 'sequelize';

// ──────────────────────────────────────────────────────────────────────────────
// 1. PayrollRun model
// ──────────────────────────────────────────────────────────────────────────────

export interface PayrollRunAttributes {
  id: string;
  consultantId: string;
  date: Date;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PayrollRunCreationAttributes
  extends Optional<PayrollRunAttributes, 'id'> {}

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

  public static associate(models: any): void {
    this.belongsTo(models.Consultant, { foreignKey: 'consultantId' });
    this.hasMany(models.PayrollBatch, { foreignKey: 'consultantId' });
  }

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

    // Initialize PayrollBatch immediately after
    PayrollBatch.initialize(sequelize);
  }
}

// ──────────────────────────────────────────────────────────────────────────────
// 2. PayrollBatch model
// ──────────────────────────────────────────────────────────────────────────────

export interface PayrollBatchAttributes {
  id: string;
  batchNumber: string;
  consultantId: string;
  totalAmount: string;
  entryCount: number;
  processedAt: Date;
  status: 'processed' | 'paid' | 'cancelled';
  paymentMethod: 'bank_transfer' | 'check' | 'direct_deposit';
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PayrollBatchCreationAttributes
  extends Optional<PayrollBatchAttributes, 'id'> {}

export class PayrollBatch
  extends Model<PayrollBatchAttributes, PayrollBatchCreationAttributes>
  implements PayrollBatchAttributes
{
  public id!: string;
  public batchNumber!: string;
  public consultantId!: string;
  public totalAmount!: string;
  public entryCount!: number;
  public processedAt!: Date;
  public status!: 'processed' | 'paid' | 'cancelled';
  public paymentMethod!: 'bank_transfer' | 'check' | 'direct_deposit';
  public notes?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associate(models: any): void {
    this.belongsTo(models.Consultant, { foreignKey: 'consultantId' });
    this.belongsTo(models.PayrollRun, { foreignKey: 'consultantId', targetKey: 'consultantId' });
  }

  public static initialize(sequelize: Sequelize): void {
    PayrollBatch.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        batchNumber: {
          type: DataTypes.STRING(50),
          allowNull: false,
          unique: true,
        },
        consultantId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        totalAmount: {
          type: DataTypes.DECIMAL(12, 2),
          allowNull: false,
        },
        entryCount: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        processedAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        status: {
          type: DataTypes.ENUM('processed', 'paid', 'cancelled'),
          allowNull: false,
        },
        paymentMethod: {
          type: DataTypes.ENUM('bank_transfer', 'check', 'direct_deposit'),
          allowNull: false,
        },
        notes: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'PayrollBatches',
        modelName: 'PayrollBatch',
        timestamps: true,
      }
    );
  }
}
