// src/models/PaymentProcessor.ts
import {
    Model,
    DataTypes,
    Optional,
    Sequelize
  } from 'sequelize';
  
  export interface PaymentProcessorAttributes {
    id: string;
    name: string;
    provider: 'stripe' | 'paypal' | 'other';
    credentials: Record<string, any>;
    enabled: boolean;
    settings?: Record<string, any>;
    metadata?: Record<string, any>;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export interface PaymentProcessorCreationAttributes
    extends Optional<
      PaymentProcessorAttributes,
      | 'id'
      | 'settings'
      | 'metadata'
      | 'createdAt'
      | 'updatedAt'
    > {}
  
  export class PaymentProcessor
    extends Model<PaymentProcessorAttributes, PaymentProcessorCreationAttributes>
    implements PaymentProcessorAttributes {
    public id!: string;
    public name!: string;
    public provider!: PaymentProcessorAttributes['provider'];
    public credentials!: Record<string, any>;
    public enabled!: boolean;
    public settings?: Record<string, any>;
    public metadata?: Record<string, any>;
  
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  
    /** Called by src/models/index.ts */
    public static initialize(sequelize: Sequelize) {
      PaymentProcessor.init(
        {
          id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
          },
          name: {
            type: DataTypes.STRING,
            allowNull: false
          },
          provider: {
            type: DataTypes.ENUM('stripe','paypal','other'),
            allowNull: false
          },
          credentials: {
            type: DataTypes.JSONB,
            allowNull: false
          },
          enabled: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
          },
          settings: {
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
          tableName: 'PaymentProcessors'
        }
      );
    }
  }
  