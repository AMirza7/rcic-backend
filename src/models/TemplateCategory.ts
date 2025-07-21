// src/models/TemplateCategory.ts
import {
    Model,
    DataTypes,
    Optional,
    Sequelize
  } from 'sequelize';
  
  export interface TemplateCategoryAttributes {
    id: string;
    name: string;
    slug: string;
    parentCategoryId?: string;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }
  export interface TemplateCategoryCreationAttributes
    extends Optional<TemplateCategoryAttributes, 'id' | 'parentCategoryId'> {}
  
  export class TemplateCategory
    extends Model<
      TemplateCategoryAttributes,
      TemplateCategoryCreationAttributes
    >
    implements TemplateCategoryAttributes {
    public id!: string;
    public name!: string;
    public slug!: string;
    public parentCategoryId?: string;
    public isActive!: boolean;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  
    static initModel(sequelize: Sequelize): typeof TemplateCategory {
      TemplateCategory.init(
        {
          id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
          },
          name: {
            type: DataTypes.STRING(100),
            allowNull: false,
          },
          slug: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
          },
          parentCategoryId: {
            type: DataTypes.UUID,
            allowNull: true,
          },
          isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
          },
        },
        {
          sequelize,
          tableName: 'TemplateCategories',
          timestamps: true,
        }
      );
      return TemplateCategory;
    }
  }
  