import {
    Model,
    DataTypes,
    Sequelize,
    Optional
  } from 'sequelize';
  
  export interface DocumentAnalysisResultAttributes {
    id: string;
    documentId: string;
    userId: string;
    analysis: Record<string, any>;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export interface DocumentAnalysisResultCreationAttributes
    extends Optional<DocumentAnalysisResultAttributes, 'id' | 'createdAt' | 'updatedAt'> {}
  
  export class DocumentAnalysisResult
    extends Model<DocumentAnalysisResultAttributes, DocumentAnalysisResultCreationAttributes>
    implements DocumentAnalysisResultAttributes {
    public id!: string;
    public documentId!: string;
    public userId!: string;
    public analysis!: DocumentAnalysisResultAttributes['analysis'];
  
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  
    static initialize(sequelize: Sequelize) {
      DocumentAnalysisResult.init(
        {
          id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
          },
          documentId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: { model: 'Documents', key: 'id' },
            onDelete: 'CASCADE'
          },
          userId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: { model: 'Users', key: 'id' },
            onDelete: 'CASCADE'
          },
          analysis: {
            type: DataTypes.JSONB,
            allowNull: false
          }
        },
        {
          sequelize,
          tableName: 'DocumentAnalysisResults',
          timestamps: true
        }
      );
    }
  
    static associate(models: any) {
      DocumentAnalysisResult.belongsTo(models.Document, { foreignKey: 'documentId', as: 'document' });
      DocumentAnalysisResult.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
  }
  