// src/models/documentfolder.ts
import {
  Model,
  DataTypes,
  Sequelize,
  Optional
} from 'sequelize';

// 1. Attribute interface
export interface DocumentFolderAttributes {
  id: string;
  name: string;
  parentId: string | null;
  consultantId: string;
  clientId: string | null;
  permissions: any;
  documentCount: number;
  folderCount: number;
  totalSize: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// 2. Creation attributes (id, parentId, clientId optional)
export interface DocumentFolderCreationAttributes
  extends Optional<DocumentFolderAttributes, 'id' | 'parentId' | 'clientId'> {}

// 3. Model class
export class DocumentFolder
  extends Model<DocumentFolderAttributes, DocumentFolderCreationAttributes>
  implements DocumentFolderAttributes
{
  public id!: string;
  public name!: string;
  public parentId!: string | null;
  public consultantId!: string;
  public clientId!: string | null;
  public permissions!: any;
  public documentCount!: number;
  public folderCount!: number;
  public totalSize!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // 4. Associations
  public static associate(models: any): void {
    // e.g. this.hasMany(models.Document, { foreignKey: 'folderId' });
  }

  // 5. Initialization
  public static initialize(sequelize: Sequelize): void {
    DocumentFolder.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        parentId: {
          type: DataTypes.UUID,
          allowNull: true,
        },
        consultantId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        clientId: {
          type: DataTypes.UUID,
          allowNull: true,
        },
        permissions: {
          type: DataTypes.JSON,
          allowNull: false,
        },
        documentCount: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        folderCount: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        totalSize: {
          type: DataTypes.BIGINT,
          allowNull: false,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        tableName: 'DocumentFolders',
        modelName: 'DocumentFolder',
        timestamps: true,
      }
    );
  }
}
