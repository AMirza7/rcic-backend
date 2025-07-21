// src/models/Message.ts
import {
  Model,
  DataTypes,
  Optional,
  Sequelize
} from 'sequelize';

export interface MessageAttributes {
  id: string;
  senderId: string;
  recipientId: string;
  content: string;
  timestamp: Date;
  conversationId: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface MessageCreationAttributes
  extends Optional<MessageAttributes, 'id'> {}

export class Message
  extends Model<MessageAttributes, MessageCreationAttributes>
  implements MessageAttributes {
  public id!: string;
  public senderId!: string;
  public recipientId!: string;
  public content!: string;
  public timestamp!: Date;
  public conversationId!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initModel(sequelize: Sequelize): typeof Message {
    Message.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
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
        conversationId: {
          type: DataTypes.UUID,
          allowNull: false
        },
      },
      {
        sequelize,
        tableName: 'Messages',
        timestamps: true,
      }
    );
    return Message;
  }
}
