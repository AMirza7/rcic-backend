// src/models/message.ts
import {
    Model,
    DataTypes,
    Sequelize,
    Optional,
  } from 'sequelize';
  
  // 1. Attributes interface
  export interface MessageAttributes {
    id: string;
    senderId: string;
    recipientId: string;
    content: string;
    timestamp: Date;
    readonly createdAt: Date;
    readonly updatedAt: Date;
  }
  
  // 2. Creation attributes: only `id` is optional on create
  export interface MessageCreationAttributes
    extends Optional<MessageAttributes, 'id'> {}
  
  // 3. Model class
  export class Message
    extends Model<MessageAttributes, MessageCreationAttributes>
    implements MessageAttributes {
    public id!: string;
    public senderId!: string;
    public recipientId!: string;
    public content!: string;
    public timestamp!: Date;
  
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  
    // 4. Initialization
    public static initialize(sequelize: Sequelize) {
      const attributes = {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        senderId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        recipientId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        timestamp: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      };
  
      const options = {
        sequelize,
        tableName: 'Messages',
        modelName: 'Message',
        timestamps: true,
      };
  
      // ← cast attributes to any to satisfy Model.init overload
      Message.init(attributes as any, options);
    }
  
    // 5. Associations (if needed)
    public static associate(models: any) {
      // e.g. this.belongsTo(models.User, { as: 'sender', foreignKey: 'senderId' });
    }
  }
  