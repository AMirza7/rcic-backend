// src/models/subscriptionplan.ts
import {
  Model,
  DataTypes,
  Sequelize,
  Optional
} from 'sequelize';

// 1. Attribute interface
export interface SubscriptionPlanAttributes {
  id: string;
  name: 'starter' | 'pro' | 'elite' | 'enterprise';
  displayName: string;
  description: string;
  price: number;
  yearlyPrice: number | null;
  currency: string;
  billingInterval: 'monthly' | 'yearly';
  features: any;
  isPopular: boolean;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// 2. Creation attributes (yearlyPrice optional)
export interface SubscriptionPlanCreationAttributes
  extends Optional<SubscriptionPlanAttributes, 'yearlyPrice'> {}

// 3. Model class
export class SubscriptionPlan
  extends Model<SubscriptionPlanAttributes, SubscriptionPlanCreationAttributes>
  implements SubscriptionPlanAttributes
{
  public id!: string;
  public name!: 'starter' | 'pro' | 'elite' | 'enterprise';
  public displayName!: string;
  public description!: string;
  public price!: number;
  public yearlyPrice!: number | null;
  public currency!: string;
  public billingInterval!: 'monthly' | 'yearly';
  public features!: any;
  public isPopular!: boolean;
  public isActive!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // 4. Associations
  public static associate(models: any): void {
    // e.g. this.hasMany(models.UserSubscription, { foreignKey: 'plan' });
  }

  // 5. Initialization
  public static initialize(sequelize: Sequelize): void {
    SubscriptionPlan.init(
      {
        id: {
          type: DataTypes.STRING,
          primaryKey: true,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        displayName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        price: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        yearlyPrice: {
          type: DataTypes.FLOAT,
          allowNull: true,
        },
        currency: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        billingInterval: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        features: {
          type: DataTypes.JSON,
          allowNull: false,
        },
        isPopular: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        isActive: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
      },
      {
        sequelize,
        tableName: 'SubscriptionPlans',
        modelName: 'SubscriptionPlan',
        timestamps: true,
      }
    );
  }
}
