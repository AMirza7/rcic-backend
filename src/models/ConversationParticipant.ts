// src/models/ConversationParticipant.ts
import {
    Model,
    DataTypes,
    Optional,
    Sequelize
  } from 'sequelize';
  import { sequelize } from '../config/databse';
  
  export interface ConversationParticipantAttributes {
    id: string;
    conversationId: string;
    userId: string;
    role: 'client' | 'consultant' | 'employee' | 'AI';
    lastReadAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export interface ConversationParticipantCreationAttributes
    extends Optional<ConversationParticipantAttributes, 'id'> {}
  
  export class ConversationParticipant
    extends Model<
      ConversationParticipantAttributes,
      ConversationParticipantCreationAttributes
    >
    implements ConversationParticipantAttributes
  {
    public id!: string;
    public conversationId!: string;
    public userId!: string;
    public role!: 'client' | 'consultant' | 'employee' | 'AI';
    public lastReadAt?: Date;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  
    static initModel(sequelizeInstance: Sequelize): typeof ConversationParticipant {
      ConversationParticipant.init(
        {
          id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
          },
          conversationId: {
            type: DataTypes.UUID,
            allowNull: false
          },
          userId: {
            type: DataTypes.UUID,
            allowNull: false
          },
          role: {
            type: DataTypes.ENUM('client','consultant','employee','AI'),
            allowNull: false
          },
          lastReadAt: {
            type: DataTypes.DATE,
            allowNull: true
          },
        },
        {
          sequelize: sequelizeInstance,
          tableName: 'ConversationParticipants',
          timestamps: true
        }
      );
      return ConversationParticipant;
    }
  
    static associate(models: any) {
      ConversationParticipant.belongsTo(models.Conversation, {
        foreignKey: 'conversationId'
      });
      ConversationParticipant.belongsTo(models.User, {
        foreignKey: 'userId'
      });
    }
  }
  