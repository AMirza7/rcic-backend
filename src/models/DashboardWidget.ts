// src/models/DashboardWidget.ts
import {
    Model,
    DataTypes,
    Optional,
    Sequelize
  } from 'sequelize';
  
  export interface DashboardWidgetAttributes {
    id: string;
    userId: string;
    widgetType: string;                // e.g. 'stats', 'calendar', 'tasks'
    config: Record<string, any>;       // layout & content settings
    position: { x: number; y: number };
    size: { width: number; height: number };
    metadata?: Record<string, any>;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export interface DashboardWidgetCreationAttributes
    extends Optional<
      DashboardWidgetAttributes,
      'id' | 'metadata' | 'createdAt' | 'updatedAt'
    > {}
  
  export class DashboardWidget
    extends Model<DashboardWidgetAttributes, DashboardWidgetCreationAttributes>
    implements DashboardWidgetAttributes {
    public id!: string;
    public userId!: string;
    public widgetType!: string;
    public config!: Record<string, any>;
    public position!: { x: number; y: number };
    public size!: { width: number; height: number };
    public metadata?: Record<string, any>;
  
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  
    public static initialize(sequelize: Sequelize) {
      DashboardWidget.init(
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
          widgetType: {
            type: DataTypes.STRING,
            allowNull: false
          },
          config: {
            type: DataTypes.JSONB,
            allowNull: false
          },
          position: {
            type: DataTypes.JSONB,
            allowNull: false
          },
          size: {
            type: DataTypes.JSONB,
            allowNull: false
          },
          metadata: {
            type: DataTypes.JSONB,
            allowNull: true
          }
        },
        {
          sequelize,
          tableName: 'DashboardWidgets'
        }
      );
    }
  
    public static associate(models: any) {
      DashboardWidget.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
    }
  }
  