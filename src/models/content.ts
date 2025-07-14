// src/models/content.ts
import {
  Model,
  DataTypes,
  Sequelize,
  Optional
} from 'sequelize';

// 1. Define attribute interface
export interface ContentAttributes {
  key: string;
  value: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// 2. Define creation attributes (timestamps optional)
export interface ContentCreationAttributes
  extends Optional<ContentAttributes, 'createdAt' | 'updatedAt'> {}

// 3. Model class
export class Content
  extends Model<ContentAttributes, ContentCreationAttributes>
  implements ContentAttributes
{
  public key!: string;
  public value!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // 4. Associations
  public static associate(models: any): void {
    // e.g. no associations necessary for Content
  }

  // 5. Initialization
  public static initialize(sequelize: Sequelize): void {
    Content.init(
      {
        key: {
          type: DataTypes.STRING,
          primaryKey: true,
          allowNull: false,
        },
        value: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'Content',
        modelName: 'Content',
        timestamps: true,
      }
    );
  }
}
