// src/models/templatereview.ts
import {
  Model,
  DataTypes,
  Sequelize,
  Optional
} from 'sequelize';

// 1. Attribute interface
export interface TemplateReviewAttributes {
  id: string;
  templateId: string;
  userId: string;
  rating: number;
  review: string;
  title: string;
  createdAt: Date;
  isVerified: boolean;
  helpfulVotes: number;
  reportedCount: number;
  status: string;
}

// 2. Creation attributes (id and createdAt optional)
export interface TemplateReviewCreationAttributes
  extends Optional<TemplateReviewAttributes, 'id' | 'createdAt'> {}

// 3. Model class
export class TemplateReview
  extends Model<TemplateReviewAttributes, TemplateReviewCreationAttributes>
  implements TemplateReviewAttributes
{
  public id!: string;
  public templateId!: string;
  public userId!: string;
  public rating!: number;
  public review!: string;
  public title!: string;
  public createdAt!: Date;
  public isVerified!: boolean;
  public helpfulVotes!: number;
  public reportedCount!: number;
  public status!: string;

  // 4. Associations
  public static associate(models: any): void {
    // e.g. this.belongsTo(models.Template, { foreignKey: 'templateId' });
    // this.belongsTo(models.User, { foreignKey: 'userId' });
  }

  // 5. Initialization
  public static initialize(sequelize: Sequelize): void {
    TemplateReview.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        templateId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        userId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        rating: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        review: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        isVerified: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        helpfulVotes: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        reportedCount: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        status: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'TemplateReviews',
        modelName: 'TemplateReview',
        timestamps: false,
      }
    );
  }
}
