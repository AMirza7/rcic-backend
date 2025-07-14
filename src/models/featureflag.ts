// src/models/featureflag.ts
import {
  Model,
  DataTypes,
  Sequelize,
  Optional
} from 'sequelize';

// 1. Attribute interface
export interface FeatureFlagAttributes {
  key: string;
  name: string;
  description: string;
  enabled: boolean;
  rolloutPercentage: number;
  userGroups: any;
  excludedUsers: any;
  conditions: any;
  createdBy: string;
  expiresAt: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

// 2. Creation attributes (expiresAt optional)
export interface FeatureFlagCreationAttributes
  extends Optional<FeatureFlagAttributes, 'expiresAt'> {}

// 3. Model class
export class FeatureFlag
  extends Model<FeatureFlagAttributes, FeatureFlagCreationAttributes>
  implements FeatureFlagAttributes
{
  public key!: string;
  public name!: string;
  public description!: string;
  public enabled!: boolean;
  public rolloutPercentage!: number;
  public userGroups!: any;
  public excludedUsers!: any;
  public conditions!: any;
  public createdBy!: string;
  public expiresAt!: Date | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // 4. Associations
  public static associate(models: any): void {
    // define associations here if needed
  }

  // 5. Initialization
  public static initialize(sequelize: Sequelize): void {
    FeatureFlag.init(
      {
        key: {
          type: DataTypes.STRING,
          primaryKey: true,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        enabled: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        rolloutPercentage: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        userGroups: {
          type: DataTypes.JSON,
          allowNull: false,
          defaultValue: [],
        },
        excludedUsers: {
          type: DataTypes.JSON,
          allowNull: false,
          defaultValue: [],
        },
        conditions: {
          type: DataTypes.JSON,
          allowNull: false,
          defaultValue: {},
        },
        createdBy: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        expiresAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'FeatureFlags',
        modelName: 'FeatureFlag',
        timestamps: true,
      }
    );
  }
}
