import {
    Model,
    DataTypes,
    Sequelize,
    Optional
  } from 'sequelize';
  
  export interface StorageUsageAttributes {
    id: string;
    userId: string;
    totalUsed: number;
    totalLimit: number;
    usagePercentage: string;
    breakdown: {
      documents: number;
      images: number;
      templates: number;
      backups: number;
      other: number;
    };
    lastUpdated: Date;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export interface StorageUsageCreationAttributes
    extends Optional<StorageUsageAttributes, 'id' | 'usagePercentage' | 'breakdown' | 'lastUpdated'> {}
  
  export class StorageUsage
    extends Model<StorageUsageAttributes, StorageUsageCreationAttributes>
    implements StorageUsageAttributes
  {
    public id!: string;
    public userId!: string;
    public totalUsed!: number;
    public totalLimit!: number;
    public usagePercentage!: string;
    public breakdown!: {
      documents: number;
      images: number;
      templates: number;
      backups: number;
      other: number;
    };
    public lastUpdated!: Date;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  
    static initialize(sequelize: Sequelize) {
      StorageUsage.init({
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true
        },
        userId: {
          type: DataTypes.UUID,
          allowNull: false
        },
        totalUsed: {
          type: DataTypes.BIGINT,
          allowNull: false,
          defaultValue: 0
        },
        totalLimit: {
          type: DataTypes.BIGINT,
          allowNull: false,
          defaultValue: 0
        },
        usagePercentage: {
          type: DataTypes.DECIMAL(5,2),
          allowNull: false,
          defaultValue: '0.00'
        },
        breakdown: {
          type: DataTypes.JSONB,
          allowNull: false,
          defaultValue: {
            documents: 0,
            images: 0,
            templates: 0,
            backups: 0,
            other: 0
          }
        },
        lastUpdated: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW
        }
      }, {
        sequelize,
        tableName: 'StorageUsages'
      });
    }
  
    static associate(models: any) {
      StorageUsage.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
    }
  }
  