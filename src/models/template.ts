// src/models/template.ts
import {
  Model,
  DataTypes,
  Sequelize,
  Optional
} from 'sequelize';

// 1. Attribute interface
export interface TemplateAttributes {
  id: string;
  name: string;
  description: string;
  category: string;
  subcategory: string | null;
  price: number;
  currency: string;
  fileUrl: string;
  thumbnailUrl: string | null;
  downloadCount: number;
  rating: number | null;
  reviewCount: number;
  createdBy: string;
  isActive: boolean;
  isFeatured: boolean;
  tags: any;
  fileSize: number;
  fileType: string;
  version: string;
  requirements: any | null;
  compatibility: any | null;
  language: string;
  jurisdiction: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// 2. Creation attributes (id, nullable fields optional)
export interface TemplateCreationAttributes
  extends Optional<
    TemplateAttributes,
    'id' | 'subcategory' | 'thumbnailUrl' | 'rating' | 'requirements' | 'compatibility'
  > {}

// 3. Model class
export class Template
  extends Model<TemplateAttributes, TemplateCreationAttributes>
  implements TemplateAttributes
{
  public id!: string;
  public name!: string;
  public description!: string;
  public category!: string;
  public subcategory!: string | null;
  public price!: number;
  public currency!: string;
  public fileUrl!: string;
  public thumbnailUrl!: string | null;
  public downloadCount!: number;
  public rating!: number | null;
  public reviewCount!: number;
  public createdBy!: string;
  public isActive!: boolean;
  public isFeatured!: boolean;
  public tags!: any;
  public fileSize!: number;
  public fileType!: string;
  public version!: string;
  public requirements!: any | null;
  public compatibility!: any | null;
  public language!: string;
  public jurisdiction!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // 4. Associations
  public static associate(models: any): void {
    // e.g. this.belongsTo(models.User, { foreignKey: 'createdBy' });
  }

  // 5. Initialization
  public static initialize(sequelize: Sequelize): void {
    Template.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        category: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        subcategory: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        price: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        currency: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        fileUrl: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        thumbnailUrl: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        downloadCount: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        rating: {
          type: DataTypes.FLOAT,
          allowNull: true,
        },
        reviewCount: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        createdBy: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        isActive: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
        isFeatured: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        tags: {
          type: DataTypes.JSON,
          allowNull: false,
        },
        fileSize: {
          type: DataTypes.BIGINT,
          allowNull: false,
        },
        fileType: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        version: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        requirements: {
          type: DataTypes.JSON,
          allowNull: true,
        },
        compatibility: {
          type: DataTypes.JSON,
          allowNull: true,
        },
        language: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        jurisdiction: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'Templates',
        modelName: 'Template',
        timestamps: true,
      }
    );
  }
}
