// src/models/Integration.ts
import {
    Model,
    DataTypes,
    Optional,
    Sequelize
  } from 'sequelize';
  
  export interface IntegrationAttributes {
    id: string;
    userId: string;
    provider: string;                 // e.g. 'google', 'outlook', 'slack'
    credentials: Record<string, any>; // tokens, keys, etc.
    enabled: boolean;
    settings?: Record<string, any>;
    metadata?: Record<string, any>;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export interface IntegrationCreationAttributes
    extends Optional<
      IntegrationAttributes,
      'id' | 'settings' | 'metadata' | 'createdAt' | 'updatedAt'
    > {}
  
  export class Integration
    extends Model<IntegrationAttributes, IntegrationCreationAttributes>
    implements IntegrationAttributes {
    public id!: string;
    public userId!: string;
    public provider!: string;
    public credentials!: Record<string, any>;
    public enabled!: boolean;
    public settings?: Record<string, any>;
    public metadata?: Record<string, any>;
  
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  
    public static initialize(sequelize: Sequelize) {
      Integration.init(
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
          provider: {
            type: DataTypes.STRING,
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
          tableName: 'Integrations'
        }
      );
    }
  
    public static associate(models: any) {
      Integration.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
    }
  }
  