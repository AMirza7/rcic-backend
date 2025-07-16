import { Model, DataTypes, Sequelize, Optional } from 'sequelize';

export interface AuditLogAttributes {
  id: string;
  action: string;
  entity: string;
  entityId: string;
  changes?: object;
  userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AuditLogCreationAttributes
  extends Optional<AuditLogAttributes, 'id' | 'changes' | 'userId'> {}

export class AuditLog
  extends Model<AuditLogAttributes, AuditLogCreationAttributes>
  implements AuditLogAttributes
{
  public id!: string;
  public action!: string;
  public entity!: string;
  public entityId!: string;
  public changes?: object;
  public userId?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initialize(sequelize: Sequelize) {
    AuditLog.init({
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      action: {
        type: DataTypes.STRING,
        allowNull: false
      },
      entity: {
        type: DataTypes.STRING,
        allowNull: false
      },
      entityId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      changes: {
        type: DataTypes.JSONB,
        allowNull: true
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: true
      }
    }, {
      sequelize,
      tableName: 'AuditLogs'
    });
  }

  static associate(models: any) {
    AuditLog.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
  }
}
