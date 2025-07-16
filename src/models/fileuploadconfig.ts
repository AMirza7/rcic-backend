import { Model, DataTypes, Sequelize, Optional } from 'sequelize';

export interface FileUploadConfigAttributes {
  id: string;
  maxFileSize: number;
  allowedTypes: string[];
  uploadUrl: string;
  compressionEnabled: boolean;
  virusScanning: boolean;
  retentionPeriod: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface FileUploadConfigCreationAttributes
  extends Optional<FileUploadConfigAttributes, 'id'> {}

export class FileUploadConfig
  extends Model<FileUploadConfigAttributes, FileUploadConfigCreationAttributes>
  implements FileUploadConfigAttributes
{
  public id!: string;
  public maxFileSize!: number;
  public allowedTypes!: string[];
  public uploadUrl!: string;
  public compressionEnabled!: boolean;
  public virusScanning!: boolean;
  public retentionPeriod!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initialize(sequelize: Sequelize) {
    FileUploadConfig.init({
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      maxFileSize: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      allowedTypes: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: []
      },
      uploadUrl: {
        type: DataTypes.STRING,
        allowNull: false
      },
      compressionEnabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      virusScanning: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      retentionPeriod: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    }, {
      sequelize,
      tableName: 'FileUploadConfigs'
    });
  }

  static associate(models: any) {
    // no associations needed
  }
}
