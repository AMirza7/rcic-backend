// src/models/SecurityEvent.ts
import {
    Model,
    DataTypes,
    Optional,
    Sequelize
  } from 'sequelize';
  
  export interface SecurityEventAttributes {
    id: string;
    userId?: string;
    eventType: string;
    eventData?: Record<string, any>;
    ipAddress?: string;
    userAgent?: string;
    riskScore?: number;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export interface SecurityEventCreationAttributes
    extends Optional<
      SecurityEventAttributes,
      | 'id'
      | 'userId'
      | 'eventData'
      | 'ipAddress'
      | 'userAgent'
      | 'riskScore'
      | 'createdAt'
      | 'updatedAt'
    > {}
  
  export class SecurityEvent
    extends Model<SecurityEventAttributes, SecurityEventCreationAttributes>
    implements SecurityEventAttributes {
    public id!: string;
    public userId?: string;
    public eventType!: string;
    public eventData?: Record<string, any>;
    public ipAddress?: string;
    public userAgent?: string;
    public riskScore?: number;
  
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  
    /** Called by src/models/index.ts */
    public static initialize(sequelize: Sequelize) {
      SecurityEvent.init(
        {
          id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
          },
          userId: {
            type: DataTypes.UUID,
            allowNull: true,
            references: { model: 'Users', key: 'id' },
            onDelete: 'SET NULL'
          },
          eventType: {
            type: DataTypes.STRING,
            allowNull: false
          },
          eventData: {
            type: DataTypes.JSONB,
            allowNull: true
          },
          ipAddress: {
            type: DataTypes.STRING,
            allowNull: true
          },
          userAgent: {
            type: DataTypes.STRING,
            allowNull: true
          },
          riskScore: {
            type: DataTypes.FLOAT,
            allowNull: true
          }
        },
        {
          sequelize,
          tableName: 'SecurityEvents'
        }
      );
    }
  }
  