// src/models/Conversation.ts
import {
    Model,
    DataTypes,
    Optional,
    Sequelize
  } from 'sequelize';
  import { sequelize } from '../config/databse';  // your existing import
  
  export interface ConversationAttributes {
    id: string;
    title?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export interface ConversationCreationAttributes
    extends Optional<ConversationAttributes, 'id' | 'title'> {}
  
  export class Conversation
    extends Model<ConversationAttributes, ConversationCreationAttributes>
    implements ConversationAttributes
  {
    public id!: string;
    public title?: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  
    // initialize table
    static initModel(sequelizeInstance: Sequelize): typeof Conversation {
      Conversation.init(
        {
          id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
          },
          title: {
            type: DataTypes.STRING,
            allowNull: true
          }
        },
        {
          sequelize: sequelizeInstance,
          tableName: 'Conversations',
          timestamps: true
        }
      );
      return Conversation;
    }
  
    // associations
    static associate(models: any) {
      Conversation.hasMany(models.Message, {
        foreignKey: 'conversationId',
        as: 'messages'
      });
      Conversation.belongsToMany(models.User, {
        through: models.ConversationParticipant,
        foreignKey: 'conversationId',
        otherKey: 'userId',
        as: 'participants'
      });
    }
  }
  