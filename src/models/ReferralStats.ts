// src/models/ReferralStats.ts
import {
  Model,
  DataTypes,
  Sequelize,
  Optional
} from 'sequelize';
import { User } from './user';

export interface ReferralStatsAttributes {
  userId: string;
  totalReferrals: number;
  activeReferrals: number;
  totalEarned: number;
  pendingEarnings: number;
  thisMonth?: number;
  lastMonth?: number;
  conversionRate: number;
  averageRewardAmount: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ReferralStatsCreationAttributes
  extends Optional<
    ReferralStatsAttributes,
    | 'totalReferrals'
    | 'activeReferrals'
    | 'totalEarned'
    | 'pendingEarnings'
    | 'thisMonth'
    | 'lastMonth'
    | 'conversionRate'
    | 'averageRewardAmount'
    | 'createdAt'
    | 'updatedAt'
  > {}

export class ReferralStats
  extends Model<ReferralStatsAttributes, ReferralStatsCreationAttributes>
  implements ReferralStatsAttributes {
  public userId!: string;
  public totalReferrals!: number;
  public activeReferrals!: number;
  public totalEarned!: number;
  public pendingEarnings!: number;
  public thisMonth?: number;
  public lastMonth?: number;
  public conversionRate!: number;
  public averageRewardAmount!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  /** Initialize model (called from src/models/index.ts) */
  static initialize(sequelize: Sequelize) {
    ReferralStats.init(
      {
        userId: {
          type: DataTypes.UUID,
          primaryKey: true,
          references: { model: 'Users', key: 'id' },
          onDelete: 'CASCADE'
        },
        totalReferrals: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0
        },
        activeReferrals: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0
        },
        totalEarned: {
          type: DataTypes.DECIMAL,
          allowNull: false,
          defaultValue: 0
        },
        pendingEarnings: {
          type: DataTypes.DECIMAL,
          allowNull: false,
          defaultValue: 0
        },
        thisMonth: {
          type: DataTypes.INTEGER,
          allowNull: true
        },
        lastMonth: {
          type: DataTypes.INTEGER,
          allowNull: true
        },
        conversionRate: {
          type: DataTypes.DECIMAL,
          allowNull: false,
          defaultValue: 0
        },
        averageRewardAmount: {
          type: DataTypes.DECIMAL,
          allowNull: false,
          defaultValue: 0
        }
      },
      {
        sequelize,
        tableName: 'ReferralStats',
        timestamps: true
      }
    );
  }

  /** Define associations */
  static associate(models: any) {
    ReferralStats.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
  }
}
