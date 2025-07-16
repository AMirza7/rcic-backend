import { Model, DataTypes, Sequelize, Optional } from 'sequelize';

export interface DocumentPermissionAttributes {
  id: string;
  documentId: string;
  userId: string;
  canView: boolean;
  canEdit: boolean;
  canDelete: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface DocumentPermissionCreationAttributes
  extends Optional<DocumentPermissionAttributes, 'id' | 'canView' | 'canEdit' | 'canDelete'> {}

export class DocumentPermission
  extends Model<DocumentPermissionAttributes, DocumentPermissionCreationAttributes>
  implements DocumentPermissionAttributes
{
  public id!: string;
  public documentId!: string;
  public userId!: string;
  public canView!: boolean;
  public canEdit!: boolean;
  public canDelete!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initialize(sequelize: Sequelize) {
    DocumentPermission.init({
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      documentId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      canView: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      canEdit: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      canDelete: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    }, {
      sequelize,
      tableName: 'DocumentPermissions'
    });
  }

  static associate(models: any) {
    DocumentPermission.belongsTo(models.Document, {
      foreignKey: 'documentId',
      as: 'document'
    });
    DocumentPermission.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
  }
}
