// src/models/PlanFeature.ts
import {
    Model,
    DataTypes,
    Optional,
    Sequelize
  } from 'sequelize';
  
  export interface PlanFeatureAttributes {
    id: string;
    planId: string;
    featureName: string;
    description?: string;
    isEnabled: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }
  export interface PlanFeatureCreationAttributes
    extends Optional<PlanFeatureAttributes, 'id' | 'description'> {}
  
  export class PlanFeature
    extends Model<PlanFeatureAttributes, PlanFeatureCreationAttributes>
    implements PlanFeatureAttributes {
    public id!: string;
    public planId!: string;
    public featureName!: string;
    public description?: string;
    public isEnabled!: boolean;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  
    static initModel(sequelize: Sequelize): typeof PlanFeature {
      PlanFeature.init(
        {
          id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
          },
          planId: {
            type: DataTypes.UUID,
            allowNull: false,
          },
          featureName: {
            type: DataTypes.STRING(100),
            allowNull: false,
          },
          description: {
            type: DataTypes.TEXT,
            allowNull: true,
          },
          isEnabled: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
          },
        },
        {
          sequelize,
          tableName: 'PlanFeatures',
          timestamps: true,
        }
      );
      return PlanFeature;
    }
  }
  