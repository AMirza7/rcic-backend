// src/models/ReferralData.ts
import {
    Model,
    DataTypes,
    Optional,
    Sequelize
  } from 'sequelize';
  
  export interface ReferralDataAttributes {
    id: string;
    referrerId: string;
    referrerType: 'client' | 'consultant';
    referralCode: string;
    email: string;
    name?: string;
    phone?: string;
    invitedAt: Date;
    status: 'pending' | 'signed_up' | 'reward_claimed';
    planSubscribed?: string;
    rewardAmount?: number;
    rewardStatus?: 'pending' | 'paid' | 'cancelled';
    metadata?: Record<string, any>;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export interface ReferralDataCreationAttributes
    extends Optional<
      ReferralDataAttributes,
      | 'id'
      | 'name'
      | 'phone'
      | 'planSubscribed'
      | 'rewardAmount'
      | 'rewardStatus'
      | 'metadata'
      | 'createdAt'
      | 'updatedAt'
    > {}
  
  export class ReferralData
    extends Model<ReferralDataAttributes, ReferralDataCreationAttributes>
    implements ReferralDataAttributes {
    public id!: string;
    public referrerId!: string;
    public referrerType!: 'client' | 'consultant';
    public referralCode!: string;
    public email!: string;
    public name?: string;
    public phone?: string;
    public invitedAt!: Date;
    public status!: 'pending' | 'signed_up' | 'reward_claimed';
    public planSubscribed?: string;
    public rewardAmount?: number;
    public rewardStatus?: 'pending' | 'paid' | 'cancelled';
    public metadata?: Record<string, any>;
  
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  
    /** Called by src/models/index.ts */
    public static initialize(sequelize: Sequelize) {
      ReferralData.init(
        {
          id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
          },
          referrerId: {
            type: DataTypes.UUID,
            allowNull: false
          },
          referrerType: {
            type: DataTypes.ENUM('client', 'consultant'),
            allowNull: false
          },
          referralCode: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
          },
          email: {
            type: DataTypes.STRING,
            allowNull: false
          },
          name: {
            type: DataTypes.STRING,
            allowNull: true
          },
          phone: {
            type: DataTypes.STRING,
            allowNull: true
          },
          invitedAt: {
            type: DataTypes.DATE,
            allowNull: false
          },
          status: {
            type: DataTypes.ENUM('pending', 'signed_up', 'reward_claimed'),
            allowNull: false,
            defaultValue: 'pending'
          },
          planSubscribed: {
            type: DataTypes.STRING,
            allowNull: true
          },
          rewardAmount: {
            type: DataTypes.DECIMAL,
            allowNull: true
          },
          rewardStatus: {
            type: DataTypes.ENUM('pending', 'paid', 'cancelled'),
            allowNull: true
          },
          metadata: {
            type: DataTypes.JSONB,
            allowNull: true
          }
        },
        {
          sequelize,
          tableName: 'ReferralData'
        }
      );
    }
  }
  