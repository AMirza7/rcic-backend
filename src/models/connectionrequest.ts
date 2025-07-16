import {
    Model,
    DataTypes,
    Sequelize,
    Optional
  } from 'sequelize';
  
  export interface ConnectionRequestAttributes {
    id: string;
    clientId: string;
    consultantId: string;
    status: 'pending' | 'accepted' | 'rejected';
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export interface ConnectionRequestCreationAttributes
    extends Optional<ConnectionRequestAttributes, 'id' | 'status'> {}
  
  export class ConnectionRequest
    extends Model<ConnectionRequestAttributes, ConnectionRequestCreationAttributes>
    implements ConnectionRequestAttributes
  {
    public id!: string;
    public clientId!: string;
    public consultantId!: string;
    public status!: 'pending' | 'accepted' | 'rejected';
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  
    static initialize(sequelize: Sequelize) {
      ConnectionRequest.init({
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true
        },
        clientId: {
          type: DataTypes.UUID,
          allowNull: false
        },
        consultantId: {
          type: DataTypes.UUID,
          allowNull: false
        },
        status: {
          type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
          allowNull: false,
          defaultValue: 'pending'
        }
      }, {
        sequelize,
        tableName: 'ConnectionRequests'
      });
    }
  
    static associate(models: any) {
      ConnectionRequest.belongsTo(models.Client, {
        foreignKey: 'clientId',
        as: 'client'
      });
      ConnectionRequest.belongsTo(models.Consultant, {
        foreignKey: 'consultantId',
        as: 'consultant'
      });
    }
  }
  