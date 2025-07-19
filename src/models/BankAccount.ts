// src/models/BankAccount.ts
import {
    Model,
    DataTypes,
    Optional,
    Sequelize
  } from 'sequelize';
  
  export interface BankAccountAttributes {
    id: string;
    userId: string;
    accountHolderName: string;
    accountNumber: string;
    routingNumber: string;
    bankName: string;
    accountType: 'checking' | 'savings' | 'other';
    currency: string; // ISO 4217, e.g. 'CAD','USD'
    isVerified: boolean;
    verifiedAt?: Date;
    limits?: Record<string, any>;
    fees?: Record<string, any>;
    metadata?: Record<string, any>;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export interface BankAccountCreationAttributes
    extends Optional<
      BankAccountAttributes,
      | 'id'
      | 'verifiedAt'
      | 'limits'
      | 'fees'
      | 'metadata'
      | 'createdAt'
      | 'updatedAt'
    > {}
  
  export class BankAccount
    extends Model<BankAccountAttributes, BankAccountCreationAttributes>
    implements BankAccountAttributes {
    public id!: string;
    public userId!: string;
    public accountHolderName!: string;
    public accountNumber!: string;
    public routingNumber!: string;
    public bankName!: string;
    public accountType!: BankAccountAttributes['accountType'];
    public currency!: string;
    public isVerified!: boolean;
    public verifiedAt?: Date;
    public limits?: Record<string, any>;
    public fees?: Record<string, any>;
    public metadata?: Record<string, any>;
  
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  
    /** Called by src/models/index.ts */
    public static initialize(sequelize: Sequelize) {
      BankAccount.init(
        {
          id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
          },
          userId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: { model: 'Users', key: 'id' },
            onDelete: 'CASCADE'
          },
          accountHolderName: {
            type: DataTypes.STRING,
            allowNull: false
          },
          accountNumber: {
            type: DataTypes.STRING,
            allowNull: false
          },
          routingNumber: {
            type: DataTypes.STRING,
            allowNull: false
          },
          bankName: {
            type: DataTypes.STRING,
            allowNull: false
          },
          accountType: {
            type: DataTypes.ENUM('checking','savings','other'),
            allowNull: false,
            defaultValue: 'checking'
          },
          currency: {
            type: DataTypes.STRING(3),
            allowNull: false
          },
          isVerified: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
          },
          verifiedAt: {
            type: DataTypes.DATE,
            allowNull: true
          },
          limits: {
            type: DataTypes.JSONB,
            allowNull: true
          },
          fees: {
            type: DataTypes.JSONB,
            allowNull: true
          },
          metadata: {
            type: DataTypes.JSONB,
            allowNull: true
          }
        },
        {
          sequelize,
          tableName: 'BankAccounts'
        }
      );
    }
  }
  