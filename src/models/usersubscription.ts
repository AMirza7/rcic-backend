import {
  Model,
  DataTypes,
  Sequelize,
  Optional
} from 'sequelize';

// 1. Define the attribute interface
export interface UserSubscriptionAttributes {
  id: string;
  userId: string;
  plan: string;
  status: string;
  billingPeriod: string;
  amount: number;
  currency: string;
  nextBilling: Date;
  cancelledAt: Date | null;
  periodEnd: Date | null;
  features: any;
  stripeSubscriptionId: string;
  stripeCustomerId: string;
  // timestamps
  createdAt?: Date;
  updatedAt?: Date;
}

// 2. Define the creation attributes (optional id & nullable fields)
export interface UserSubscriptionCreationAttributes
  extends Optional<UserSubscriptionAttributes, 'id' | 'cancelledAt' | 'periodEnd'> {}

// 3. Create the class
export class UserSubscription
  extends Model<UserSubscriptionAttributes, UserSubscriptionCreationAttributes>
  implements UserSubscriptionAttributes
{
  public id!: string;
  public userId!: string;
  public plan!: string;
  public status!: string;
  public billingPeriod!: string;
  public amount!: number;
  public currency!: string;
  public nextBilling!: Date;
  public cancelledAt!: Date | null;
  public periodEnd!: Date | null;
  public features!: any;
  public stripeSubscriptionId!: string;
  public stripeCustomerId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // 4. Define associations here
  public static associate(models: any): void {
    // e.g. this.belongsTo(models.User, { foreignKey: 'userId' });
  }

  // 5. Initialize the model
  public static initialize(sequelize: Sequelize) {
    UserSubscription.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        userId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        plan: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        status: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        billingPeriod: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        amount: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        currency: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        nextBilling: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        cancelledAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        periodEnd: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        features: {
          type: DataTypes.JSON,
          allowNull: false,
        },
        stripeSubscriptionId: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        stripeCustomerId: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'UserSubscriptions',
        modelName: 'UserSubscription',
        timestamps: true,
      }
    );
  }
}
