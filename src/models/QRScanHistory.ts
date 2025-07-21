// src/models/QRScanHistory.ts
import {
    Model,
    DataTypes,
    Optional,
    Sequelize
  } from 'sequelize';
  
  export interface QRScanHistoryAttributes {
    id: string;
    qrConnectorId: string;
    scannerId?: string;
    scannedAt: Date;
    result?: string;
    metadata?: object;
    createdAt?: Date;
    updatedAt?: Date;
  }
  export interface QRScanHistoryCreationAttributes
    extends Optional<QRScanHistoryAttributes, 'id' | 'scannerId' | 'result' | 'metadata'> {}
  
  export class QRScanHistory
    extends Model<QRScanHistoryAttributes, QRScanHistoryCreationAttributes>
    implements QRScanHistoryAttributes {
    public id!: string;
    public qrConnectorId!: string;
    public scannerId?: string;
    public scannedAt!: Date;
    public result?: string;
    public metadata?: object;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  
    static initModel(sequelize: Sequelize): typeof QRScanHistory {
      QRScanHistory.init(
        {
          id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
          },
          qrConnectorId: {
            type: DataTypes.UUID,
            allowNull: false,
          },
          scannerId: {
            type: DataTypes.UUID,
            allowNull: true,
          },
          scannedAt: {
            type: DataTypes.DATE,
            allowNull: false,
          },
          result: {
            type: DataTypes.STRING(50),
            allowNull: true,
          },
          metadata: {
            type: DataTypes.JSONB,
            allowNull: true,
          },
        },
        {
          sequelize,
          tableName: 'QRScanHistory',
          timestamps: true,
        }
      );
      return QRScanHistory;
    }
  }
  