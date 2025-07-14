// src/models/document.ts
import {
  Model,
  DataTypes,
  Sequelize,
  Optional
} from 'sequelize';

// 1. Define attribute interface
export interface DocumentAttributes {
  id: string;
  name: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  mimeType: string;
  uploadDate: Date;
  uploadedBy: string;
  category: string;
  tags: any;
  clientId: string | null;
  consultantId: string;
  isPublic: boolean;
  expiryDate: Date | null;
  status: string;
  version: number;
  permissions: any;
  metadata: any;
  createdAt?: Date;
  updatedAt?: Date;
}

// 2. Define creation attributes
export interface DocumentCreationAttributes
  extends Optional<DocumentAttributes, 'id' | 'clientId' | 'expiryDate' | 'version'> {}

// 3. Model class
export class Document
  extends Model<DocumentAttributes, DocumentCreationAttributes>
  implements DocumentAttributes 
{
  public id!: string;
  public name!: string;
  public fileName!: string;
  public fileUrl!: string;
  public fileSize!: number;
  public mimeType!: string;
  public uploadDate!: Date;
  public uploadedBy!: string;
  public category!: string;
  public tags!: any;
  public clientId!: string | null;
  public consultantId!: string;
  public isPublic!: boolean;
  public expiryDate!: Date | null;
  public status!: string;
  public version!: number;
  public permissions!: any;
  public metadata!: any;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // 4. Associations
  public static associate(models: any): void {
    // e.g. this.belongsTo(models.User, { foreignKey: 'uploadedBy' });
    // this.belongsTo(models.Client, { foreignKey: 'clientId' });
    // this.belongsTo(models.Consultant, { foreignKey: 'consultantId' });
  }

  // 5. Initialization
  public static initialize(sequelize: Sequelize): void {
    Document.init(
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
        fileName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        fileUrl: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        fileSize: {
          type: DataTypes.BIGINT,
          allowNull: false,
        },
        mimeType: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        uploadDate: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        uploadedBy: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        category: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        tags: {
          type: DataTypes.JSON,
          allowNull: false,
        },
        clientId: {
          type: DataTypes.UUID,
          allowNull: true,
        },
        consultantId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        isPublic: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        expiryDate: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        status: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        version: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 1,
        },
        permissions: {
          type: DataTypes.JSON,
          allowNull: false,
        },
        metadata: {
          type: DataTypes.JSON,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'Documents',
        modelName: 'Document',
        timestamps: true,
      }
    );
  }
}
