// src/models/WorkflowStep.ts
import {
    Model,
    DataTypes,
    Optional,
    Sequelize
  } from 'sequelize';
  
  export interface WorkflowStepAttributes {
    id: string;
    workflowId: string;
    stepOrder: number;
    name: string;
    actionType: string;
    config?: Record<string, any>;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export interface WorkflowStepCreationAttributes
    extends Optional<
      WorkflowStepAttributes,
      'id' | 'config' | 'createdAt' | 'updatedAt'
    > {}
  
  export class WorkflowStep
    extends Model<WorkflowStepAttributes, WorkflowStepCreationAttributes>
    implements WorkflowStepAttributes {
    public id!: string;
    public workflowId!: string;
    public stepOrder!: number;
    public name!: string;
    public actionType!: string;
    public config?: Record<string, any>;
  
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  
    /** Called from src/models/index.ts */
    public static initialize(sequelize: Sequelize) {
      WorkflowStep.init(
        {
          id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
          },
          workflowId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: { model: 'TaskWorkflows', key: 'id' },
            onDelete: 'CASCADE'
          },
          stepOrder: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
          name: {
            type: DataTypes.STRING,
            allowNull: false
          },
          actionType: {
            type: DataTypes.STRING,
            allowNull: false
          },
          config: {
            type: DataTypes.JSONB,
            allowNull: true
          }
        },
        {
          sequelize,
          tableName: 'WorkflowSteps'
        }
      );
    }
  
    /** Associations */
    public static associate(models: any) {
      WorkflowStep.belongsTo(models.TaskWorkflow, {
        foreignKey: 'workflowId',
        as: 'workflow'
      });
    }
  }
  