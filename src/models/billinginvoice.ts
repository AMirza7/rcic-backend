// src/models/billinginvoice.ts
import {
  Model,
  DataTypes,
  Sequelize,
  Optional
} from 'sequelize';

// 1. Define attribute interface
export interface BillingInvoiceAttributes {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  status: string;
  billingDate: Date;
  periodStart: Date;
  periodEnd: Date;
  dueDate: Date;
  paidAt: Date | null;
  planName: string;
  downloadUrl: string | null;
  items: any;
  createdAt?: Date;
  updatedAt?: Date;
}

// 2. Define creation attributes (id optional, paidAt/downloadUrl optional)
export interface BillingInvoiceCreationAttributes
  extends Optional<BillingInvoiceAttributes, 'id' | 'paidAt' | 'downloadUrl'> {}

// 3. Model class
export class BillingInvoice
  extends Model<BillingInvoiceAttributes, BillingInvoiceCreationAttributes>
  implements BillingInvoiceAttributes
{
  public id!: string;
  public userId!: string;
  public amount!: number;
  public currency!: string;
  public status!: string;
  public billingDate!: Date;
  public periodStart!: Date;
  public periodEnd!: Date;
  public dueDate!: Date;
  public paidAt!: Date | null;
  public planName!: string;
  public downloadUrl!: string | null;
  public items!: any;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // 4. Associations
  public static associate(models: any): void {
    // e.g. this.belongsTo(models.User, { foreignKey: 'userId' });
  }

  // 5. Initialization
  public static initialize(sequelize: Sequelize) {
    BillingInvoice.init(
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
        amount: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        currency: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        status: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        billingDate: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        periodStart: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        periodEnd: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        dueDate: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        paidAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        planName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        downloadUrl: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        items: {
          type: DataTypes.JSON,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'BillingInvoices',
        modelName: 'BillingInvoice',
        timestamps: true,
      }
    );
  }
}
