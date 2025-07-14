// src/models/notification.ts
import {
  Model,
  DataTypes,
  Sequelize,
  Optional
} from 'sequelize';

// 1. Attribute interface
export interface NotificationAttributes {
  id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  link: string | null;
  priority: string;
  category: string | null;
  expiresAt: Date | null;
  actionRequired: boolean;
  metadata: any;
  createdAt?: Date;
  updatedAt?: Date;
}

// 2. Creation attributes (id, link, category, expiresAt optional)
export interface NotificationCreationAttributes
  extends Optional<
    NotificationAttributes,
    'id' | 'link' | 'category' | 'expiresAt'
  > {}

// 3. Model class
export class Notification
  extends Model<NotificationAttributes, NotificationCreationAttributes>
  implements NotificationAttributes
{
  public id!: string;
  public userId!: string;
  public type!: string;
  public title!: string;
  public message!: string;
  public timestamp!: Date;
  public isRead!: boolean;
  public link!: string | null;
  public priority!: string;
  public category!: string | null;
  public expiresAt!: Date | null;
  public actionRequired!: boolean;
  public metadata!: any;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // 4. Associations
  public static associate(models: any): void {
    // e.g. this.belongsTo(models.User, { foreignKey: 'userId' });
  }

  // 5. Initialization
  public static initialize(sequelize: Sequelize): void {
    Notification.init(
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
        type: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        message: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        timestamp: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        isRead: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        link: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        priority: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        category: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        expiresAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        actionRequired: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        metadata: {
          type: DataTypes.JSON,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'Notifications',
        modelName: 'Notification',
        timestamps: true,
      }
    );
  }
}
