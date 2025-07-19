// src/models/WithdrawalRequest.ts
import {
    Model,
    DataTypes,
    Optional,
    Sequelize
  } from 'sequelize';
  
  export interface WithdrawalRequestAttributes {
    id: string;
    userId: string;
    userType: 'client' | 'consultant';
    amount: number;
    status: 'requested' | 'processing' | 'paid' | 'rejected';
    requestedAt: Date;
    processedAt?: Date;
    processedBy?: string;
    paymentMethod?: 'bank_transfer' | 'paypal' | 'check';
    notes?: string;
    rejectionReason?: string;
    metadata?: Record<string, any>;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export interface WithdrawalRequestCreationAttributes
    extends Optional<
      WithdrawalRequestAttributes,
      | 'id'
      | 'processedAt'
      | 'processedBy'
      | 'paymentMethod'
      | 'notes'
      | 'rejectionReason'
      | 'metadata'
      | 'createdAt'
      | 'updatedAt'
    > {}
  
  export class WithdrawalRequest
    extends Model<WithdrawalRequestAttributes, WithdrawalRequestCreationAttributes>
    implements WithdrawalRequestAttributes {
    public id!: string;
    public userId!: string;
    public userType!: 'client' | 'consultant';
    public amount!: number;
    public status!: 'requested' | 'processing' | 'paid' | 'rejected';
    public requestedAt!: Date;
    public processedAt?: Date;
    public processedBy?: string;
    public paymentMethod?: 'bank_transfer' | 'paypal' | 'check';
    public notes?: string;
    public rejectionReason?: string;
    public metadata?: Record<string, any>;
  
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  
    /** Called by src/models/index.ts */
    public static initialize(sequelize: Sequelize) {
      WithdrawalRequest.init(
        {
          id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
          },
          userId: {
            type: DataTypes.UUID,
            allowNull: false
          },
          userType: {
            type: DataTypes.ENUM('client', 'consultant'),
            allowNull: false
          },
          amount: {
            type: DataTypes.DECIMAL,
            allowNull: false
          },
          status: {
            type: DataTypes.ENUM('requested', 'processing', 'paid', 'rejected'),
            allowNull: false,
            defaultValue: 'requested'
          },
          requestedAt: {
            type: DataTypes.DATE,
            allowNull: false
          },
          processedAt: {
            type: DataTypes.DATE,
            allowNull: true
          },
          processedBy: {
            type: DataTypes.UUID,
            allowNull: true
          },
          paymentMethod: {
            type: DataTypes.ENUM('bank_transfer', 'paypal', 'check'),
            allowNull: true
          },
          notes: {
            type: DataTypes.TEXT,
            allowNull: true
          },
          rejectionReason: {
            type: DataTypes.TEXT,
            allowNull: true
          },
          metadata: {
            type: DataTypes.JSONB,
            allowNull: true
          }
        },
        {
          sequelize,
          tableName: 'WithdrawalRequests'
        }
      );
    }
  }
  