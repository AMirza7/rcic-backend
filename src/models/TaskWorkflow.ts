// src/models/TaskWorkflow.ts
import {
    Model,
    DataTypes,
    Optional,
    Sequelize
  } from 'sequelize';
  
  export interface TaskWorkflowAttributes {
    id: string;
    name: string;
    description?: string;
    triggerType: string;
    isActive: boolean;
    metadata?: Record<string, any>;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export interface TaskWorkflowCreationAttributes
    extends Optional<
      TaskWorkflowAttributes,
      'id' | 'description' | 'metadata' | 'createdAt' | 'updatedAt'
    > {}
  
  export class TaskWorkflow
    extends Model<TaskWorkflowAttributes, TaskWorkflowCreationAttributes>
    implements TaskWorkflowAttributes {
    public id!: string;
    public name!: string;
    public description?: string;
    public triggerType!: string;
    public isActive!: boolean;
    public metadata?: Record<string, any>;
  
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  
    /** Called from src/models/index.ts */
    public static initialize(sequelize: Sequelize) {
      TaskWorkflow.init(
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
          description: {
            type: DataTypes.TEXT,
            allowNull: true
          },
          triggerType: {
            type: DataTypes.STRING,
            allowNull: false
          },
          isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
          },
          metadata: {
            type: DataTypes.JSONB,
            allowNull: true
          }
        },
        {
          sequelize,
          tableName: 'TaskWorkflows'
        }
      );
    }
  }
  