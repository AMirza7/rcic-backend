import {
    Model,
    DataTypes,
    Sequelize,
    Optional
  } from 'sequelize';
  
  export interface EnhancedChatMessageAttributes {
    id: string;
    sessionId: string;
    userId: string;
    role: 'user' | 'assistant';
    content: string;
    sources: Array<{ title: string; url: string }>;
    attachments: Array<{ id: string; url: string; type: string }>;
    actions: Array<{ type: string; payload: any }>;
    sentiment: 'positive' | 'neutral' | 'negative';
    metadata: Record<string, any>;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export interface EnhancedChatMessageCreationAttributes
    extends Optional<EnhancedChatMessageAttributes, 'id' | 'createdAt' | 'updatedAt'> {}
  
  export class EnhancedChatMessage
    extends Model<EnhancedChatMessageAttributes, EnhancedChatMessageCreationAttributes>
    implements EnhancedChatMessageAttributes {
    public id!: string;
    public sessionId!: string;
    public userId!: string;
    public role!: 'user' | 'assistant';
    public content!: string;
    public sources!: EnhancedChatMessageAttributes['sources'];
    public attachments!: EnhancedChatMessageAttributes['attachments'];
    public actions!: EnhancedChatMessageAttributes['actions'];
    public sentiment!: EnhancedChatMessageAttributes['sentiment'];
    public metadata!: EnhancedChatMessageAttributes['metadata'];
  
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  
    static initialize(sequelize: Sequelize) {
      EnhancedChatMessage.init(
        {
          id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
          },
          sessionId: {
            type: DataTypes.UUID,
            allowNull: false
          },
          userId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: { model: 'Users', key: 'id' },
            onDelete: 'CASCADE'
          },
          role: {
            type: DataTypes.ENUM('user', 'assistant'),
            allowNull: false
          },
          content: {
            type: DataTypes.TEXT,
            allowNull: false
          },
          sources: {
            type: DataTypes.JSONB,
            allowNull: false
          },
          attachments: {
            type: DataTypes.JSONB,
            allowNull: false
          },
          actions: {
            type: DataTypes.JSONB,
            allowNull: false
          },
          sentiment: {
            type: DataTypes.ENUM('positive', 'neutral', 'negative'),
            allowNull: false
          },
          metadata: {
            type: DataTypes.JSONB,
            allowNull: false
          }
        },
        {
          sequelize,
          tableName: 'EnhancedChatMessages',
          timestamps: true
        }
      );
    }
  
    static associate(models: any) {
      EnhancedChatMessage.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
  }
  