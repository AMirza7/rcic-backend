import {
    Model,
    DataTypes,
    Sequelize,
    Optional
  } from 'sequelize';
  
  export interface InvoiceItemAttributes {
    id: string;
    invoiceId: string;
    description: string;
    amount: string;      // stored as string because DECIMAL
    quantity: number;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export interface InvoiceItemCreationAttributes
    extends Optional<InvoiceItemAttributes, 'id' | 'quantity'> {}
  
  export class InvoiceItem
    extends Model<InvoiceItemAttributes, InvoiceItemCreationAttributes>
    implements InvoiceItemAttributes
  {
    public id!: string;
    public invoiceId!: string;
    public description!: string;
    public amount!: string;
    public quantity!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  
    static initialize(sequelize: Sequelize) {
      InvoiceItem.init({
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true
        },
        invoiceId: {
          type: DataTypes.UUID,
          allowNull: false
        },
        description: {
          type: DataTypes.STRING,
          allowNull: false
        },
        amount: {
          type: DataTypes.DECIMAL(12, 2),
          allowNull: false
        },
        quantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 1
        }
      }, {
        sequelize,
        tableName: 'InvoiceItems'
      });
    }
  
    static associate(models: any) {
      InvoiceItem.belongsTo(models.BillingInvoice, {
        foreignKey: 'invoiceId',
        as: 'invoice'
      });
    }
  }
  