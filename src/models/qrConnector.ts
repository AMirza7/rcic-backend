import {
    Model,
    DataTypes,
    Sequelize,
    Optional
  } from 'sequelize';
  
  export interface QRConnectorAttributes {
    id: string;
    consultantId: string;
    code: string;
    expiresAt: Date;
    used: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export interface QRConnectorCreationAttributes
    extends Optional<QRConnectorAttributes, 'id' | 'used'> {}
  
  export class QRConnector
    extends Model<QRConnectorAttributes, QRConnectorCreationAttributes>
    implements QRConnectorAttributes
  {
    public id!: string;
    public consultantId!: string;
    public code!: string;
    public expiresAt!: Date;
    public used!: boolean;
  
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  
    static initialize(sequelize: Sequelize) {
      QRConnector.init(
        {
          id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
          },
          consultantId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: { model: 'Consultants', key: 'id' },
            onDelete: 'CASCADE',
          },
          code: {
            type: DataTypes.STRING(6),
            allowNull: false,
          },
          expiresAt: {
            type: DataTypes.DATE,
            allowNull: false,
          },
          used: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
          },
        },
        {
          sequelize,
          tableName: 'QRConnectors',
          timestamps: true,
        }
      );
    }
  
    static associate(models: any) {
      QRConnector.belongsTo(models.Consultant, {
        foreignKey: 'consultantId',
        as: 'consultant',
      });
    }
  }
  